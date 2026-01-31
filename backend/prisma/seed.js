const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1. Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 2. Create the Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rentaleco.com' },
    update: {}, // If user exists, do nothing
    create: {
      email: 'admin@rentaleco.com',
      firstName: 'Super',
      lastName: 'Admin',
      password: hashedPassword,
      role: 'ADMIN', // This is the key part!
      // Admins don't usually need GSTIN or Company Name
    },
  });

  console.log('✅ Admin user created:', admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });