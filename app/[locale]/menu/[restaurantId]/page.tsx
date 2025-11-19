"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wine, Search, MapPin, Phone, Clock } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

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
  const t = useTranslations('menu')
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // Helper function to extract country from region string
  const getCountry = (region: string) => {
    const parts = region.split(',')
    return parts.length > 1 ? parts[parts.length - 1].trim() : region
  }

  // Helper function to extract region without country
  const getRegionOnly = (region: string) => {
    const parts = region.split(',')
    return parts.length > 1 ? parts.slice(0, -1).join(',').trim() : region
  }

  const filteredWines = mockWines.filter((wine) => {
    const matchesSearch =
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || wine.type.toLowerCase().includes(selectedType.toLowerCase())
    const matchesCountry = selectedCountry === "all" || getCountry(wine.region) === selectedCountry
    const matchesRegion = selectedRegion === "all" || getRegionOnly(wine.region) === selectedRegion
    return matchesSearch && matchesType && matchesCountry && matchesRegion
  })

  const wineTypes = ["all", "red wine", "white wine", "champagne"]

  // Get unique countries from all wines
  const allCountries = Array.from(new Set(mockWines.map(wine => getCountry(wine.region)))).sort()

  // Get regions based on selected country
  const getAvailableRegions = () => {
    const wines = selectedCountry === "all"
      ? mockWines
      : mockWines.filter(wine => getCountry(wine.region) === selectedCountry)

    return Array.from(new Set(wines.map(wine => getRegionOnly(wine.region)))).sort()
  }

  const availableRegions = getAvailableRegions()

  // Determine if wines are from multiple countries
  const countries = new Set(filteredWines.map(wine => getCountry(wine.region)))
  const hasMultipleCountries = countries.size > 1

  // Function to get the display location for a wine
  const getDisplayLocation = (wine: typeof mockWines[0]) => {
    // Show regions if:
    // 1. A specific country is selected (user is drilling down)
    // 2. OR all filtered wines are from the same country
    const shouldShowRegions = selectedCountry !== "all" || !hasMultipleCountries

    if (shouldShowRegions) {
      return getRegionOnly(wine.region)
    } else {
      return getCountry(wine.region)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Wine className="h-10 w-10 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>{t('address')}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4" />
                  <span>{t('phone')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{t('hours')}</span>
                </div>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Dropdowns Row */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Wine Type Dropdown */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t('filters.selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value="red wine">{t('filters.red')}</SelectItem>
                  <SelectItem value="white wine">{t('filters.white')}</SelectItem>
                  <SelectItem value="champagne">{t('filters.champagne')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Country Dropdown */}
              {allCountries.length > 1 && (
                <Select
                  value={selectedCountry}
                  onValueChange={(value) => {
                    setSelectedCountry(value)
                    setSelectedRegion("all")
                  }}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder={t('filters.selectCountry')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('filters.allCountries')}</SelectItem>
                    {allCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Region Dropdown - Only show when a country is selected */}
              {selectedCountry !== "all" && availableRegions.length > 1 && (
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder={t('filters.selectRegion')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('filters.allRegions')}</SelectItem>
                    {availableRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
                      {getDisplayLocation(wine)} • {wine.vintage}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${wine.price}</div>
                    {!wine.available && (
                      <Badge variant="secondary" className="mt-1">
                        {t('outOfStock')}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{wine.type}</Badge>
                    <span className="text-sm text-gray-600">{wine.alcohol} {t('abv')}</span>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-3">{wine.description}</p>

                  <div className="text-sm text-gray-600">
                    <strong>{t('grape')}:</strong> {wine.grape}
                  </div>

                  {wine.available && <Button className="w-full mt-4">{t('addToOrder')}</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWines.length === 0 && (
          <div className="text-center py-12">
            <Wine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{t('noWines.title')}</h3>
            <p className="text-gray-500">{t('noWines.description')}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wine className="h-6 w-6" />
            <span className="text-lg font-semibold">{t('footer.poweredBy')}</span>
          </div>
          <p className="text-gray-400">{t('footer.description')}</p>
        </div>
      </footer>
    </div>
  )
}
