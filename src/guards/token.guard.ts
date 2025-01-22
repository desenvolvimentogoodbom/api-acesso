import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { respostaErro } from 'src/utils/response.utils';

@Injectable()
export class TokenGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const secret = request.headers['authorization'];

		if (secret !== process.env.CLIENT_SECRET) {
			throw new HttpException({ message: 'Token inválido' }, HttpStatus.UNAUTHORIZED);
		}

		return true;
	}
}
