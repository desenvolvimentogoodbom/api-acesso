import { Module } from '@nestjs/common';
import { OracleConfigService } from './oracle-config.service';
import { OracleService } from './oracle.service';

@Module({
	providers: [OracleService, OracleConfigService],
	exports: [OracleService],
})
export class OracleModule {}
