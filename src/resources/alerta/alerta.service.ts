import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OracleService } from 'src/database/oracle/oracle.service';
import { InsereAlertaDTO } from './dto/insere-alerta';
import { respostaErro } from 'src/utils/response.utils';

@Injectable()
export class AlertaService {
	constructor(private readonly oracleDb: OracleService) {}

	async adicionaralerta(dados: InsereAlertaDTO) {
		const query = 'usr_pkg_alertas.usr_prc_insere_alerta';
		const params = [dados.destino, dados.assunto, dados.corpo];

		try {
			const resultado = await this.oracleDb.executarProcedure(query, params);

			if (!resultado) {
				return respostaErro('Ocorreu um erro ao executar a procedure', HttpStatus.BAD_REQUEST);
			}

			return {
				mensagem: 'Procedure executada com sucesso',
			};
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao executar procedure',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async executafila(dados: any) {
		const query = 'usr_pkg_alertas.usr_prc_executa_fila';
		const params = [];

		try {
			const resultado = await this.oracleDb.executarProcedure(query, params);

			if (!resultado) {
				return respostaErro('Ocorreu um erro ao executar a procedure', HttpStatus.BAD_REQUEST);
			}

			return {
				mensagem: 'Procedure executada com sucesso',
			};
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao executar procedure',
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
