export class aplicativoDTO {
	id_app: number;
	ds_app: string;
	versao_app: string;

	static fromDatabase(registro: aplicativoDTO) {
		return {
			id_app: registro[0],
			ds_app: registro[1],
			versao_app: registro[2],
		};
	}
}
