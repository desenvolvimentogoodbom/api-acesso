import { Controller, Get, Post, Body, Headers, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guards/token.guard';
import { DesligamentoPendentesDTO } from './dto/desligamento-pendente';
import { VianuvemService } from './vianuvem.service';

@UseGuards(TokenGuard)
@Controller('vianuvem')
export class VianuvemController {
	constructor(private readonly ariuserpService: VianuvemService) {}

	@Get('/desligamentopendentes')
	async listaDesligamentosPendentes(dados: DesligamentoPendentesDTO) {
		return await this.ariuserpService.listaDesligamentosPendentes(dados);
	}
}
