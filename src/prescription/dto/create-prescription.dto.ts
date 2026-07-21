export class CreatePrescriptionDto {
  prescriptionId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  complaint: string;
  formulaNames: string;
  nextVisit?: string;
}