import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(private prisma: PrismaService) {}

  create(createPrescriptionDto: CreatePrescriptionDto) {
    return this.prisma.prescription.create({
      data: createPrescriptionDto,
    });
  }

  findAll() {
    return this.prisma.prescription.findMany();
  }

  findOne(id: number) {
    return this.prisma.prescription.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prisma.prescription.update({
      where: { id },
      data: updatePrescriptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.prescription.delete({
      where: { id },
    });
  }
}