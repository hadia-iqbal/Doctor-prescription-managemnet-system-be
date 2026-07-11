export class CreatePatientDto {
  patientId: string;
  name: string;
  phone: string;
  cnic?: string;
  age?: number;
  gender?: string;
}
