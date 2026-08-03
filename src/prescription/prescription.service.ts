import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(private prisma: PrismaService) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    let finalPatientId = createPrescriptionDto.patientId;

    // If this is a new patient (no real patientId), create a Patient record first
    if (!finalPatientId || finalPatientId === 'NEW_PATIENT') {
      const existing = await this.prisma.patient.findFirst({
        where: { phone: createPrescriptionDto.phone },
      });

      if (existing) {
        finalPatientId = existing.patientId;
      } else {
        const generatedId = `P-${Date.now()}`;
        const newPatient = await this.prisma.patient.create({
          data: {
            patientId: generatedId,
            name: createPrescriptionDto.patientName,
            phone: createPrescriptionDto.phone,
            cnic: createPrescriptionDto.cnic || undefined,
            age: createPrescriptionDto.age || undefined,
            gender: createPrescriptionDto.gender || undefined,
          },
        });
        finalPatientId = newPatient.patientId;
      }
    }

    const data = {
      ...createPrescriptionDto,
      patientId: String(finalPatientId),
      nextVisit: createPrescriptionDto.nextVisit
        ? new Date(createPrescriptionDto.nextVisit)
        : null,
    };

    return this.prisma.prescription.create({
      data,
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
    const data = {
      ...updatePrescriptionDto,
      ...(updatePrescriptionDto.nextVisit !== undefined && {
        nextVisit: updatePrescriptionDto.nextVisit
          ? new Date(updatePrescriptionDto.nextVisit)
          : null,
      }),
    };
    return this.prisma.prescription.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.prescription.delete({
      where: { id },
    });
  }
}