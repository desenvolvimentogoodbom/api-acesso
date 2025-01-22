import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CadastraUsarioDTO } from './dto/cadastra-usuario';
import { OracleService } from 'src/database/oracle/oracle.service';
import { CadastraUsarioEmpresaDTO } from './dto/cadastra-usuario-empresa';
import { ListaFuncionariosAtivosDTO } from './dto/lista-funcionarios';
import { respostaErro } from 'src/utils/response.utils';
import { FuncionarioDTO } from './dto/functionario';
import { EstabelecimentoDTO } from './dto/estabelecimento';
import { AcaoDTO } from './dto/acao';

@Injectable()
export class AcessoService {
	constructor(private readonly oracleDb: OracleService) {}

	async cadastraUsuario(dados: CadastraUsarioDTO[]) {
		try {
			for (const usuario of dados) {
				const query = 'usr_pkg_acesso.prc_criar_usuario_arius_erp';
				const params = [usuario.matricula, usuario.grupo];

				const resultado = await this.oracleDb.executarProcedure(query, params);

				if (!resultado) {
					return respostaErro(
						'Ocorreu um erro ao cadastrar o usuário no ARIUSERP!',
						HttpStatus.BAD_REQUEST,
					);
				}

				return {
					mensagem: 'Usuário do ARIUSERP cadastrado com sucesso!',
				};
			}
		} catch (error) {
			return respostaErro(
				'Erro desconhecido ao cadastrar o usuário.',
				HttpStatus.INTERNAL_SERVER_ERROR,
				error.message,
			);
		}
	}

	async cadastraUsuarioEmpresa(dados: CadastraUsarioEmpresaDTO) {
		const query = 'usr_pkg_acesso.prc_vincular_usuario_empresa_erp';
		const params = [dados.id_usuario, dados.empresas];

		try {
			const resultado = await this.oracleDb.executarProcedure(query, params);

			if (!resultado) {
				return respostaErro(
					'Ocorreu um erro ao cadastrar Empresa para o usuário no ARIUSERP!',
					HttpStatus.BAD_REQUEST,
				);
			}

			return {
				mensagem: 'Empresa vinculada ao usuário',
			};
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao vincular empresa ao usuário no ARIUSERP!',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async listafuncionariosativos(dados: ListaFuncionariosAtivosDTO) {
		const query = `
		select * from usr_t_func_completo 
		where (cd_estabelecimento = :estabelecimento or :estabelecimento is null) 
		and (nome_func like :nome or :nome is null)
		and (cpf like :cpf or :cpf is null)
		`;
		const params = [
			dados.estabelecimento ?? undefined,
			dados.estabelecimento ?? undefined,
			dados.nome ? `${dados.nome}%` : null,
			dados.nome ?? undefined,
			dados.cpf ? `${dados.cpf}%` : null,
			dados.cpf,
		];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: FuncionarioDTO[] = resultado.map((registro: any) =>
				FuncionarioDTO.fromDatabase(registro),
			);
			return resultadoDTO;
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao listar funcionarios',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async listaEstabelecimentos(dados: EstabelecimentoDTO) {
		const query = `
		SELECT 
			bte.ID_EMPRESA, utrae.CD_ESTABELECIMENTO, bte.NOME_FANTASIA 
		FROM BAS_T_EMPRESAS bte 
		INNER JOIN 
			USR_T_RH_ADP_EMPRESAS utrae ON UTRAE.CD_EMPRESA = bte.ID_EMPRESA 
		`;
		const params = [];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: EstabelecimentoDTO[] = resultado.map((registro: any) =>
				EstabelecimentoDTO.fromDatabase(registro),
			);
			return resultadoDTO;
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao listar estabelecimentos',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async listaAcoes(dados: AcaoDTO) {
		const query = `
		select * from usr_pkg_acesso.fnc_lista_acoes()
		`;
		const params = [];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: AcaoDTO[] = resultado.map((registro: any) =>
				AcaoDTO.fromDatabase(registro),
			);
			return resultadoDTO;
		} catch (error) {
			return respostaErro(
				'Ocorreu um erro desconhecido ao listar estabelecimentos',
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
