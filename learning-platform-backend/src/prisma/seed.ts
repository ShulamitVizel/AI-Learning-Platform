import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 🟢 יצירת משתמש אדמין לבדיקה
  const admin = await prisma.user.upsert({
    where: { phone: '0500000000' },
    update: {},
    create: {
      name: 'Admin User',
      phone: '0500000000',
      role: 'admin',
    },
  });

  console.log(`👤 Admin created: ${admin.name} (role: ${admin.role})`);

  const categories = [
    {
      name: 'Science',
      subCategories: ['Physics', 'Biology', 'Chemistry', 'Space'],
    },
    {
      name: 'Math',
      subCategories: ['Algebra', 'Geometry', 'Calculus'],
    },
    {
      name: 'History',
      subCategories: ['Ancient', 'Modern', 'World Wars'],
    },
    {
      name: 'Languages',
      subCategories: ['English', 'Spanish', 'Hebrew', 'French'],
    },
    {
      name: 'Technology',
      subCategories: ['AI', 'Programming', 'Cybersecurity'],
    },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: { name: category.name },
    });

    for (const sub of category.subCategories) {
      await prisma.subCategory.upsert({
        where: { name: sub },
        update: {},
        create: {
          name: sub,
          categoryId: createdCategory.id,
        },
      });
    }
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
