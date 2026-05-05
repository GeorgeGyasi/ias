import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const STAFF_DATA = [
  { name: 'Prof. Asante', role: 'Senior Member', email: 'p.asante@university.edu', specialty: 'African Studies', photo_url: '/images/professor-asante.jpg' },
  { name: 'Prof. Dzodzi Tsikata', role: 'Senior Member', email: 'p.tsikata@university.edu', specialty: 'Law & Development', photo_url: '/images/professor-dzodzi-tsikata.jpg' },
  { name: 'Prof. Takyiwaa Manuh', role: 'Senior Member', email: 'p.manuh@university.edu', specialty: 'Gender Studies', photo_url: '/images/professor-takyiwaa-manuh.jpg' },
  { name: 'Prof. Albert Awedoba', role: 'Senior Member', email: 'p.awedoba@university.edu', specialty: 'Anthropology', photo_url: '/images/professor-albert-awedoba.jpg' },
  { name: 'Prof. Avorgbedor', role: 'Senior Member', email: 'p.avorgbedor@university.edu', specialty: 'Music & Culture', photo_url: '/images/professor-avorgbedor.jpg' },
  { name: 'Dr. Nii Dortey', role: 'Senior Member', email: 'dr.dortey@university.edu', specialty: 'Literature', photo_url: '/images/dr-nii-dortey.jpg' },
];

async function initDatabase() {
  let client;
  try {
    console.log('[v0] Initializing Neon database with all tables...');
    client = await pool.connect();

    // Create staff_profiles table
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
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('[v0] staff_profiles table created');

    // Create events table
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        date TIMESTAMP WITH TIME ZONE NOT NULL,
        location TEXT,
        event_type TEXT,
        image_url TEXT,
        attendee_limit INT,
        registration_link TEXT,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('[v0] events table created');

    // Create blog_posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author_id UUID,
        featured_image TEXT,
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP WITH TIME ZONE,
        category TEXT,
        tags TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('[v0] blog_posts table created');

    // Create research_projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS research_projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        lead_researcher_id UUID,
        start_date DATE,
        end_date DATE,
        status TEXT DEFAULT 'ongoing',
        funding_source TEXT,
        image_url TEXT,
        publications TEXT[],
        collaborators TEXT[],
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('[v0] research_projects table created');

    // Create users table (members)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'member',
        status TEXT DEFAULT 'active',
        is_admin BOOLEAN DEFAULT false,
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('[v0] users table created');

    // Create resources table (documents)
    await client.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        file_url TEXT NOT NULL,
        file_type TEXT,
        category TEXT,
        tags TEXT[],
        download_count INT DEFAULT 0,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('[v0] resources table created');

    // Seed staff data
    console.log('[v0] Seeding staff data...');
    for (const staff of STAFF_DATA) {
      await client.query(
        `INSERT INTO staff_profiles (name, role, email, specialty, photo_url) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING`,
        [staff.name, staff.role, staff.email, staff.specialty, staff.photo_url]
      );
    }
    console.log('[v0] Seeded', STAFF_DATA.length, 'staff members');

    console.log('[v0] Database initialization complete!');
  } catch (error) {
    console.error('[v0] Database initialization error:', error);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

initDatabase();
