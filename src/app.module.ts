import { Module } from '@nestjs/common';
import { AcessoModule } from './resources/acesso/acesso.module';
import { OracleModule } from './database/oracle/oracle.module';
import { ConfigModule } from '@nestjs/config';
import { VianuvemModule } from './resources/vianuvem/vianuvem.module';
import { AlertaModule } from './resources/alerta/alerta.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AcessoModule,
		VianuvemModule,
		AlertaModule,
		OracleModule,
	],
})
export class AppModule {}
