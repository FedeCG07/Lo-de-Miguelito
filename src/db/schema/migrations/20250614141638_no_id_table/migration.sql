/*
  Warnings:

  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idTable` on the `Table` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "tableNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reserved" BOOLEAN NOT NULL
);
INSERT INTO "new_Table" ("reserved", "tableNumber") SELECT "reserved", "tableNumber" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
