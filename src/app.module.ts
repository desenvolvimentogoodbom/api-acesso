import { Module } from '@nestjs/common';
import { AcessoModule } from './resources/acesso/acesso.module';
import { OracleModule } from './database/oracle/oracle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AcessoModule, OracleModule],
})
export class AppModule {}
