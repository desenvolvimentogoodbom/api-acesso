import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OracleService } from 'src/database/oracle/oracle.service';
import { respostaErro } from 'src/utils/response.utils';
import { DesligamentoPendentesDTO } from './dto/desligamento-pendente';

@Injectable()
export class VianuvemService {
	constructor(private readonly oracleDb: OracleService) {}

	async listaDesligamentosPendentes(dados: DesligamentoPendentesDTO) {
		const query = `
		SELECT 
			PROCESSID,CREATEDATE,NAMEPROCESSTYPE ,
			'https://app.vianuvem.com.br/auto/home?workflowId='||processid url
		FROM 
			USR_T_VN_PROCESS utvp 
		WHERE UTVP.FINALSITUATION = 'N' 
		AND utvp.NAMEPROCESSTYPE LIKE 'DESLIGAMENTO - TI%'`;
		const params = [];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: DesligamentoPendentesDTO[] = resultado.map((registro: any) =>
				DesligamentoPendentesDTO.fromDatabase(registro),
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
