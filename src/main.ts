import "dotenv/config";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";

(async () => {
  await db.insert(UserTable).values({
    name: "Max",
  });
  const user = await db.query.UserTable.findFirst();
  console.log(user);
})();
