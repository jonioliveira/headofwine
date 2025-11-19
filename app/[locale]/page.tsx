"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wine, BarChart3, Smartphone, Shield } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wine className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">{t('common.appName')}</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost">{t('common.login')}</Button>
            </Link>
            <Link href="/signup">
              <Button>{t('common.getStarted')}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('landing.hero.title')}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('landing.hero.description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                {t('landing.hero.startFreeTrial')}
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                {t('landing.hero.viewDemo')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.features.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Smartphone className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>{t('landing.features.digital.title')}</CardTitle>
                <CardDescription>{t('landing.features.digital.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• {t('landing.features.digital.feature1')}</li>
                  <li>• {t('landing.features.digital.feature2')}</li>
                  <li>• {t('landing.features.digital.feature3')}</li>
                  <li>• {t('landing.features.digital.feature4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>{t('landing.features.analytics.title')}</CardTitle>
                <CardDescription>{t('landing.features.analytics.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• {t('landing.features.analytics.feature1')}</li>
                  <li>• {t('landing.features.analytics.feature2')}</li>
                  <li>• {t('landing.features.analytics.feature3')}</li>
                  <li>• {t('landing.features.analytics.feature4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>{t('landing.features.management.title')}</CardTitle>
                <CardDescription>{t('landing.features.management.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• {t('landing.features.management.feature1')}</li>
                  <li>• {t('landing.features.management.feature2')}</li>
                  <li>• {t('landing.features.management.feature3')}</li>
                  <li>• {t('landing.features.management.feature4')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.pricing.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{t('landing.pricing.starter.name')}</CardTitle>
                <CardDescription>{t('landing.pricing.starter.description')}</CardDescription>
                <div className="text-3xl font-bold">
                  {t('landing.pricing.starter.price')}<span className="text-sm font-normal">{t('landing.pricing.starter.period')}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• {t('landing.pricing.starter.feature1')}</li>
                  <li>• {t('landing.pricing.starter.feature2')}</li>
                  <li>• {t('landing.pricing.starter.feature3')}</li>
                  <li>• {t('landing.pricing.starter.feature4')}</li>
                </ul>
                <Button className="w-full mt-6">{t('landing.pricing.starter.cta')}</Button>
              </CardContent>
            </Card>

            <Card className="border-purple-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">{t('landing.pricing.professional.badge')}</span>
              </div>
              <CardHeader>
                <CardTitle>{t('landing.pricing.professional.name')}</CardTitle>
                <CardDescription>{t('landing.pricing.professional.description')}</CardDescription>
                <div className="text-3xl font-bold">
                  {t('landing.pricing.professional.price')}<span className="text-sm font-normal">{t('landing.pricing.professional.period')}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• {t('landing.pricing.professional.feature1')}</li>
                  <li>• {t('landing.pricing.professional.feature2')}</li>
                  <li>• {t('landing.pricing.professional.feature3')}</li>
                  <li>• {t('landing.pricing.professional.feature4')}</li>
                  <li>• {t('landing.pricing.professional.feature5')}</li>
                </ul>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">{t('landing.pricing.professional.cta')}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('landing.pricing.enterprise.name')}</CardTitle>
                <CardDescription>{t('landing.pricing.enterprise.description')}</CardDescription>
                <div className="text-3xl font-bold">{t('landing.pricing.enterprise.price')}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• {t('landing.pricing.enterprise.feature1')}</li>
                  <li>• {t('landing.pricing.enterprise.feature2')}</li>
                  <li>• {t('landing.pricing.enterprise.feature3')}</li>
                  <li>• {t('landing.pricing.enterprise.feature4')}</li>
                  <li>• {t('landing.pricing.enterprise.feature5')}</li>
                </ul>
                <Button variant="outline" className="w-full mt-6 bg-transparent">
                  {t('landing.pricing.enterprise.cta')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wine className="h-6 w-6" />
                <span className="text-xl font-bold">{t('common.appName')}</span>
              </div>
              <p className="text-gray-400">
                {t('landing.footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.product')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features">{t('landing.footer.features')}</Link>
                </li>
                <li>
                  <Link href="/pricing">{t('landing.footer.pricing')}</Link>
                </li>
                <li>
                  <Link href="/demo">{t('landing.footer.demo')}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.company')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">{t('landing.footer.about')}</Link>
                </li>
                <li>
                  <Link href="/contact">{t('landing.footer.contact')}</Link>
                </li>
                <li>
                  <Link href="/careers">{t('landing.footer.careers')}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.support')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">{t('landing.footer.helpCenter')}</Link>
                </li>
                <li>
                  <Link href="/docs">{t('landing.footer.documentation')}</Link>
                </li>
                <li>
                  <Link href="/status">{t('landing.footer.status')}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
