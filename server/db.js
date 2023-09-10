
const { Client } = require("pg");
require("dotenv").config()


const pool = new Client(process.env.DATABASE_URL);

(async () => {
  await pool.connect();

})();


module.exports = pool;