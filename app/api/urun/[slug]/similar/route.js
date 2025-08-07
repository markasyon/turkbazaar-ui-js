// app/api/urun/[slug]/similar/route.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request, { params }) {
  const { slug } = params
  const prod = await prisma.product.findUnique({
    where: { slug },
    select: { id: true }
  })
  if (!prod) return new Response(JSON.stringify({ message: 'Ürün bulunamadı.' }), { status: 404 })

  const others = await prisma.product.findMany({
    where: { id: { not: prod.id } },
    select: { slug: true, title: true, image: true },
    take: 3
  })
  return new Response(JSON.stringify(others), { status: 200 })
} 
