import { relations } from "drizzle-orm";
import {
  boolean,
  uniqueIndex,
  integer,
  pgEnum,
  pgTable,
  uuid,
  varchar,
  real,
  time,
  primaryKey,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["Basic", "Admin"]);

export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: UserRole("userRole").default("Basic").notNull(),
  },
  (table) => [uniqueIndex("emailIndex").on(table.email)]
);

export const UserPreferencesTable = pgTable("userPreferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
});

export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  averageRating: real("averageRating").notNull().default(0),
  createdAt: time("createdAt").notNull().defaultNow(),
  updatedAt: time("updatedAt").notNull().defaultNow(),
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull(),
});

export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId")
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.postId, table.categoryId] })]
);

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preferences: one(UserPreferencesTable),
    posts: many(PostTable),
  };
});

export const UserPreferencesTableRelations = relations(
  UserPreferencesTable,
  ({ one }) => {
    return {
      user: one(UserTable, {
        fields: [UserPreferencesTable.userId],
        references: [UserTable.id],
      }),
    };
  }
);

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostTable.authorId],
      references: [UserTable.id],
    }),
    postCategories: many(PostCategoryTable),
  };
});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
  return {
    postCategories: many(PostCategoryTable),
  };
});

export const PostCategoryTableRelations = relations(
  PostCategoryTable,
  ({ one }) => {
    return {
      post: one(PostTable, {
        fields: [PostCategoryTable.postId],
        references: [PostTable.id],
      }),
      category: one(CategoryTable, {
        fields: [PostCategoryTable.categoryId],
        references: [CategoryTable.id],
      }),
    };
  }
);
