import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wine, Eye, QrCode, DollarSign, BarChart3, Users } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { DashboardTabs } from "./dashboard-tabs"
import { prisma } from "@/lib/prisma"

// For demo purposes, we'll use restaurant ID 1
// In production, this would come from the authenticated user's session
const RESTAURANT_ID = 1

export default async function RestaurantDashboard() {
  const t = await getTranslations('dashboard')
  const tStats = await getTranslations('dashboard.stats')

  // Get current month start date
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // Fetch restaurant data
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: RESTAURANT_ID },
    include: {
      wines: {
        where: { isAvailable: true },
        orderBy: { name: 'asc' }
      }
    }
  })

  // If restaurant doesn't exist, show error (or redirect to login)
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <p className="text-gray-600 mb-4">
            Please ensure you have created a restaurant in the database.
          </p>
          <p className="text-sm text-gray-500">
            Run: <code className="bg-gray-100 px-2 py-1 rounded">npx prisma migrate dev</code> and seed your database
          </p>
        </div>
      </div>
    )
  }

  // Get stats
  const totalWines = await prisma.wine.count({
    where: { restaurantId: RESTAURANT_ID }
  })

  const activeWines = restaurant.wines.length

  // Monthly sales
  const monthlySales = await prisma.sale.aggregate({
    where: {
      restaurantId: RESTAURANT_ID,
      saleDate: { gte: monthStart }
    },
    _sum: {
      totalAmount: true
    }
  })

  // Bottles sold this month
  const bottlesSold = await prisma.sale.aggregate({
    where: {
      restaurantId: RESTAURANT_ID,
      saleDate: { gte: monthStart }
    },
    _sum: {
      quantity: true
    }
  })

  // Menu views this month
  const menuViews = await prisma.menuView.count({
    where: {
      restaurantId: RESTAURANT_ID,
      viewDate: { gte: monthStart }
    }
  })

  // Get sales data for each wine this month
  const salesByWine = await prisma.sale.groupBy({
    by: ['wineId'],
    where: {
      restaurantId: RESTAURANT_ID,
      saleDate: { gte: monthStart }
    },
    _sum: {
      quantity: true
    }
  })

  // Add sold quantity to wines
  const winesWithSales = restaurant.wines.map((wine) => {
    const sales = salesByWine.find((s) => s.wineId === wine.id)
    return {
      ...wine,
      soldQuantity: sales?._sum.quantity || 0
    }
  })

  // Wine categories breakdown
  const winesByType = await prisma.wine.groupBy({
    by: ['type'],
    where: { restaurantId: RESTAURANT_ID },
    _count: {
      type: true
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Wine className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-gray-600">{t('subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href={`/menu/${restaurant.id}`}>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                {t('viewMenu')}
              </Button>
            </Link>
            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              {t('qrCode')}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('totalWines')}</CardTitle>
              <Wine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWines}</div>
              <p className="text-xs text-muted-foreground">
                {activeWines} {tStats('activeInMenu')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('monthlySales')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${monthlySales._sum.totalAmount?.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">{tStats('salesGrowth')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('bottlesSold')}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bottlesSold._sum.quantity || 0}</div>
              <p className="text-xs text-muted-foreground">{tStats('thisMonth')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tStats('menuViews')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menuViews}</div>
              <p className="text-xs text-muted-foreground">{tStats('thisMonth')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <DashboardTabs
          wines={winesWithSales}
          winesByType={winesByType}
          restaurant={restaurant}
        />
      </div>
    </div>
  )
}
