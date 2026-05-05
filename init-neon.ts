import { Pool } from 'pg';

async function initializeDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('[v0] DATABASE_URL not set');
    process.exit(1);
  }

  console.log('[v0] Connecting to Neon database...');
  const pool = new Pool({
    connectionString,
    ssl: true,
  });

  try {
    const client = await pool.connect();
    console.log('[v0] Connected to Neon successfully');

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

    console.log('[v0] Table created successfully');

    // Insert sample staff data
    console.log('[v0] Inserting sample staff data...');
    await client.query(`
      INSERT INTO staff_profiles (name, role, specialty, email, photo_url)
      VALUES
        ('Prof. Asante', 'Senior Member', 'African Studies', 'p.asante@university.edu', '/images/professor-asante.jpg'),
        ('Prof. Dzodzi Tsikata', 'Senior Member', 'Law & Development', 'p.tsikata@university.edu', '/images/professor-dzodzi-tsikata.jpg'),
        ('Prof. Takyiwaa Manuh', 'Senior Member', 'Gender Studies', 'p.manuh@university.edu', '/images/professor-takyiwaa-manuh.jpg'),
        ('Prof. Albert Awedoba', 'Senior Member', 'Anthropology', 'p.awedoba@university.edu', '/images/professor-albert-awedoba.jpg'),
        ('Prof. Avorgbedor', 'Senior Member', 'Music & Culture', 'p.avorgbedor@university.edu', '/images/professor-avorgbedor.jpg'),
        ('Dr. Nii Dortey', 'Senior Member', 'Literature', 'dr.dortey@university.edu', '/images/dr-nii-dortey.jpg')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('[v0] Sample data inserted successfully');
    
    client.release();
    console.log('[v0] Database initialized successfully!');
  } catch (error: any) {
    console.error('[v0] Error:', error.message);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
