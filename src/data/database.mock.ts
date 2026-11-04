import { DatabaseSync } from 'node:sqlite';

function createDB () {
const database = new DatabaseSync(':memory:');
const query = database.prepare(`
  CREATE TABLE "Shows" (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR,
	isWatched INTEGER NOT NULL DEFAULT 0,
	rating DECIMAL,
	review VARCHAR,
	writtenBy VARCHAR,
	timesSeen INTEGER NOT NULL DEFAULT 0
);
  `); 

query.all()

return database
}

export default createDB()