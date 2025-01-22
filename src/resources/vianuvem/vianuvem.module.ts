import { Module } from '@nestjs/common';
import { OracleModule } from 'src/database/oracle/oracle.module';
import { VianuvemController } from './vianuvem.controller';
import { VianuvemService } from './vianuvem.service';

@Module({
	controllers: [VianuvemController],
	providers: [VianuvemService],
	imports: [OracleModule],
})
export class VianuvemModule {}
