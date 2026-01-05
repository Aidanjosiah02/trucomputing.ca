CREATE TABLE IF NOT EXISTS [members] (
    "id" INTEGER PRIMARY KEY autoincrement,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT
);