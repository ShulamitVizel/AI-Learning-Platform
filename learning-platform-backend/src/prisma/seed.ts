import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

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
