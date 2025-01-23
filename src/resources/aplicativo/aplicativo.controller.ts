import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guards/token.guard';
import { AplicativoService } from './aplicativo.service';
import { aplicativoDTO } from './app';

@UseGuards(TokenGuard)
@Controller('aplicativo')
export class aplicativoController {
	constructor(private readonly ariuserpService: AplicativoService) {}

	@Get()
	async listaapps(@Query() dados: aplicativoDTO) {
		return await this.ariuserpService.listaapps(dados);
	}
}
