"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wine } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

export default function SignupPage() {
  const t = useTranslations()
  const tAuth = useTranslations('auth.signup')
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    password: "",
    businessType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/dashboard")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wine className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">{t('common.appName')}</span>
          </div>
          <CardTitle>{tAuth('title')}</CardTitle>
          <CardDescription>{tAuth('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">{tAuth('restaurantName')}</Label>
              <Input
                id="restaurantName"
                placeholder={tAuth('restaurantPlaceholder')}
                value={formData.restaurantName}
                onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">{tAuth('businessType')}</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={tAuth('businessTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">{tAuth('businessTypes.restaurant')}</SelectItem>
                  <SelectItem value="bar">{tAuth('businessTypes.bar')}</SelectItem>
                  <SelectItem value="wine-bar">{tAuth('businessTypes.wineBar')}</SelectItem>
                  <SelectItem value="hotel">{tAuth('businessTypes.hotel')}</SelectItem>
                  <SelectItem value="other">{tAuth('businessTypes.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{tAuth('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={tAuth('emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{tAuth('password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={tAuth('passwordPlaceholder')}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? tAuth('creatingAccount') : tAuth('createAccount')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {tAuth('haveAccount')}{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                {tAuth('signInLink')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
