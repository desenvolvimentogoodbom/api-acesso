import { Module } from '@nestjs/common';
import { OracleModule } from 'src/database/oracle/oracle.module';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';

@Module({
	controllers: [AlertaController],
	providers: [AlertaService],
	imports: [OracleModule],
})
export class AlertaModule {}
