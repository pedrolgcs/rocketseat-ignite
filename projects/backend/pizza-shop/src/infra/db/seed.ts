/* eslint-disable drizzle/enforce-delete-with-where */
import { fakerPT_BR as faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import chalk from 'chalk'

import { db } from './connection'
import {
  authLinks,
  orderItems,
  orders,
  products,
  restaurants,
  users,
} from './schema'

async function resetDatabase() {
  await db.delete(users)
  await db.delete(restaurants)
  await db.delete(orderItems)
  await db.delete(products)
  await db.delete(orders)
  await db.delete(authLinks)

  console.log(chalk.yellow('✓ Database reset!'))
}

async function createCustomers() {
  const [customer1, customer2] = await db
    .insert(users)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email().toLocaleLowerCase(),
        phone: faker.phone.number(),
        role: 'customer',
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email().toLocaleLowerCase(),
        phone: faker.phone.number(),
        role: 'customer',
      },
    ])
    .returning()

  console.log(chalk.yellow('✓ Created customers!'))

  return [customer1, customer2]
}

async function createManager() {
  const [manager] = await db
    .insert(users)
    .values([
      {
        name: faker.person.fullName(),
        email: 'admin@admin.com',
        phone: faker.phone.number(),
        role: 'manager',
      },
    ])
    .returning({ id: users.id })

  console.log(chalk.yellow('✓ Created manager!'))

  return manager
}

async function createRestaurant(managerId: string) {
  const [restaurant] = await db
    .insert(restaurants)
    .values([
      {
        name: faker.company.name(),
        description: faker.lorem.paragraphs(1),
        managerId,
      },
    ])
    .returning()

  console.log(chalk.yellow('✓ Created restaurants!'))

  return restaurant
}

async function createAvailableProducts(restaurantId: string) {
  function generateRandomProduct() {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      restaurantId,
      priceInCents: Number(
        faker.commerce.price({ min: 190, max: 490, dec: 0 }),
      ),
    }
  }

  const createdProducts = await db
    .insert(products)
    .values([
      generateRandomProduct(),
      generateRandomProduct(),
      generateRandomProduct(),
      generateRandomProduct(),
      generateRandomProduct(),
      generateRandomProduct(),
    ])
    .returning()

  console.log(chalk.yellow('✓ Created products!'))

  return createdProducts
}

async function createOrders(
  productsList: (typeof products.$inferSelect)[],
  customers: (typeof users.$inferSelect)[],
  restaurant: typeof restaurants.$inferSelect,
) {
  const ordersToInsert: (typeof orders.$inferInsert)[] = []
  const orderItemsToInsert: (typeof orderItems.$inferInsert)[] = []
  const [customer1, customer2] = customers

  for (let i = 0; i < 20; i++) {
    const orderId = createId()

    const orderProducts = faker.helpers.arrayElements(productsList, {
      min: 1,
      max: 3,
    })

    let totalInCents = 0

    orderProducts.forEach((orderProduct) => {
      const quantity = faker.number.int({ min: 1, max: 3 })
      totalInCents += orderProduct.priceInCents * quantity

      orderItemsToInsert.push({
        orderId,
        priceInCents: orderProduct.priceInCents,
        quantity,
        productId: orderProduct.id,
      })
    })

    ordersToInsert.push({
      id: orderId,
      customerId: faker.helpers.arrayElement([customer1.id, customer2.id]),
      restaurantId: restaurant.id,
      totalInCents,
      status: faker.helpers.arrayElement([
        'pending',
        'processing',
        'delivering',
        'delivered',
        'canceled',
      ]),
      created_at: faker.date.recent({ days: 40 }),
    })
  }

  await db.insert(orders).values(ordersToInsert)
  await db.insert(orderItems).values(orderItemsToInsert)

  console.log(chalk.yellow('✓ Created orders!'))
}

try {
  await resetDatabase()
  const customers = await createCustomers()
  const manager = await createManager()
  const restaurant = await createRestaurant(manager.id)
  const createdProducts = await createAvailableProducts(restaurant.id)
  await createOrders(createdProducts, customers, restaurant)

  console.log(chalk.green('✓ Database seeded successfully!'))
} catch (error) {
  resetDatabase()
  console.log(chalk.red('✗ Database seeding failed!'))
} finally {
  process.exit()
}
