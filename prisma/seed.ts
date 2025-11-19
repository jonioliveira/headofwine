import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Hash password for demo accounts
  const passwordHash = await bcrypt.hash('password', 10)

  // Create restaurants
  console.log('Creating restaurants...')
  const bellaVista = await prisma.restaurant.upsert({
    where: { email: 'restaurant@demo.com' },
    update: {},
    create: {
      name: 'Bella Vista Restaurant',
      email: 'restaurant@demo.com',
      passwordHash,
      businessType: 'restaurant',
      address: '123 Main Street, Downtown',
      phone: '(555) 123-4567',
      plan: 'professional',
      isActive: true,
    },
  })

  const wineCellar = await prisma.restaurant.upsert({
    where: { email: 'winecellar@demo.com' },
    update: {},
    create: {
      name: 'The Wine Cellar',
      email: 'winecellar@demo.com',
      passwordHash,
      businessType: 'wine-bar',
      address: '456 Oak Avenue, Midtown',
      phone: '(555) 234-5678',
      plan: 'starter',
      isActive: true,
    },
  })

  const chateauBistro = await prisma.restaurant.upsert({
    where: { email: 'chateau@demo.com' },
    update: {},
    create: {
      name: 'Château Bistro',
      email: 'chateau@demo.com',
      passwordHash,
      businessType: 'restaurant',
      address: '789 Pine Street, Uptown',
      phone: '(555) 345-6789',
      plan: 'professional',
      isActive: true,
    },
  })

  const urbanWineBar = await prisma.restaurant.upsert({
    where: { email: 'urban@demo.com' },
    update: {},
    create: {
      name: 'Urban Wine Bar',
      email: 'urban@demo.com',
      passwordHash,
      businessType: 'bar',
      address: '321 Elm Street, Downtown',
      phone: '(555) 456-7890',
      plan: 'enterprise',
      isActive: true,
    },
  })

  const vintageLounge = await prisma.restaurant.upsert({
    where: { email: 'vintage@demo.com' },
    update: {},
    create: {
      name: 'Vintage Lounge',
      email: 'vintage@demo.com',
      passwordHash,
      businessType: 'bar',
      address: '654 Maple Avenue, Suburbs',
      phone: '(555) 567-8901',
      plan: 'starter',
      isActive: false,
    },
  })

  console.log('Created 5 restaurants')

  // Create wines for Bella Vista
  console.log('Creating wines for Bella Vista...')
  const wine1 = await prisma.wine.create({
    data: {
      restaurantId: bellaVista.id,
      name: 'Château Margaux 2015',
      type: 'Red Wine',
      region: 'Bordeaux, France',
      vintage: 2015,
      grapeVariety: 'Cabernet Sauvignon, Merlot',
      price: 450.00,
      description: 'A legendary wine from one of Bordeaux\'s most prestigious estates. This vintage offers exceptional elegance with notes of blackcurrant, violet, and subtle oak.',
      alcoholContent: 13.5,
      stockQuantity: 12,
      isAvailable: true,
    },
  })

  const wine2 = await prisma.wine.create({
    data: {
      restaurantId: bellaVista.id,
      name: 'Dom Pérignon 2012',
      type: 'Champagne',
      region: 'Champagne, France',
      vintage: 2012,
      grapeVariety: 'Chardonnay, Pinot Noir',
      price: 280.00,
      description: 'The epitome of luxury champagne. Crisp and refined with notes of citrus, brioche, and mineral complexity.',
      alcoholContent: 12.5,
      stockQuantity: 6,
      isAvailable: true,
    },
  })

  const wine3 = await prisma.wine.create({
    data: {
      restaurantId: bellaVista.id,
      name: 'Sancerre Loire Valley',
      type: 'White Wine',
      region: 'Loire Valley, France',
      vintage: 2021,
      grapeVariety: 'Sauvignon Blanc',
      price: 65.00,
      description: 'A crisp and mineral Sauvignon Blanc with notes of gooseberry, citrus, and a distinctive flinty finish.',
      alcoholContent: 12.8,
      stockQuantity: 24,
      isAvailable: true,
    },
  })

  const wine4 = await prisma.wine.create({
    data: {
      restaurantId: bellaVista.id,
      name: 'Barolo Brunate 2018',
      type: 'Red Wine',
      region: 'Piedmont, Italy',
      vintage: 2018,
      grapeVariety: 'Nebbiolo',
      price: 120.00,
      description: 'A powerful and elegant Nebbiolo with complex aromas of rose, tar, and red fruits. Perfect with rich Italian cuisine.',
      alcoholContent: 14.2,
      stockQuantity: 0,
      isAvailable: false,
    },
  })

  // Create wines for other restaurants
  console.log('Creating wines for other restaurants...')
  await prisma.wine.createMany({
    data: [
      {
        restaurantId: wineCellar.id,
        name: 'Caymus Cabernet Sauvignon',
        type: 'Red Wine',
        region: 'Napa Valley, USA',
        vintage: 2020,
        grapeVariety: 'Cabernet Sauvignon',
        price: 85.00,
        description: 'Rich and full-bodied with dark fruit flavors and smooth tannins.',
        alcoholContent: 14.5,
        stockQuantity: 18,
        isAvailable: true,
      },
      {
        restaurantId: wineCellar.id,
        name: 'Whispering Angel Rosé',
        type: 'Rosé',
        region: 'Provence, France',
        vintage: 2022,
        grapeVariety: 'Grenache, Cinsault',
        price: 25.00,
        description: 'Pale pink color with fresh strawberry and citrus notes.',
        alcoholContent: 13.0,
        stockQuantity: 30,
        isAvailable: true,
      },
      {
        restaurantId: chateauBistro.id,
        name: 'Opus One 2018',
        type: 'Red Wine',
        region: 'Napa Valley, USA',
        vintage: 2018,
        grapeVariety: 'Cabernet Sauvignon, Merlot',
        price: 380.00,
        description: 'A Bordeaux-style blend from one of California\'s most prestigious wineries.',
        alcoholContent: 14.5,
        stockQuantity: 8,
        isAvailable: true,
      },
      {
        restaurantId: urbanWineBar.id,
        name: 'Krug Grande Cuvée',
        type: 'Champagne',
        region: 'Champagne, France',
        grapeVariety: 'Chardonnay, Pinot Noir, Pinot Meunier',
        price: 180.00,
        description: 'A multi-vintage champagne with exceptional complexity and depth.',
        alcoholContent: 12.0,
        stockQuantity: 15,
        isAvailable: true,
      },
    ],
  })

  console.log('Created wines for all restaurants')

  // Create sales data
  console.log('Creating sales data...')
  const fiveDaysAgo = new Date()
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)

  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  await prisma.sale.createMany({
    data: [
      {
        restaurantId: bellaVista.id,
        wineId: wine1.id,
        quantity: 2,
        unitPrice: 450.00,
        totalAmount: 900.00,
        saleDate: fiveDaysAgo,
      },
      {
        restaurantId: bellaVista.id,
        wineId: wine2.id,
        quantity: 3,
        unitPrice: 280.00,
        totalAmount: 840.00,
        saleDate: threeDaysAgo,
      },
      {
        restaurantId: bellaVista.id,
        wineId: wine3.id,
        quantity: 5,
        unitPrice: 65.00,
        totalAmount: 325.00,
        saleDate: twoDaysAgo,
      },
      {
        restaurantId: bellaVista.id,
        wineId: wine4.id,
        quantity: 1,
        unitPrice: 120.00,
        totalAmount: 120.00,
        saleDate: sevenDaysAgo,
      },
    ],
  })

  console.log('Created sales data')

  // Create menu views
  console.log('Creating menu views...')
  const oneHourAgo = new Date()
  oneHourAgo.setHours(oneHourAgo.getHours() - 1)

  const twoHoursAgo = new Date()
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)

  await prisma.menuView.createMany({
    data: [
      { restaurantId: bellaVista.id, viewDate: oneHourAgo },
      { restaurantId: bellaVista.id, viewDate: twoHoursAgo },
      { restaurantId: wineCellar.id, viewDate: oneHourAgo },
    ],
  })

  console.log('Created menu views')

  // Create admin user
  console.log('Creating admin user...')
  await prisma.adminUser.upsert({
    where: { email: 'admin@headofwine.com' },
    update: {},
    create: {
      email: 'admin@headofwine.com',
      passwordHash,
      role: 'admin',
    },
  })

  console.log('Created admin user')
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
