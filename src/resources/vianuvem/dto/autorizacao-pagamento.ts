export class AutorizacaoPagamentoDTO {
	codigo_do_processo: number;
	data_criacao: Date;
	nome_do_processo: string;
	situacao: string;
	data_vencimento: Date;
	fornecedor: string;
	url_acesso: string;
	flagreserved: string;
	reserveduserid: string;

	static fromDatabase(registro: any): AutorizacaoPagamentoDTO {
		return {
			codigo_do_processo: registro[0],
			data_criacao: registro[1],
			nome_do_processo: registro[2],
			situacao: registro[3],
			data_vencimento: registro[4],
			fornecedor: registro[5],
			url_acesso: registro[6],
			flagreserved: registro[7],
			reserveduserid: registro[8],
		};
	}
}
