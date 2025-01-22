import { Module } from '@nestjs/common';
import { AriuserpService } from './ariuserp.service';
import { AriuserpController } from './ariuserp.controller';
import { OracleModule } from 'src/database/oracle/oracle.module';
import { OracleService } from 'src/database/oracle/oracle.service';

@Module({
	controllers: [AriuserpController],
	providers: [AriuserpService],
	imports: [OracleModule],
})
export class AriuserpModule {}
