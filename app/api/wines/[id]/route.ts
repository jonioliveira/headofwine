import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/wines/[id] - Get single wine
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wine = await prisma.wine.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true
          }
        }
      }
    })

    if (!wine) {
      return NextResponse.json(
        { error: 'Wine not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(wine)
  } catch (error) {
    console.error('Error fetching wine:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wine' },
      { status: 500 }
    )
  }
}

// PUT /api/wines/[id] - Update wine
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      region,
      vintage,
      grapeVariety,
      price,
      description,
      alcoholContent,
      stockQuantity,
      isAvailable,
      imageUrl
    } = body

    const wine = await prisma.wine.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        type,
        region,
        vintage: vintage ? parseInt(vintage) : null,
        grapeVariety,
        price: price ? parseFloat(price) : undefined,
        description,
        alcoholContent: alcoholContent ? parseFloat(alcoholContent) : null,
        stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : undefined,
        isAvailable,
        imageUrl,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(wine)
  } catch (error) {
    console.error('Error updating wine:', error)
    return NextResponse.json(
      { error: 'Failed to update wine' },
      { status: 500 }
    )
  }
}

// DELETE /api/wines/[id] - Delete wine
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.wine.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Wine deleted successfully' })
  } catch (error) {
    console.error('Error deleting wine:', error)
    return NextResponse.json(
      { error: 'Failed to delete wine' },
      { status: 500 }
    )
  }
}
