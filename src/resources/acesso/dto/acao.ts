export class AcaoDTO {
	chave_acao: string;
	nome_acao: string;
	endpoint: string;

	static fromDatabase(registro: any): AcaoDTO {
		return {
			chave_acao: registro[0],
			nome_acao: registro[1],
			endpoint: registro[2],
		};
	}
}
