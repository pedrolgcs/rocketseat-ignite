/* eslint-disable drizzle/enforce-delete-with-where */
import { fakerPT_BR as faker } from '@faker-js/faker'
import chalk from 'chalk'

import { db } from './connection'
import { restaurants, users } from './schema'

async function resetDatabase() {
  await db.delete(users)
  await db.delete(restaurants)

  console.log(chalk.yellow('✓ Database reset!'))
}

async function createCustomers() {
  await db.insert(users).values([
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

  console.log(chalk.yellow('✓ Created customers!'))
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

async function createRestaurants(managerId: string) {
  await db.insert(restaurants).values([
    {
      name: faker.company.name(),
      description: faker.lorem.paragraphs(1),
      managerId,
    },
  ])

  console.log(chalk.yellow('✓ Created restaurants!'))
}

try {
  await resetDatabase()
  await createCustomers()
  const manager = await createManager()
  await createRestaurants(manager.id)
  console.log(chalk.green('✓ Database seeded successfully!'))
} catch (error) {
  console.log(chalk.red('✗ Database seeding failed!'))
} finally {
  process.exit()
}
