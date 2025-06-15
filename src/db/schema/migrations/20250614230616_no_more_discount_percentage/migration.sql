/*
  Warnings:

  - You are about to drop the column `discountPercentage` on the `Client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "totalOrders" INTEGER NOT NULL DEFAULT 0,
    "role" TEXT NOT NULL DEFAULT 'Client',
    "reservedTable" INTEGER,
    CONSTRAINT "Client_reservedTable_fkey" FOREIGN KEY ("reservedTable") REFERENCES "Table" ("tableNumber") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "email", "fullName", "idClient", "password", "phoneNumber", "reservedTable", "role", "totalOrders") SELECT "address", "email", "fullName", "idClient", "password", "phoneNumber", "reservedTable", "role", "totalOrders" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
