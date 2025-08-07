import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export async function GET(request, { params }) {
  const { slug } = params
  const reviews = await db.review.findMany({
    where: { product: { slug } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(reviews)
}

export async function POST(request, { params }) {
  const { slug } = params
  const { name, text, rating } = await request.json()
  const newReview = await db.review.create({
    data: {
      name, text, rating: Number(rating),
      product: { connect: { slug } }
    }
  })
  return NextResponse.json(newReview)
} 
