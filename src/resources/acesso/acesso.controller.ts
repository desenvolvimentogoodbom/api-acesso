import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { CadastraUsarioDTO } from './dto/cadastra-usuario';
import { CadastraUsarioEmpresaDTO } from './dto/cadastra-usuario-empresa';
import { ListaFuncionariosAtivosDTO } from './dto/lista-funcionarios';
import { TokenGuard } from 'src/guards/token.guard';
import { EstabelecimentoDTO } from './dto/estabelecimento';
import { AcaoDTO } from './dto/acao';

@UseGuards(TokenGuard)
@Controller('acesso')
export class AcessoController {
	constructor(private readonly ariuserpService: AcessoService) {}

	@Post('cadastrarusuario')
	async cadastraUsuario(@Body() dados: CadastraUsarioDTO[]) {
		return await this.ariuserpService.cadastraUsuario(dados);
	}

	@Post('cadastrarusuarioempresa')
	async cadastraUsuarioEmpresa(@Body() dados: CadastraUsarioEmpresaDTO) {
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
}
