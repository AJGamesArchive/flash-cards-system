// Import Prisma Client
import { PrismaClient } from '@prisma/client';

// Create DB connection
const db = new PrismaClient();

/**
 * Function to insert core base data into the database
 */
async function seedDatabase() {
  // Check if a base admin user is already present
  const admin = await db.users.findUnique({
    where: { userUUID: 'ba57db28-61e3-42b8-840d-0e5908ef7603' },
  });
  
  // Add base admin user if required
  if(!admin) {
    await db.users.create({ data: {
      userUUID: 'ba57db28-61e3-42b8-840d-0e5908ef7603',
      username: 'TestVar Admin',
      password: "$2b$10$2eRRixttiYaLMBSAkcaN.ugQkNa3d0.VHvTFappwzdmEuthSncEtO",
      adminFlag: true,
    }}).catch((error: any) => console.error('Failed to seed Admin user: ', error));
    console.log('Admin User Created');
  };
  if(admin) console.log("Admin User Already Exists");

  // Check if core system config is present
  const config = await db.systemConfig.findUnique({
    where: { configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30' },
  });

  // Add base system config if required
  if(!config) {
    await db.systemConfig.create({
      data: {
        configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30',
        setCreationLimit: 20,
      },
    }).catch((error: any) => console.error('Failed to seed system config: ', error));
    console.log('System Config Setup');
  };
  if(config) console.log('System Config Already Setup');

  // Check if core flashcard difficulties are present
  const difficulties = await db.difficulties.findMany({
    where: {
      OR: [
        { value: 'Easy' },
        { value: 'Medium' },
        { value: 'Hard' },
      ],
    },
  });

  // Add base system difficulties if required
  if(difficulties.length !== 3) {
    const easy = difficulties.find((d) => d.value === 'Easy');
    if(!easy) {
      await db.difficulties.create({
        data: {
          difficultyUUID: 'fc032fc8-8e9e-411e-8a3b-b3b2a2c87d29',
          value: 'Easy',
        },
      }).catch((error: any) => console.error('Failed to seed Easy difficulty: ', error));
    };
    const medium = difficulties.find((d) => d.value === 'Medium');
    if(!medium) {
      await db.difficulties.create({
        data: {
          difficultyUUID: 'c0eb0660-3bde-4186-82dc-b88d4f8b5c3a',
          value: 'Medium',
        },
      }).catch((error: any) => console.error('Failed to seed Medium difficulty: ', error));
    };
    const hard = difficulties.find((d) => d.value === 'Hard');
    if(!hard) {
      await db.difficulties.create({
        data: {
          difficultyUUID: '6e516256-0756-4f6d-b8fe-e937bdce14f4',
          value: 'Hard',
        },
      }).catch((error: any) => console.error('Failed to seed Hard difficulty: ', error));
    };
    console.log('Flashcard Difficulties Setup');
  };
  if(difficulties.length === 3) console.log('Flashcard Difficulties Already Setup');

  return;
};

// Trigger seed
seedDatabase()
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });