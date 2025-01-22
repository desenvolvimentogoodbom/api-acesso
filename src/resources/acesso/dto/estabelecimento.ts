export class EstabelecimentoDTO {
	codigo_arius_erp: number;
	codigo_adp: number;
	nome_estabelecimento: string;

	static fromDatabase(registro: any): EstabelecimentoDTO {
		return {
			codigo_arius_erp: registro[0],
			codigo_adp: registro[1],
			nome_estabelecimento: registro[2],
		};
	}
}
