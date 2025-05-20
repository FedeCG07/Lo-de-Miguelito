-- CreateTable
CREATE TABLE "Menu" (
    "idDish" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,
    CONSTRAINT "Menu_idDish_fkey" FOREIGN KEY ("idDish") REFERENCES "Category" ("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "idCategory" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL
);
