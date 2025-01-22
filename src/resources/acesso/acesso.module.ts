import { Module } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { AcessoController } from './acesso.controller';
import { OracleModule } from 'src/database/oracle/oracle.module';
import { OracleService } from 'src/database/oracle/oracle.service';

@Module({
	controllers: [AcessoController],
	providers: [AcessoService],
	imports: [OracleModule],
})
export class AcessoModule {}
