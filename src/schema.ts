import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  phone: text(),
}, (table) => {
  return {
    emailIdx: index("email_idx").on(table.email),
  };
});

export const postsTable = sqliteTable("posts_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  userId: int("user_id").notNull().references(() => usersTable.id),
});

export const commentsTable = sqliteTable("comments_table", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  postId: int("post_id").notNull().references(() => postsTable.id),
});