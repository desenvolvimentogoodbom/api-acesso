export class DesligamentoPendentesDTO {
	codigo_processo: number;
	data_criacao: Date;
	codigo_estabelecimento?: number;
	nome_do_processo: string;
	situacao: string;
	url_acesso?: string;

	static fromDatabase(registro: any): DesligamentoPendentesDTO {
		return {
			codigo_processo: registro[0],
			data_criacao: registro[1],
			codigo_estabelecimento: registro[2],
			nome_do_processo: registro[6],
			situacao: registro[10],
			url_acesso: registro[21],
		};
	}
}
