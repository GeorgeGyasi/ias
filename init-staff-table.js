const { Pool } = require('pg');

// Parse the connection string
const connectionUrl = process.env.POSTGRES_URL;
if (!connectionUrl) {
  console.error('[v0] POSTGRES_URL not set');
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionUrl,
  ssl: false,
});

async function createStaffTable() {
  let client;
  try {
    console.log('[v0] Connecting to database...');
    client = await pool.connect();
    console.log('[v0] Connected successfully');
    
    console.log('[v0] Creating staff_profiles table...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS staff_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        specialty TEXT,
        email TEXT NOT NULL UNIQUE,
        photo_url TEXT,
        bio TEXT,
        department TEXT,
        rank TEXT,
        phone TEXT,
        office TEXT,
        research_interests TEXT,
        publications TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    console.log('[v0] Table created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Error:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

createStaffTable();
