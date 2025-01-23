import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OracleService } from 'src/database/oracle/oracle.service';
import { respostaErro } from 'src/utils/response.utils';
import { aplicativoDTO } from './app';

@Injectable()
export class AplicativoService {
	constructor(private readonly oracleDb: OracleService) {}

	async listaapps(dados: aplicativoDTO) {
		const query = 'select * from usr_t_app where id_app = :id_app or :id_app is null';
		const params = [dados.id_app ?? undefined, dados.id_app ?? undefined];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: aplicativoDTO[] = resultado.map((registro: any) =>
				aplicativoDTO.fromDatabase(registro),
			);
			return resultadoDTO;
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao executar a consulta',
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
