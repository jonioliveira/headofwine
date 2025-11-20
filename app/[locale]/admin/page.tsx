import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wine, Building2, DollarSign, TrendingUp } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { AdminTabs } from "./admin-tabs"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboard() {
  const t = await getTranslations('admin')
  const tStats = await getTranslations('admin.stats')

  // Get current month start date
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // Total revenue (all-time sales)
  const totalRevenueData = await prisma.sale.aggregate({
    _sum: {
      totalAmount: true
    }
  })
  const totalRevenue = totalRevenueData._sum.totalAmount || 0

  // Monthly revenue
  const monthlyRevenueData = await prisma.sale.aggregate({
    where: {
      saleDate: { gte: monthStart }
    },
    _sum: {
      totalAmount: true
    }
  })

  // Total restaurants count
  const totalRestaurants = await prisma.restaurant.count()

  // Active restaurants count
  const activeRestaurants = await prisma.restaurant.count({
    where: { isActive: true }
  })

  // Total wines across all restaurants
  const totalWines = await prisma.wine.count()

  // New signups this month
  const newSignups = await prisma.restaurant.count({
    where: {
      createdAt: { gte: monthStart }
    }
  })

  // Get all restaurants with their wine count and revenue
  const restaurants = await prisma.restaurant.findMany({
    include: {
      _count: {
        select: {
          wines: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Get revenue for each restaurant (monthly)
  const restaurantRevenues = await prisma.sale.groupBy({
    by: ['restaurantId'],
    where: {
      saleDate: { gte: monthStart }
    },
    _sum: {
      totalAmount: true
    }
  })

  // Combine restaurants with their revenue
  const restaurantsWithRevenue = restaurants.map((restaurant) => {
    const revenue = restaurantRevenues.find((r) => r.restaurantId === restaurant.id)
    return {
      ...restaurant,
      revenue: revenue?._sum.totalAmount ? parseFloat(revenue._sum.totalAmount.toString()) : 0
    }
  })

  // Revenue by plan
  const revenueByPlan = await prisma.restaurant.groupBy({
    by: ['plan'],
    _count: {
      plan: true
    }
  })

  // Top selling wines across all restaurants
  const topWinesSales = await prisma.sale.groupBy({
    by: ['wineId'],
    _sum: {
      quantity: true,
      totalAmount: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 10
  })

  const topWines = await Promise.all(
    topWinesSales.map(async (sale) => {
      const wine = await prisma.wine.findUnique({
        where: { id: sale.wineId },
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      })
      return wine ? {
        ...wine,
        soldQuantity: sale._sum.quantity || 0
      } : null
    })
  )

  const topWinesFiltered = topWines.filter((w) => w !== null)

  // Calculate averages
  const avgWinesPerRestaurant = totalRestaurants > 0 ? totalWines / totalRestaurants : 0
  const avgRevenuePerRestaurant = totalRestaurants > 0 ? parseFloat(totalRevenue.toString()) / totalRestaurants : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Wine className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('totalRevenue')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toString()}</div>
              <p className="text-xs text-muted-foreground">{tStats('revenueGrowth')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('activeRestaurants')}</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeRestaurants}</div>
              <p className="text-xs text-muted-foreground">
                {t('stats.outOfTotal', { total: totalRestaurants })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('totalWines')}</CardTitle>
              <Wine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWines}</div>
              <p className="text-xs text-muted-foreground">{tStats('acrossRestaurants')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('growthRate')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{newSignups}</div>
              <p className="text-xs text-muted-foreground">{tStats('newSignups')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <AdminTabs
          restaurants={restaurantsWithRevenue}
          topWines={topWinesFiltered}
          revenueByPlan={revenueByPlan}
          avgWinesPerRestaurant={avgWinesPerRestaurant}
          avgRevenuePerRestaurant={avgRevenuePerRestaurant}
          totalRevenue={parseFloat(totalRevenue.toString())}
        />
      </div>
    </div>
  )
}
