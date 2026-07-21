import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: createPatientDto,
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  search(query: string) {
    return this.prisma.patient.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { phone: { contains: query } },
          { cnic: { contains: query } },
        ],
      },
    });
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}