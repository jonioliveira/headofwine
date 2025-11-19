"use client"

import { Wine as WineType, Restaurant, Sale } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"

type WineWithSales = WineType & {
  soldQuantity?: number
}

type Props = {
  wines: WineWithSales[]
  winesByType: { type: string; _count: { type: number } }[]
  restaurant: Restaurant
}

export function DashboardTabs({ wines, winesByType, restaurant }: Props) {
  const t = useTranslations('dashboard')

  return (
    <Tabs defaultValue="wines" className="space-y-6">
      <TabsList>
        <TabsTrigger value="wines">{t('tabs.wines')}</TabsTrigger>
        <TabsTrigger value="analytics">{t('tabs.analytics')}</TabsTrigger>
        <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
      </TabsList>

      <TabsContent value="wines">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('wines.title')}</CardTitle>
                <CardDescription>{t('wines.description')}</CardDescription>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t('wines.addWine')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wines.map((wine) => (
                <div key={wine.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{wine.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <Badge variant="secondary">{wine.type}</Badge>
                      <span>${wine.price.toString()}</span>
                      <span>{t('wines.stock')}: {wine.stockQuantity}</span>
                      <span>{t('wines.sold')}: {wine.soldQuantity || 0} {t('wines.thisMonth')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
              <CardTitle>{t('analytics.topSelling')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wines
                  .sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0))
                  .slice(0, 3)
                  .map((wine, index) => (
                    <div key={wine.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                        <div>
                          <p className="font-medium">{wine.name}</p>
                          <p className="text-sm text-gray-600">
                            {wine.soldQuantity || 0} {t('analytics.bottlesSold')}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${((wine.soldQuantity || 0) * parseFloat(wine.price.toString())).toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.categories')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {winesByType.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span>{item.type}</span>
                    <Badge>
                      {item._count.type} {item._count.type === 1 ? t('analytics.wine') : t('analytics.wines')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.title')}</CardTitle>
            <CardDescription>{t('settings.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">{t('settings.restaurantName')}</Label>
                <Input id="restaurantName" defaultValue={restaurant.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuisine">{t('settings.cuisineType')}</Label>
                <Input id="cuisine" defaultValue={restaurant.businessType} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('settings.address')}</Label>
                <Input id="address" defaultValue={restaurant.address || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('settings.phone')}</Label>
                <Input id="phone" defaultValue={restaurant.phone || ''} />
              </div>
            </div>
            <Button>{t('save')}</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
