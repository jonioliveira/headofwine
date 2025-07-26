"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wine, Building2, DollarSign, TrendingUp } from "lucide-react"

// Mock data for admin dashboard
const mockRestaurants = [
  { id: 1, name: "Bella Vista Restaurant", plan: "Professional", revenue: 4500, wines: 45, active: true },
  { id: 2, name: "The Wine Cellar", plan: "Starter", revenue: 1200, wines: 25, active: true },
  { id: 3, name: "Château Bistro", plan: "Professional", revenue: 3800, wines: 38, active: true },
  { id: 4, name: "Urban Wine Bar", plan: "Enterprise", revenue: 8900, wines: 120, active: true },
  { id: 5, name: "Vintage Lounge", plan: "Starter", revenue: 950, wines: 18, active: false },
]

const mockTopWines = [
  { name: "Dom Pérignon 2012", restaurant: "Urban Wine Bar", sales: 45, revenue: 12600 },
  { name: "Château Margaux 2015", restaurant: "Château Bistro", sales: 28, revenue: 12600 },
  { name: "Sancerre Loire Valley", restaurant: "Bella Vista Restaurant", sales: 67, revenue: 4355 },
  { name: "Barolo Brunate 2018", restaurant: "The Wine Cellar", sales: 34, revenue: 4080 },
]

export default function AdminDashboard() {
  const totalRevenue = mockRestaurants.reduce((sum, r) => sum + r.revenue, 0)
  const activeRestaurants = mockRestaurants.filter((r) => r.active).length
  const totalWines = mockRestaurants.reduce((sum, r) => sum + r.wines, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Wine className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold">WineMenu Pro Admin</h1>
              <p className="text-gray-600">Platform Administration Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Restaurants</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeRestaurants}</div>
              <p className="text-xs text-muted-foreground">Out of {mockRestaurants.length} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Wines</CardTitle>
              <Wine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWines}</div>
              <p className="text-xs text-muted-foreground">Across all restaurants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23%</div>
              <p className="text-xs text-muted-foreground">New signups this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="wines">Top Wines</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Management</CardTitle>
                <CardDescription>Overview of all restaurants using the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{restaurant.name}</h3>
                          <Badge variant={restaurant.active ? "default" : "secondary"}>
                            {restaurant.active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">{restaurant.plan}</Badge>
                        </div>
                        <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                          <span>Revenue: ${restaurant.revenue}/month</span>
                          <span>Wines: {restaurant.wines}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">${restaurant.revenue}</div>
                        <div className="text-sm text-gray-600">Monthly Revenue</div>
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
                  <CardTitle>Revenue by Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Enterprise</span>
                      <div className="text-right">
                        <div className="font-semibold">$8,900</div>
                        <div className="text-sm text-gray-600">1 restaurant</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Professional</span>
                      <div className="text-right">
                        <div className="font-semibold">$8,300</div>
                        <div className="text-sm text-gray-600">2 restaurants</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Starter</span>
                      <div className="text-right">
                        <div className="font-semibold">$2,150</div>
                        <div className="text-sm text-gray-600">2 restaurants</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Average wines per restaurant</span>
                      <span className="font-semibold">{Math.round(totalWines / mockRestaurants.length)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average revenue per restaurant</span>
                      <span className="font-semibold">${Math.round(totalRevenue / mockRestaurants.length)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer retention rate</span>
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
                <CardTitle>Top Performing Wines</CardTitle>
                <CardDescription>Best selling wines across all restaurants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopWines.map((wine, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                        <div>
                          <h3 className="font-semibold">{wine.name}</h3>
                          <p className="text-sm text-gray-600">{wine.restaurant}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${wine.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{wine.sales} bottles sold</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
