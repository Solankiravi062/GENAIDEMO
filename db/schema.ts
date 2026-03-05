import { pgTable, text, varchar, timestamp, index, uuid } from 'drizzle-orm/pg-core';

export const shortenedLinks = pgTable(
  'shortened_links',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
    userId: text('user_id').notNull(),
    originalUrl: text('original_url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
  })
);
