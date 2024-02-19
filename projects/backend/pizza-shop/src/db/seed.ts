import { fakerPT_BR as faker } from '@faker-js/faker'
import chalk from 'chalk'

import { db } from './connection'
import { restaurants, users } from './schema'

await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('✓ Database reset!'))

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

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraphs(1),
    managerId: manager.id,
  },
])

console.log(chalk.yellow('✓ Created restaurants!'))

console.log(chalk.green('✓ Database seeded successfully!'))

process.exit()
