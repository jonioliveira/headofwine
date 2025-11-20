import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/wines - Get all wines with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('restaurantId')
    const type = searchParams.get('type')
    const region = searchParams.get('region')
    const search = searchParams.get('search')

    const where: any = {}

    if (restaurantId) {
      where.restaurantId = parseInt(restaurantId)
    }

    if (type && type !== 'all') {
      where.type = type
    }

    if (region && region !== 'all') {
      where.region = { contains: region, mode: 'insensitive' }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { region: { contains: search, mode: 'insensitive' } },
        { grapeVariety: { contains: search, mode: 'insensitive' } }
      ]
    }

    const wines = await prisma.wine.findMany({
      where,
      include: {
        restaurant: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(wines)
  } catch (error) {
    console.error('Error fetching wines:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wines' },
      { status: 500 }
    )
  }
}

// POST /api/wines - Create new wine
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      restaurantId,
      name,
      type,
      region,
      vintage,
      grapeVariety,
      price,
      description,
      alcoholContent,
      stockQuantity,
      imageUrl
    } = body

    const wine = await prisma.wine.create({
      data: {
        restaurantId: parseInt(restaurantId),
        name,
        type,
        region,
        vintage: vintage ? parseInt(vintage) : null,
        grapeVariety,
        price: parseFloat(price),
        description,
        alcoholContent: alcoholContent ? parseFloat(alcoholContent) : null,
        stockQuantity: stockQuantity ? parseInt(stockQuantity) : 0,
        imageUrl
      }
    })

    return NextResponse.json(wine, { status: 201 })
  } catch (error) {
    console.error('Error creating wine:', error)
    return NextResponse.json(
      { error: 'Failed to create wine' },
      { status: 500 }
    )
  }
}
