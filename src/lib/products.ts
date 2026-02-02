import prisma from "./db";

export async function getAllProducts(excludeDriveLink = false) {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return products.map((p) => {
    const base = {
      ...p,
      // ensure coverImage is available for UI expecting it
      coverImage: p.coverImage ?? p.coverUrl,
    };
    if (excludeDriveLink) {
      const { driveLink, ...rest } = base as any;
      return rest;
    }
    return base;
  });
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) return null;
  return { ...product, coverImage: product.coverImage ?? product.coverUrl };
}

