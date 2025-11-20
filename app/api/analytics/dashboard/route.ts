import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/analytics/dashboard - Get dashboard analytics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('restaurantId')

    if (!restaurantId) {
      return NextResponse.json(
        { error: 'Restaurant ID is required' },
        { status: 400 }
      )
    }

    const id = parseInt(restaurantId)

    // Get current month start date
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    // Total wines count
    const totalWines = await prisma.wine.count({
      where: { restaurantId: id }
    })

    // Active wines count
    const activeWines = await prisma.wine.count({
      where: { restaurantId: id, isAvailable: true }
    })

    // Monthly sales
    const monthlySales = await prisma.sale.aggregate({
      where: {
        restaurantId: id,
        saleDate: { gte: monthStart }
      },
      _sum: {
        totalAmount: true
      }
    })

    // Bottles sold this month
    const bottlesSold = await prisma.sale.aggregate({
      where: {
        restaurantId: id,
        saleDate: { gte: monthStart }
      },
      _sum: {
        quantity: true
      }
    })

    // Menu views this month
    const menuViews = await prisma.menuView.count({
      where: {
        restaurantId: id,
        viewDate: { gte: monthStart }
      }
    })

    // Top selling wines
    const topWines = await prisma.sale.groupBy({
      by: ['wineId'],
      where: {
        restaurantId: id,
        saleDate: { gte: monthStart }
      },
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    })

    const topWinesWithDetails = await Promise.all(
      topWines.map(async (item) => {
        const wine = await prisma.wine.findUnique({
          where: { id: item.wineId }
        })
        return {
          ...wine,
          soldQuantity: item._sum.quantity
        }
      })
    )

    // Wine categories breakdown
    const winesByType = await prisma.wine.groupBy({
      by: ['type'],
      where: { restaurantId: id },
      _count: {
        type: true
      }
    })

    return NextResponse.json({
      stats: {
        totalWines,
        activeWines,
        monthlySales: monthlySales._sum.totalAmount || 0,
        bottlesSold: bottlesSold._sum.quantity || 0,
        menuViews
      },
      topWines: topWinesWithDetails,
      winesByType
    })
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
