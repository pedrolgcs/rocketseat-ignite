import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { orders } from './orders'
import { restaurants } from './restaurants'

export const userRoleEnum = pgEnum('user_role', ['manager', 'customer'])

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  role: userRoleEnum('role').default('customer').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

export const usersRelations = relations(users, ({ one, many }) => {
  return {
    managedRestaurant: one(restaurants, {
      fields: [users.id],
      references: [restaurants.managerId],
      relationName: 'managed_restaurant',
    }),
    orders: many(orders),
  }
})
