const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const doctor = await prisma.user.create({
    data: {
      username: 'Admin',
      password: hashedPassword,
      role: 'doctor',
    },
  });

  console.log('Doctor account created:', doctor.username);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });