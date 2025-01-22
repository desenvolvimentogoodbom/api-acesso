import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guards/token.guard';
import { AlertaService } from './alerta.service';
import { InsereAlertaDTO } from './dto/insere-alerta';

@UseGuards(TokenGuard)
@Controller('alerta')
export class AlertaController {
	constructor(private readonly ariuserpService: AlertaService) {}

	@Post('/adicionaralerta')
	async adicionaralerta(@Body() dados: InsereAlertaDTO) {
		return await this.ariuserpService.adicionaralerta(dados);
	}

	@Post('/executarfila')
	async executarfila(dados: any) {
		return await this.ariuserpService.executafila(dados);
	}
}
