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
    "totalOrders" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Client" ("address", "email", "fullName", "idClient", "password", "phoneNumber", "totalOrders") SELECT "address", "email", "fullName", "idClient", "password", "phoneNumber", "totalOrders" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE TABLE "new_Order" (
    "idOrder" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idClient" INTEGER NOT NULL,
    "idState" INTEGER NOT NULL DEFAULT 1,
    "amountOfDishes" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "discountPercentage" INTEGER NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    CONSTRAINT "Order_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client" ("idClient") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_idState_fkey" FOREIGN KEY ("idState") REFERENCES "State" ("idState") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("amountOfDishes", "deliveryAddress", "discountPercentage", "idClient", "idOrder", "idState", "totalPrice") SELECT "amountOfDishes", "deliveryAddress", "discountPercentage", "idClient", "idOrder", "idState", "totalPrice" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
