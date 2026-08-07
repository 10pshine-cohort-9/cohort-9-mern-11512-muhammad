import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// BTW to test this this is PostgreSQL from neon platform, 
// just create an account create a conection string and then copy it to the .env, 
// also copy the schema.sql from database folder and paste it in Neon to create tables and all done  

export default pool;