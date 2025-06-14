/*
  Warnings:

  - Added the required column `amount` to the `OrderDishes` table without a default value. This is not possible if the table is not empty.

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
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "reservedTable" INTEGER,
    CONSTRAINT "Client_reservedTable_fkey" FOREIGN KEY ("reservedTable") REFERENCES "Table" ("tableNumber") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "discountPercentage", "email", "fullName", "idClient", "password", "phoneNumber", "reservedTable", "role", "totalOrders") SELECT "address", "discountPercentage", "email", "fullName", "idClient", "password", "phoneNumber", "reservedTable", "role", "totalOrders" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE TABLE "new_OrderDishes" (
    "idOrderDishes" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idOrder" INTEGER NOT NULL,
    "idDish" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "OrderDishes_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order" ("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDishes_idDish_fkey" FOREIGN KEY ("idDish") REFERENCES "Menu" ("idDish") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderDishes" ("idDish", "idOrder", "idOrderDishes") SELECT "idDish", "idOrder", "idOrderDishes" FROM "OrderDishes";
DROP TABLE "OrderDishes";
ALTER TABLE "new_OrderDishes" RENAME TO "OrderDishes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
