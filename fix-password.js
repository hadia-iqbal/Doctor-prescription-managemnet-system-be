const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const doctor = await prisma.user.update({
    where: { username: 'Admin' },
    data: { password: hashedPassword },
  });

  console.log('Password fixed for:', doctor.username);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });