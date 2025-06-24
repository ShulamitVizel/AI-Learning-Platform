import prisma from './src/prisma/prismaClient';

async function seed() {
  const existingUser = await prisma.user.findFirst();
  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        phone: '0500000000'
      }
    });

    const category = await prisma.category.create({
      data: {
        name: 'Science'
      }
    });

    const subCategory = await prisma.subCategory.create({
      data: {
        name: 'Space',
        categoryId: category.id
      }
    });

    console.log('✅ נתונים נזרעו בהצלחה:', { user, category, subCategory });
  } else {
    console.log('ℹ️ נתונים כבר קיימים במסד.');
  }
}

seed()
  .catch((e) => {
    console.error('❌ שגיאה ב-seed:', e);
  })
  .finally(() => process.exit());