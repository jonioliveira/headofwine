import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/restaurants - Get all restaurants
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        _count: {
          select: {
            wines: true,
            sales: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}

// POST /api/restaurants - Create new restaurant
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, passwordHash, businessType, address, phone, plan } = body

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        email,
        passwordHash,
        businessType,
        address,
        phone,
        plan: plan || 'starter'
      }
    })

    return NextResponse.json(restaurant, { status: 201 })
  } catch (error) {
    console.error('Error creating restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to create restaurant' },
      { status: 500 }
    )
  }
}
