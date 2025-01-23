import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { CadastraUsarioAriusErpDTO } from './dto/cadastra-usuario-ariuserp';
import { ListaFuncionariosAtivosDTO } from './dto/lista-funcionarios';
import { TokenGuard } from 'src/guards/token.guard';
import { EstabelecimentoDTO } from './dto/estabelecimento';
import { AcaoDTO } from './dto/acao';
import { CadastraUsarioEmpresaAriusErpDTO } from './dto/cadastra-usuario-empresa-ariuserp';
import { UsuarioERPDTO } from './dto/usuario-erp';

@UseGuards(TokenGuard)
@Controller('acesso/ariuserp')
export class AcessoController {
	constructor(private readonly ariuserpService: AcessoService) {}

	@Post('cadastrarusuario')
	async cadastraUsuario(@Body() dados: CadastraUsarioAriusErpDTO[]) {
		return await this.ariuserpService.cadastraUsuario(dados);
	}

	@Post('cadastrarusuarioempresa')
	async cadastraUsuarioEmpresa(@Body() dados: CadastraUsarioEmpresaAriusErpDTO) {
		return await this.ariuserpService.cadastraUsuarioEmpresa(dados);
	}

	@Get('funcionariosativos')
	async listasUsuariosAtivos(@Query() dados: ListaFuncionariosAtivosDTO) {
		return await this.ariuserpService.listafuncionariosativos(dados);
	}

	@Get('estabelecimentos')
	async listaEstabelecimentos(dados: EstabelecimentoDTO) {
		return await this.ariuserpService.listaEstabelecimentos(dados);
	}

	@Get('acoes')
	async listaacoes(dados: AcaoDTO) {
		return await this.ariuserpService.listaAcoes(dados);
	}

	@Post('cadastra-usuario-via-arius')
	async cadastraUsuarioViaArius(@Body() dados: UsuarioERPDTO) {
		return await this.ariuserpService.cadastraUsuarioViaArius(dados);
	}
}
