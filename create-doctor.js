const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const username = 'doctor';
  const plainPassword = 'doctor@123';

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newDoctor = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      role: 'doctor',
    },
  });

  console.log('Doctor account created:', newDoctor.username);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });