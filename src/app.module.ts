import { Module } from '@nestjs/common';
import { AcessoModule } from './resources/acesso/acesso.module';
import { OracleModule } from './database/oracle/oracle.module';
import { ConfigModule } from '@nestjs/config';
import { VianuvemModule } from './resources/vianuvem/vianuvem.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AcessoModule, VianuvemModule, OracleModule],
})
export class AppModule {}
