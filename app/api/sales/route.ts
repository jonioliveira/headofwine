import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sales - Get sales with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('restaurantId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}

    if (restaurantId) {
      where.restaurantId = parseInt(restaurantId)
    }

    if (startDate || endDate) {
      where.saleDate = {}
      if (startDate) {
        where.saleDate.gte = new Date(startDate)
      }
      if (endDate) {
        where.saleDate.lte = new Date(endDate)
      }
    }

    const sales = await prisma.sale.findMany({
      where,
      include: {
        wine: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        restaurant: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        saleDate: 'desc'
      }
    })

    return NextResponse.json(sales)
  } catch (error) {
    console.error('Error fetching sales:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    )
  }
}

// POST /api/sales - Create new sale
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { restaurantId, wineId, quantity, unitPrice } = body

    const totalAmount = parseFloat(unitPrice) * parseInt(quantity)

    const sale = await prisma.sale.create({
      data: {
        restaurantId: parseInt(restaurantId),
        wineId: parseInt(wineId),
        quantity: parseInt(quantity),
        unitPrice: parseFloat(unitPrice),
        totalAmount
      }
    })

    // Update wine stock
    await prisma.wine.update({
      where: { id: parseInt(wineId) },
      data: {
        stockQuantity: {
          decrement: parseInt(quantity)
        }
      }
    })

    return NextResponse.json(sale, { status: 201 })
  } catch (error) {
    console.error('Error creating sale:', error)
    return NextResponse.json(
      { error: 'Failed to create sale' },
      { status: 500 }
    )
  }
}
