export class ListaGrupoUsuariosDTO {
	id_grupo: string;
	nome_grupo: string;

	static fromDatabase(registro: any): ListaGrupoUsuariosDTO {
		return {
			id_grupo: registro[0],
			nome_grupo: registro[1],
		};
	}
}
