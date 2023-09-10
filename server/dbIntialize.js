const { Client } = require("pg");
require("dotenv").config()

const client = new Client(process.env.DATABASE_URL);

(async () => {
  await client.connect();
  try {
    // Drop and recreate the 'public' schema
    await client.query(`
      DROP TABLE users;

    `);

    // Create the 'users' table
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(28) NOT NULL UNIQUE,
        passhash VARCHAR NOT NULL,
        userid VARCHAR NOT NULL UNIQUE
      );
    `);

    console.log("DROPPED OLD TABLE AND CREATED NEW ONE SUCCESSFULLY.");
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    client.end();
  }
})();
