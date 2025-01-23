import { Module } from '@nestjs/common';
import { OracleModule } from 'src/database/oracle/oracle.module';
import { aplicativoController } from './aplicativo.controller';
import { AplicativoService } from './aplicativo.service';

@Module({
	controllers: [aplicativoController],
	providers: [AplicativoService],
	imports: [OracleModule],
})
export class AplicativoModule {}
