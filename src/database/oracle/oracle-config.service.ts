import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OracleConfigService {
	constructor(private configService: ConfigService) {}

	get username(): string {
		return this.configService.get<string>('DATABASE_USER');
	}

	get password(): string {
		return this.configService.get<string>('DATABASE_PASSWORD');
	}

	get connectionString(): string {
		return this.configService.get<string>('DATABASE_STRING');
	}
}
