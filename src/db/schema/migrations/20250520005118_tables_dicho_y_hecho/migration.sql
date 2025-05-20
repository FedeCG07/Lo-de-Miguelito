-- CreateTable
CREATE TABLE "Client" (
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "idOrder" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idClient" INTEGER NOT NULL,
    "idState" INTEGER NOT NULL,
    "amountOfDishes" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "discountPercentage" INTEGER NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    CONSTRAINT "Order_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client" ("idClient") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_idState_fkey" FOREIGN KEY ("idState") REFERENCES "State" ("idState") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderDishes" (
    "idOrderDishes" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idOrder" INTEGER NOT NULL,
    "idDish" INTEGER NOT NULL,
    CONSTRAINT "OrderDishes_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order" ("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDishes_idDish_fkey" FOREIGN KEY ("idDish") REFERENCES "Menu" ("idDish") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "State" (
    "idState" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
