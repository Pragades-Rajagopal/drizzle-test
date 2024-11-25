import "dotenv/config";
import { db } from "./drizzle/db";
import { UserPreferencesTable, UserTable } from "./drizzle/schema";
import { asc, between, sql, eq, count, gte } from "drizzle-orm";

(async () => {
  // await db.delete(UserTable);
  // const userId = await db
  //   .insert(UserTable)
  //   .values([
  //     {
  //       name: "Max",
  //       age: 30,
  //       email: "max@app.com",
  //     },
  //     {
  //       name: "Alex",
  //       age: 35,
  //       email: "alex@app.com",
  //     },
  //   ])
  //   .returning({
  //     id: UserTable.id,
  //     userName: UserTable.name,
  //   }).onConflictDoUpdate({
  //     target: UserTable.email,
  //     set: {name: "Updated name"}
  //   });
  // console.log(userId);

  // await db.insert(UserPreferencesTable).values({
  //   emailUpdates: true,
  //   userId: "8acef599-9657-45ae-ab1a-29c4cde75966",
  // });

  // const users = await db.query.UserTable.findMany({
  //   columns: { id: true, name: true },
  //   // extras: {
  //   //   lowerCaseName: sql<string>`lower(${UserTable.name})`.as("lowerCaseName"),
  //   // },
  //   with: {
  //     preferences: {
  //       columns: {
  //         emailUpdates: true,
  //       },
  //     },
  //     posts: {
  //       with: {
  //         postCategories: true,
  //       },
  //     },
  //   },
  //   orderBy: asc(UserTable.name),
  //   where: (table, functions) => functions.between(table.age, 20, 40),
  // });
  // console.log(users);

  // const users = await db
  //   .select({
  //     id: UserTable.id,
  //     name: UserTable.name,
  //     age: UserTable.age,
  //     // preference: { emailUpdated: UserPreferencesTable.emailUpdates },
  //     emailUpdated: UserPreferencesTable.emailUpdates,
  //   })
  //   .from(UserTable)
  //   .where(between(UserTable.age, 20, 40))
  //   .fullJoin(
  //     UserPreferencesTable,
  //     eq(UserPreferencesTable.userId, UserTable.id)
  //   );

  // const users = await db
  //   .select({
  //     name: UserTable.name,
  //     count: count(UserTable.name),
  //   })
  //   .from(UserTable)
  //   .groupBy(UserTable.name)
  //   .having((columns) => gte(columns.count, 1));

  const users = await db.select().from(UserTable);
  console.log(users);

  const update = await db
    .update(UserTable)
    .set({
      age: 40,
    })
    .where(eq(UserTable.id, "4fcc1211-f99b-44bb-b879-1ad03bcc54e0"));

  const users1 = await db.select().from(UserTable);
  console.log(users1);
})();
