import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OracleService } from 'src/database/oracle/oracle.service';
import { ListaFuncionariosAtivosDTO } from './dto/lista-funcionarios';
import { respostaErro, respostaSucesso } from 'src/utils/response.utils';
import { FuncionarioDTO } from './dto/functionario';
import { EstabelecimentoDTO } from './dto/estabelecimento';
import { AcaoDTO } from './dto/acao';
import { DesligamentoPendentesDTO } from '../vianuvem/dto/desligamento-pendente';
import { CadastraUsarioAriusErpDTO } from './dto/cadastra-usuario-ariuserp';
import { CadastraUsarioEmpresaAriusErpDTO } from './dto/cadastra-usuario-empresa-ariuserp';
import { UsuarioERPDTO } from './dto/usuario-erp';
import axios from 'axios';
import { ListaGrupoUsuariosDTO } from './dto/lista-grupo-usuarios';

@Injectable()
export class AcessoService {
	constructor(private readonly oracleDb: OracleService) {}

	async cadastraUsuario(dados: CadastraUsarioAriusErpDTO[]) {
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

	async cadastraUsuarioEmpresa(dados: CadastraUsarioEmpresaAriusErpDTO) {
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
		and utfc.DT_DESLIGAMENTO <> '01/01/1901'
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
				'Ocorreu um erro desconhecido ao executar a consulta',
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
				'Ocorreu um erro desconhecido ao executar a consulta',
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
				'Ocorreu um erro desconhecido ao executar a consulta',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async listaDesligamentosPendentes(dados: DesligamentoPendentesDTO) {
		const query = `
		SELECT 
			PROCESSID,CREATEDATE,NAMEPROCESSTYPE ,
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

	async cadastraUsuarioViaArius(dados: UsuarioERPDTO) {
		const url = 'http://172.16.2.13:8080/AriusERP/v2/Usuario';
		const username = 'ARIUS';
		const password = process.env.ARIUS_PASSWORD;

		const auth = Buffer.from(`${username}:${password}`).toString('base64');

		const headers = {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/json',
		};

		try {
			const response = await axios.post(url, dados, { headers });
			console.log(response.data);
			return respostaSucesso('Usuario cadastro com sucesso!');
		} catch (error) {
			return respostaErro('Erro ao cadastrar usuario', HttpStatus.BAD_REQUEST, error);
		}
	}

	async listaGrupoUsuarios(dados: ListaGrupoUsuariosDTO) {
		const query = `
			select id_usuario, nome 
			from bas_t_usuarios 
			where ativo = 'T' 
			and representa_grupo = 'T'`;
		const params = [];

		try {
			const resultado = await this.oracleDb.executarConsulta(query, params);
			const resultadoDTO: ListaGrupoUsuariosDTO[] = resultado.map((registro: any) =>
				ListaGrupoUsuariosDTO.fromDatabase(registro),
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
