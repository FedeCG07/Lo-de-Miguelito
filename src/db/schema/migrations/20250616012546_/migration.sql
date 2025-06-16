-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "idDish" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,
    CONSTRAINT "Menu_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("desc", "idCategory", "idDish", "name", "price") SELECT "desc", "idCategory", "idDish", "name", "price" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
