import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/restaurants/[id] - Get single restaurant
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        wines: {
          where: { isAvailable: true },
          orderBy: { name: 'asc' }
        },
        _count: {
          select: {
            wines: true,
            sales: true,
            menuViews: true
          }
        }
      }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(restaurant)
  } catch (error) {
    console.error('Error fetching restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurant' },
      { status: 500 }
    )
  }
}

// PUT /api/restaurants/[id] - Update restaurant
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, address, phone, businessType, plan, isActive } = body

    const restaurant = await prisma.restaurant.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        address,
        phone,
        businessType,
        plan,
        isActive,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(restaurant)
  } catch (error) {
    console.error('Error updating restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to update restaurant' },
      { status: 500 }
    )
  }
}

// DELETE /api/restaurants/[id] - Delete restaurant
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.restaurant.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Restaurant deleted successfully' })
  } catch (error) {
    console.error('Error deleting restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to delete restaurant' },
      { status: 500 }
    )
  }
}
