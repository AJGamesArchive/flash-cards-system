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
    }});
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
    });
    console.log('System Config Setup');
  };
  if(config) console.log('System Config Already Setup');

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