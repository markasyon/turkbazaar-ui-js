import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export async function GET(request, { params }) {
  const { slug } = params
  const urun = await db.product.findUnique({
    where: { slug },
    include: {
      reviews: true
    }
  })
  if (!urun) return NextResponse.notFound()
  // aynı zamanda benzer ürünleri de alıyoruz (örnek: ilk 3 farklı slug)
  const similar = await db.product.findMany({
    where: { slug: { not: slug } },
    take: 3,
    select: { slug: true, title: true, image: true }
  })
  return NextResponse.json({ urun, similar })
} 
