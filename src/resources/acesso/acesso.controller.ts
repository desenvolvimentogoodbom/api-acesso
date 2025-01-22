import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { CadastraUsarioAriusErpDTO } from './dto/cadastra-usuario-ariuserp';
import { ListaFuncionariosAtivosDTO } from './dto/lista-funcionarios';
import { TokenGuard } from 'src/guards/token.guard';
import { EstabelecimentoDTO } from './dto/estabelecimento';
import { AcaoDTO } from './dto/acao';
import { CadastraUsarioEmpresaAriusErpDTO } from './dto/cadastra-usuario-empresa-ariuserp';

@UseGuards(TokenGuard)
@Controller('acesso')
export class AcessoController {
	constructor(private readonly ariuserpService: AcessoService) {}

	@Post('/ariuserp/cadastrarusuario')
	async cadastraUsuario(@Body() dados: CadastraUsarioAriusErpDTO[]) {
		return await this.ariuserpService.cadastraUsuario(dados);
	}

	@Post('/ariuserp/cadastrarusuarioempresa')
	async cadastraUsuarioEmpresa(@Body() dados: CadastraUsarioEmpresaAriusErpDTO) {
		return await this.ariuserpService.cadastraUsuarioEmpresa(dados);
	}

	@Get('/ariuserp/funcionariosativos')
	async listasUsuariosAtivos(@Query() dados: ListaFuncionariosAtivosDTO) {
		return await this.ariuserpService.listafuncionariosativos(dados);
	}

	@Get('/ariuserp/estabelecimentos')
	async listaEstabelecimentos(dados: EstabelecimentoDTO) {
		return await this.ariuserpService.listaEstabelecimentos(dados);
	}

	@Get('/ariuserp/acoes')
	async listaacoes(dados: AcaoDTO) {
		return await this.ariuserpService.listaAcoes(dados);
	}
}
