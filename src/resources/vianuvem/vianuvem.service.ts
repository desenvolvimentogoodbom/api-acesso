import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OracleService } from 'src/database/oracle/oracle.service';
import { respostaErro } from 'src/utils/response.utils';
import { DesligamentoPendentesDTO } from './dto/desligamento-pendente';
import { AutorizacaoPagamentoDTO } from './dto/autorizacao-pagamento';

@Injectable()
export class VianuvemService {
	constructor(private readonly oracleDb: OracleService) {}

	async listaDesligamentosPendentes(dados: DesligamentoPendentesDTO) {
		const query = `
		SELECT 
			utvp.*,
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

	async listaAutorizacaoPagamentos(dados: AutorizacaoPagamentoDTO) {
		const query = `
			select 
				a.processid,
       			a.createdate,
       			a.nameprocesstype,
       			a.namesituation,
       			nvl(i.indexervalue, i2.indexervalue) data,
       			i3.indexervalue fornecedor,
				'https://app.vianuvem.com.br/auto/home?workflowId='||a.processid url
  			from usr_t_vn_process a
 			inner join usr_t_vn_process_indexers i
    			on i.processid = a.processid
   				and i.parentid = 6139760
 			inner join usr_t_vn_process_indexers i2
    			on i2.processid = a.processid
   				and i2.parentid = 6139764
 			inner join usr_t_vn_process_indexers i3
    			on i3.processid = a.processid
   				and i3.parentid = 6139765
 			where a.finalsituation = 'N'
   				and a.idprocesstype = 50021035
 			order by nvl(i.indexervalue, i2.indexervalue)
`;
		const params = [];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: AutorizacaoPagamentoDTO[] = resultado.map((registro: any) =>
				AutorizacaoPagamentoDTO.fromDatabase(registro),
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
