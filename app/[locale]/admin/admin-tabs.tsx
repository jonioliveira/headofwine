"use client"

import { Restaurant, Wine } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "next-intl"

type RestaurantWithStats = Restaurant & {
  revenue?: number
  _count: {
    wines: number
  }
}

type WineWithStats = Wine & {
  soldQuantity?: number
  restaurant: {
    name: string
  }
}

type Props = {
  restaurants: RestaurantWithStats[]
  topWines: WineWithStats[]
  revenueByPlan: { plan: string | null; _count: { plan: number } }[]
  avgWinesPerRestaurant: number
  avgRevenuePerRestaurant: number
  totalRevenue: number
}

export function AdminTabs({
  restaurants,
  topWines,
  revenueByPlan,
  avgWinesPerRestaurant,
  avgRevenuePerRestaurant,
  totalRevenue
}: Props) {
  const t = useTranslations('admin')

  return (
    <Tabs defaultValue="restaurants" className="space-y-6">
      <TabsList>
        <TabsTrigger value="restaurants">{t('tabs.restaurants')}</TabsTrigger>
        <TabsTrigger value="analytics">{t('tabs.analytics')}</TabsTrigger>
        <TabsTrigger value="wines">{t('tabs.wines')}</TabsTrigger>
      </TabsList>

      <TabsContent value="restaurants">
        <Card>
          <CardHeader>
            <CardTitle>{t('restaurants.title')}</CardTitle>
            <CardDescription>{t('restaurants.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{restaurant.name}</h3>
                      <Badge variant={restaurant.isActive ? "default" : "secondary"}>
                        {restaurant.isActive ? t('restaurants.active') : t('restaurants.inactive')}
                      </Badge>
                      <Badge variant="outline">{restaurant.plan}</Badge>
                    </div>
                    <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                      <span>{t('restaurants.revenue')}: ${restaurant.revenue?.toFixed(2) || '0.00'}/month</span>
                      <span>{t('restaurants.wines')}: {restaurant._count.wines}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">${restaurant.revenue?.toFixed(2) || '0.00'}</div>
                    <div className="text-sm text-gray-600">{t('restaurants.monthlyRevenue')}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.revenueByPlan')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByPlan.map((item) => (
                  <div key={item.plan || 'unknown'} className="flex items-center justify-between">
                    <span className="capitalize">{item.plan || 'Unknown'}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {item._count.plan} {item._count.plan === 1 ? t('analytics.restaurant') : t('analytics.restaurants')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.platformMetrics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>{t('analytics.avgWines')}</span>
                  <span className="font-semibold">{Math.round(avgWinesPerRestaurant)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('analytics.avgRevenue')}</span>
                  <span className="font-semibold">${Math.round(avgRevenuePerRestaurant)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('analytics.retention')}</span>
                  <span className="font-semibold">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="wines">
        <Card>
          <CardHeader>
            <CardTitle>{t('topWines.title')}</CardTitle>
            <CardDescription>{t('topWines.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWines.map((wine, index) => (
                <div key={wine.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <h3 className="font-semibold">{wine.name}</h3>
                      <p className="text-sm text-gray-600">{wine.restaurant.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${((wine.soldQuantity || 0) * parseFloat(wine.price.toString())).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {wine.soldQuantity || 0} {t('topWines.bottlesSold')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
