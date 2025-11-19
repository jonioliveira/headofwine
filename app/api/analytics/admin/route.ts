import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/analytics/admin - Get admin platform analytics
export async function GET() {
  try {
    // Get current month start date
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    // Total revenue
    const totalRevenue = await prisma.sale.aggregate({
      _sum: {
        totalAmount: true
      }
    })

    // Monthly revenue
    const monthlyRevenue = await prisma.sale.aggregate({
      where: {
        saleDate: { gte: monthStart }
      },
      _sum: {
        totalAmount: true
      }
    })

    // Total restaurants
    const totalRestaurants = await prisma.restaurant.count()

    // Active restaurants
    const activeRestaurants = await prisma.restaurant.count({
      where: { isActive: true }
    })

    // Total wines
    const totalWines = await prisma.wine.count()

    // New signups this month
    const newSignups = await prisma.restaurant.count({
      where: {
        createdAt: { gte: monthStart }
      }
    })

    // Revenue by plan
    const revenueByPlan = await prisma.restaurant.groupBy({
      by: ['plan'],
      _count: {
        plan: true
      }
    })

    // Top performing restaurants
    const topRestaurants = await prisma.sale.groupBy({
      by: ['restaurantId'],
      _sum: {
        totalAmount: true
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc'
        }
      },
      take: 10
    })

    const topRestaurantsWithDetails = await Promise.all(
      topRestaurants.map(async (item) => {
        const restaurant = await prisma.restaurant.findUnique({
          where: { id: item.restaurantId },
          include: {
            _count: {
              select: {
                wines: true
              }
            }
          }
        })
        return {
          ...restaurant,
          revenue: item._sum.totalAmount
        }
      })
    })

    // Top selling wines across all restaurants
    const topWines = await prisma.sale.groupBy({
      by: ['wineId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 10
    })

    const topWinesWithDetails = await Promise.all(
      topWines.map(async (item) => {
        const wine = await prisma.wine.findUnique({
          where: { id: item.wineId },
          include: {
            restaurant: {
              select: {
                name: true
              }
            }
          }
        })
        return {
          ...wine,
          soldQuantity: item._sum.quantity
        }
      })
    })

    return NextResponse.json({
      stats: {
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        monthlyRevenue: monthlyRevenue._sum.totalAmount || 0,
        totalRestaurants,
        activeRestaurants,
        totalWines,
        newSignups
      },
      revenueByPlan,
      topRestaurants: topRestaurantsWithDetails,
      topWines: topWinesWithDetails
    })
  } catch (error) {
    console.error('Error fetching admin analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
