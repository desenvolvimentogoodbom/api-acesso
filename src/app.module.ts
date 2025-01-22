import { Module } from '@nestjs/common';
import { AriuserpModule } from './resources/ariuserp/ariuserp.module';
import { OracleModule } from './database/oracle/oracle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AriuserpModule, OracleModule],
})
export class AppModule {}
