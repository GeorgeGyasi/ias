import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log("[v0] Starting database setup...");

    // Create staff_profiles table
    const { error: staffError } = await supabase.rpc("exec", {
      sql: `
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
      `,
    });

    if (staffError) {
      console.error("[v0] Error creating staff table:", staffError);
    } else {
      console.log("[v0] Staff profiles table created successfully");
    }

    // Enable RLS
    const { error: rlsError } = await supabase.rpc("exec", {
      sql: `ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;`,
    });

    if (rlsError) {
      console.error("[v0] Error enabling RLS:", rlsError);
    } else {
      console.log("[v0] RLS enabled successfully");
    }

    // Create storage bucket
    const { error: bucketError } = await supabase.storage.createBucket(
      "staff-photos",
      {
        public: true,
      }
    );

    if (bucketError && !bucketError.message.includes("already exists")) {
      console.error("[v0] Error creating storage bucket:", bucketError);
    } else {
      console.log("[v0] Storage bucket ready");
    }

    console.log("[v0] Database setup completed");
  } catch (error) {
    console.error("[v0] Setup error:", error);
    process.exit(1);
  }
}

setupDatabase();
