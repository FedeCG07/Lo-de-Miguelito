-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "tableNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reserved" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Table" ("reserved", "tableNumber") SELECT "reserved", "tableNumber" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
