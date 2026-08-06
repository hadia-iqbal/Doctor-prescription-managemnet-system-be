const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find all prescriptions where status is "Old" or "New" (wrongly saved there)
  const wrongRecords = await prisma.prescription.findMany({
    where: {
      status: { in: ['Old', 'New'] },
    },
  });

  console.log(`Found ${wrongRecords.length} records to fix.`);

  for (const record of wrongRecords) {
    await prisma.prescription.update({
      where: { id: record.id },
      data: {
        patientType: record.status,   // move "Old"/"New" into patientType
        status: 'Pending',            // reset status to Pending
      },
    });
    console.log(`Fixed record ID ${record.id}: patientType=${record.status} -> status=Pending`);
  }

  console.log('Done fixing all records.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });