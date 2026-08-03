import { IsString, IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreatePrescriptionDto {
  @IsOptional()
  @IsString()
  patientId?: string;

  @IsNotEmpty({ message: 'Patient name is required' })
  @IsString()
  patientName: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  cnic?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsNotEmpty({ message: 'Doctor name is required' })
  @IsString()
  doctorName: string;

  @IsOptional()
  @IsString()
  complaint?: string;

  @IsOptional()
  @IsString()
  formulaName?: string;

  @IsOptional()
  @IsString()
  customFormula?: string;

  @IsNotEmpty({ message: 'Preparation instructions are required' })
  @IsString()
  prepInstruction: string;

  @IsOptional()
  @IsString()
  nextVisit?: string;

  @IsOptional()
  @IsIn(['Pending', 'Prepared', 'Delivered'])
  status?: string;
}