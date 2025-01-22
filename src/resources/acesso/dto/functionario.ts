export class FuncionarioDTO {
	estabelecimento: number;
	matricula: number;
	nome: string;
	data_admissao: Date;
	data_desligamento: Date;
	centro_resultado: number;
	funcao: number;
	numero_horas: string;
	matricula_chefia: number;
	deficiente: string;
	sexo: string;
	grau: string;
	dtNascimento: Date;
	cpf: string;
	rg: string;
	rgOrgao: string;
	rgUf: string;
	tipoContrato: number;
	cdEmpErp: number;
	cdRhEmp: number;
	dsEmpFantasia: string;
	funcaoDenominacao: string;

	static fromDatabase(registro: any): FuncionarioDTO {
		return {
			estabelecimento: registro[0],
			matricula: registro[1],
			nome: registro[2],
			data_admissao: registro[3],
			data_desligamento: registro[4],
			centro_resultado: registro[5],
			funcao: registro[6],
			numero_horas: registro[7],
			matricula_chefia: registro[8],
			deficiente: registro[9],
			sexo: registro[10],
			grau: registro[11],
			dtNascimento: registro[12],
			cpf: registro[13],
			rg: registro[14],
			rgOrgao: registro[15],
			rgUf: registro[16],
			tipoContrato: registro[17],
			cdEmpErp: registro[18],
			cdRhEmp: registro[19],
			dsEmpFantasia: registro[20],
			funcaoDenominacao: registro[21],
		};
	}
}
