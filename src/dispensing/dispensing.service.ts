import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DispensingService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    const items = await this.prisma.dispensing.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => ({
      ...item,
      formulaNames: item.formulaNames ? item.formulaNames.split(', ') : [],
    }));
  }

  create(data: any) {
    const formattedData = {
      ...data,
      formulaNames: Array.isArray(data.formulaNames)
        ? data.formulaNames.join(', ')
        : data.formulaNames,
    };
    return this.prisma.dispensing.create({ data: formattedData });
  }

  markPrepared(id: number) {
    return this.prisma.dispensing.update({
      where: { id },
      data: { status: 'Prepared' },
    });
  }

  markDelivered(id: number) {
    return this.prisma.dispensing.update({
      where: { id },
      data: { status: 'Delivered' },
    });
  }
}