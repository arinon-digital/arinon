const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.product.count();
  if (existing > 0) {
    console.log("Products already exist, skipping seed.");
    return;
  }

  await prisma.product.create({
    data: {
      title: "Sample PDF eBook",
      description: "Starter eBook to verify checkout flow.",
      price: 9.99,
      currency: "USD",
      coverUrl: "/assets/img/banner/1.jpg",
      driveLink: "https://drive.google.com/your-sample-link",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
