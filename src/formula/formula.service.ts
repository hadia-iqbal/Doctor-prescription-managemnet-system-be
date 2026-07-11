import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';

@Injectable()
export class FormulaService {
  constructor(private prisma: PrismaService) {}

  create(createFormulaDto: CreateFormulaDto) {
    return this.prisma.formula.create({
      data: createFormulaDto,
    });
  }

  findAll() {
  return this.prisma.formula.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      actualComposition: true,
      prepInstruction: true,
      createdAt: true,
    },
  });
}

  findOne(id: number) {
    return this.prisma.formula.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        actualComposition: true,
        prepInstruction: true,
      },
    });
  }

  update(id: number, updateFormulaDto: UpdateFormulaDto) {
    return this.prisma.formula.update({
      where: { id },
      data: updateFormulaDto,
    });
  }

  remove(id: number) {
    return this.prisma.formula.delete({
      where: { id },
    });
  }
}