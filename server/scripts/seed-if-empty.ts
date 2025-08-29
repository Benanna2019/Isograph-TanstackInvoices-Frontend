import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function seedIfEmpty() {
  try {
    // Check if there's any data in the database
    const userCount = await prisma.user.count();
    const customerCount = await prisma.customer.count();

    if (userCount === 0 && customerCount === 0) {
      console.log("Database is empty, running seed script...");
      execSync("npx prisma db seed", { stdio: "inherit", cwd: "./server" });
      console.log("Seed completed successfully!");
    } else {
      console.log("Database already has data, skipping seed.");
    }
  } catch (error) {
    console.error("Error checking database or seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedIfEmpty();
