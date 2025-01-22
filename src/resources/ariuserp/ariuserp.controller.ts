import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { AriuserpService } from './ariuserp.service';
import { CadastraUsarioDTO } from './dto/cadastra-usuario';
import { CadastraUsarioEmpresaDTO } from './dto/cadastra-usuario-empresa';
import { ListaFuncionariosAtivosDTO } from './dto/lista-funcionaros';
import { TokenGuard } from 'src/guards/token.guard';
import { EstabelecimentoDTO } from './dto/lista-estabelecimento';

@UseGuards(TokenGuard)
@Controller('ariuserp')
export class AriuserpController {
	constructor(private readonly ariuserpService: AriuserpService) {}

	@Post('cadastrarusuario')
	async cadastraUsuario(@Body() dados: CadastraUsarioDTO[]) {
		return await this.ariuserpService.cadastraUsuario(dados);
	}

	@Post('cadastrarusuarioempresa')
	async cadastraUsuarioEmpresa(@Body() dados: CadastraUsarioEmpresaDTO) {
		return await this.ariuserpService.cadastraUsuarioEmpresa(dados);
	}

	@Get('listafuncionariosativos')
	async listasUsuariosAtivos(@Query() dados: ListaFuncionariosAtivosDTO) {
		return await this.ariuserpService.listafuncionariosativos(dados);
	}

	@Get('listaestabelecimentos')
	async listaEstabelecimentos(dados: EstabelecimentoDTO) {
		return await this.ariuserpService.listaEstabelecimentos(dados);
	}
}
