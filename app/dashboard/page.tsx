"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wine, Plus, Edit, Trash2, Eye, QrCode, BarChart3, Users, DollarSign } from "lucide-react"

// Mock data
const mockWines = [
  { id: 1, name: "Château Margaux 2015", type: "Red", price: 450, stock: 12, sales: 8 },
  { id: 2, name: "Dom Pérignon 2012", type: "Champagne", price: 280, stock: 6, sales: 15 },
  { id: 3, name: "Sancerre Loire Valley", type: "White", price: 65, stock: 24, sales: 32 },
  { id: 4, name: "Barolo Brunate 2018", type: "Red", price: 120, stock: 18, sales: 12 },
]

export default function RestaurantDashboard() {
  const [wines, setWines] = useState(mockWines)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Wine className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold">Bella Vista Restaurant</h1>
              <p className="text-gray-600">Restaurant Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/menu/bella-vista">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                View Menu
              </Button>
            </Link>
            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Wines</CardTitle>
              <Wine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wines.length}</div>
              <p className="text-xs text-muted-foreground">Active in menu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bottles Sold</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menu Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="wines" className="space-y-6">
          <TabsList>
            <TabsTrigger value="wines">Wine Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="wines">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Wine Collection</CardTitle>
                    <CardDescription>Manage your wine menu and inventory</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Wine
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
                          <span>${wine.price}</span>
                          <span>Stock: {wine.stock}</span>
                          <span>Sold: {wine.sales} this month</span>
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
                  <CardTitle>Top Selling Wines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wines
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 3)
                      .map((wine, index) => (
                        <div key={wine.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                            <div>
                              <p className="font-medium">{wine.name}</p>
                              <p className="text-sm text-gray-600">{wine.sales} bottles sold</p>
                            </div>
                          </div>
                          <span className="font-semibold">${wine.price * wine.sales}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wine Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Red Wines</span>
                      <Badge>2 wines</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>White Wines</span>
                      <Badge>1 wine</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Champagne</span>
                      <Badge>1 wine</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Settings</CardTitle>
                <CardDescription>Manage your restaurant information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input id="restaurantName" defaultValue="Bella Vista Restaurant" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Input id="cuisine" defaultValue="Italian" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St, City, State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
