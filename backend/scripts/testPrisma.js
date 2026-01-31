const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async ()=>{
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      include: { images: true, attributes: true, vendor: { select: { id: true, firstName: true, lastName: true, companyName: true } } }
    });
    console.log('OK count', products.length);
    console.log(products[0] ? products[0] : 'no sample');
  } catch (e) {
    console.error('PRISMA ERROR', e);
  } finally {
    await prisma.$disconnect();
  }
})();
