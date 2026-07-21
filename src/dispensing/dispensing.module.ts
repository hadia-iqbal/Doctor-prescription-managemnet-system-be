import { Module } from '@nestjs/common';
import { DispensingService } from './dispensing.service';
import { DispensingController } from './dispensing.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DispensingController],
  providers: [DispensingService, PrismaService],
})
export class DispensingModule {}