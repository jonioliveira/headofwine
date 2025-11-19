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
import { Wine } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

export default function LoginPage() {
  const t = useTranslations()
  const tAuth = useTranslations('auth.login')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    if (email === "admin@winemenu.com") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }

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
              <Label htmlFor="email">{tAuth('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={tAuth('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{tAuth('password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={tAuth('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? tAuth('signingIn') : tAuth('signIn')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {tAuth('noAccount')}{" "}
              <Link href="/signup" className="text-purple-600 hover:underline">
                {tAuth('signUpLink')}
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p className="font-semibold mb-1">{tAuth('demoAccounts')}</p>
            <p>{tAuth('restaurantDemo')}</p>
            <p>{tAuth('adminDemo')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
