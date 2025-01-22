export class DesligamentoPendentesDTO {
	codigo_processo: number;
	data_criacao: Date;
	nome_do_processo: string;
	url_acesso: string;

	static fromDatabase(registro: any): DesligamentoPendentesDTO {
		return {
			codigo_processo: registro[0],
			data_criacao: registro[1],
			nome_do_processo: registro[2],
			url_acesso: registro[3],
		};
	}
}
