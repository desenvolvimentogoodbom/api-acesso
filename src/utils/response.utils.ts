import { HttpException, HttpStatus } from '@nestjs/common';

export function respostaSucesso(data: any = null, status: HttpStatus = HttpStatus.OK) {
	return { status, data };
}

export function respostaErro(message: string, status: HttpStatus, details: string = null) {
	throw new HttpException({ message, details }, status);
}
