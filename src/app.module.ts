import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { FormulaModule } from './formula/formula.module';
import { PatientModule } from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [FormulaModule, PatientModule, PrescriptionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}