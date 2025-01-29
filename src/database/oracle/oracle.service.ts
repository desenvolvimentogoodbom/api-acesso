import { Injectable } from '@nestjs/common';
import { OracleConfigService } from './oracle-config.service';
import * as oracledb from 'oracledb';

@Injectable()
export class OracleService {
	private connection: oracledb.Connection;
	oracleDb: any;

	constructor(private oracleConfigService: OracleConfigService) {
		this.init();
	}

	async onModuleInit() {
		await this.init();
	}

	async onModuleDestroy() {
		await this.fecharConexao();
	}

	private async init() {
		try {
			this.connection = await oracledb.getConnection({
				user: this.oracleConfigService.username,
				password: this.oracleConfigService.password,
				connectString: this.oracleConfigService.connectionString,
			});
			await this.setSessionParameters();
		} catch (error) {
			console.error('Erro ao conectar ao Oracle Database:', error);
			throw error;
		}
	}

	private async setSessionParameters() {
		try {
			await this.connection.execute(`ALTER SESSION SET NLS_DATE_FORMAT = 'DD-MM-YYYY HH24:MI:SS'`);
		} catch (error) {
			console.error('Erro ao configurar parâmetros de sessão:', error);
			throw error;
		}
	}

	private async ensureConnection() {
		if (!this.connection || this.connection.isHealthy() === false) {
			await this.init();
		}
	}

	public async executarConsulta(sql: string, params?: any[]): Promise<any> {
		await this.ensureConnection();

		try {
			const result = await this.connection.execute(sql, params);
			return result.rows;
		} catch (error) {
			console.error('Erro ao executar a consulta:', error);
			if (error.message.includes('NJS-500') || error.message.includes('NJS-501')) {
				await this.fecharConexao();
				await this.ensureConnection();
				return this.executarConsulta(sql, params);
			}

			throw error;
		}
	}

	public async executarAtualizacao(sql: string, params?: any[]): Promise<boolean> {
		await this.ensureConnection();

		try {
			const result = await this.connection.execute(sql, params);
			if (result.rowsAffected && result.rowsAffected > 0) {
				await this.connection.commit();
				return true;
			}

			return false;
		} catch (error) {
			console.error('Erro ao executar a atualização:', error);
			if (error.message.includes('NJS-500') || error.message.includes('NJS-501')) {
				await this.fecharConexao();
				await this.ensureConnection();
				return this.executarAtualizacao(sql, params);
			}

			throw error;
		}
	}

	public async executarProcedure(procedureName: string, params?: any[]): Promise<any> {
		await this.ensureConnection();

		try {
			const bindParams = params.map((_, index) => `:param${index}`);
			const bindString = bindParams.join(',');
			const result = await this.connection.execute(
				`BEGIN ${procedureName}(${bindString}); END;`,
				params,
			);
			await this.connection.commit();
			return result;
		} catch (error) {
			console.error('Erro ao executar a procedure:', error);
			if (error.message.includes('NJS-500') || error.message.includes('NJS-501')) {
				await this.fecharConexao();
				await this.ensureConnection();
				return this.executarProcedure(procedureName, params);
			}

			throw error;
		}
	}

	public async fecharConexao() {
		if (!this.connection) {
			console.error('Conexão Oracle não está estabelecida.');
			return;
		}

		try {
			await this.connection.close();
			this.connection = null;
		} catch (error) {
			console.error('Erro ao fechar a conexão Oracle:', error);
			throw error;
		}
	}
}
