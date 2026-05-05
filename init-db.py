#!/usr/bin/env python3
"""Initialize Supabase database schema for the admin panel."""

import os
import sys
from typing import Optional

# Try to use httpx for async requests, fall back to urllib
try:
    import httpx
    HAS_HTTPX = True
except ImportError:
    HAS_HTTPX = False
    import urllib.request
    import urllib.error
    import json as json_module

def get_headers() -> dict:
    """Get headers for Supabase API requests."""
    return {
        "Authorization": f"Bearer {os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')}",
        "Content-Type": "application/json",
        "apiKey": os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", ""),
    }

def run_sql(sql: str) -> Optional[dict]:
    """Execute SQL on Supabase."""
    url = f"{os.environ.get('NEXT_PUBLIC_SUPABASE_URL')}/rest/v1/rpc/exec"
    headers = get_headers()
    
    payload = {"sql": sql}
    
    if HAS_HTTPX:
        import asyncio
        async def make_request():
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers)
                return response.json()
        return asyncio.run(make_request())
    else:
        import json as json_module
        data = json_module.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers=headers, method='POST')
        try:
            with urllib.request.urlopen(req) as response:
                return json_module.loads(response.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            print(f"Error: {e.read().decode('utf-8')}", file=sys.stderr)
            return None

def main():
    """Initialize the database."""
    print("[v0] Starting database initialization...")
    
    sql = """
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
    
    ALTER TABLE IF EXISTS staff_profiles ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Enable read access for all users" ON staff_profiles;
    CREATE POLICY "Enable read access for all users" 
      ON staff_profiles 
      FOR SELECT 
      USING (true);
    
    DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON staff_profiles;
    CREATE POLICY "Enable insert for authenticated users only"
      ON staff_profiles
      FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
    
    DROP POLICY IF EXISTS "Enable update for authenticated users only" ON staff_profiles;
    CREATE POLICY "Enable update for authenticated users only"
      ON staff_profiles
      FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
    
    DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON staff_profiles;
    CREATE POLICY "Enable delete for authenticated users only"
      ON staff_profiles
      FOR DELETE
      USING (auth.role() = 'authenticated');
    """
    
    result = run_sql(sql)
    if result:
        print("[v0] Database initialized successfully")
    else:
        print("[v0] Database initialization failed", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
