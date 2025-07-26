"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wine, Search, MapPin, Phone, Clock } from "lucide-react"

// Mock wine data
const mockWines = [
  {
    id: 1,
    name: "Château Margaux 2015",
    type: "Red Wine",
    region: "Bordeaux, France",
    vintage: 2015,
    price: 450,
    description:
      "A legendary wine from one of Bordeaux's most prestigious estates. This vintage offers exceptional elegance with notes of blackcurrant, violet, and subtle oak.",
    alcohol: "13.5%",
    grape: "Cabernet Sauvignon, Merlot",
    available: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Dom Pérignon 2012",
    type: "Champagne",
    region: "Champagne, France",
    vintage: 2012,
    price: 280,
    description:
      "The epitome of luxury champagne. Crisp and refined with notes of citrus, brioche, and mineral complexity.",
    alcohol: "12.5%",
    grape: "Chardonnay, Pinot Noir",
    available: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Sancerre Loire Valley",
    type: "White Wine",
    region: "Loire Valley, France",
    vintage: 2021,
    price: 65,
    description:
      "A crisp and mineral Sauvignon Blanc with notes of gooseberry, citrus, and a distinctive flinty finish.",
    alcohol: "12.8%",
    grape: "Sauvignon Blanc",
    available: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Barolo Brunate 2018",
    type: "Red Wine",
    region: "Piedmont, Italy",
    vintage: 2018,
    price: 120,
    description:
      "A powerful and elegant Nebbiolo with complex aromas of rose, tar, and red fruits. Perfect with rich Italian cuisine.",
    alcohol: "14.2%",
    grape: "Nebbiolo",
    available: false,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function WineMenuPage({ params }: { params: { restaurantId: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredWines = mockWines.filter((wine) => {
    const matchesSearch =
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || wine.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSearch && matchesType
  })

  const wineTypes = ["all", "red wine", "white wine", "champagne"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Wine className="h-10 w-10 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bella Vista Restaurant</h1>
                <p className="text-gray-600">Fine Italian Cuisine & Wine</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4" />
                <span>123 Main Street, Downtown</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Open until 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search wines by name or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {wineTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type === "all" ? "All Wines" : type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Wine Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWines.map((wine) => (
            <Card key={wine.id} className={`overflow-hidden ${!wine.available ? "opacity-60" : ""}`}>
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img src={wine.image || "/placeholder.svg"} alt={wine.name} className="w-32 h-48 object-contain" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{wine.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {wine.region} • {wine.vintage}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${wine.price}</div>
                    {!wine.available && (
                      <Badge variant="secondary" className="mt-1">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{wine.type}</Badge>
                    <span className="text-sm text-gray-600">{wine.alcohol} ABV</span>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-3">{wine.description}</p>

                  <div className="text-sm text-gray-600">
                    <strong>Grape:</strong> {wine.grape}
                  </div>

                  {wine.available && <Button className="w-full mt-4">Add to Order</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWines.length === 0 && (
          <div className="text-center py-12">
            <Wine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No wines found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wine className="h-6 w-6" />
            <span className="text-lg font-semibold">Powered by WineMenu Pro</span>
          </div>
          <p className="text-gray-400">Digital wine menus for modern restaurants</p>
        </div>
      </footer>
    </div>
  )
}
