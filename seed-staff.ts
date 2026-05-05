import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const staffData = [
  // Senior Members - Academic Staff
  {
    name: 'Professor Dzodzi Tsikata',
    role: 'Professor',
    specialty: 'African Legal Studies & Gender Justice',
    email: 'dtsikata@ug.edu.gh',
    photo_url: '/images/professor-dzodzi-tsikata.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Emerita Takyiwaa Manuh',
    role: 'Professor Emerita',
    specialty: 'African Development & Diaspora Studies',
    email: 'tmanuh@ug.edu.gh',
    photo_url: '/images/professor-takyiwaa-manuh.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Akosua Adomako Ampofo',
    role: 'Professor',
    specialty: 'Gender Studies & Social Transformation',
    email: 'aadomako@ug.edu.gh',
    photo_url: '/images/professor-adomako.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Esi Sutherland-Addy',
    role: 'Professor',
    specialty: 'African Literature & Linguistics',
    email: 'esutherland@ug.edu.gh',
    photo_url: '/images/professor-esi-sutherland.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Albert Awedoba',
    role: 'Professor',
    specialty: 'African Anthropology & Religion',
    email: 'aawedoba@ug.edu.gh',
    photo_url: '/images/professor-albert-awedoba.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Daniel Avorgbedor',
    role: 'Professor',
    specialty: 'Ethnomusicology & Cultural Studies',
    email: 'davorgbedor@ug.edu.gh',
    photo_url: '/images/staff/senior-member-6.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Kojo Amanor',
    role: 'Professor',
    specialty: 'African Environmental Studies',
    email: 'kamanor@ug.edu.gh',
    photo_url: '/images/staff/senior-member-7.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Richard Asante',
    role: 'Professor',
    specialty: 'African History & Governance',
    email: 'rasante@ug.edu.gh',
    photo_url: '/images/professor-asante.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Ɔbenfo (Professor) Ọbádélé Bakari Kambon',
    role: 'Professor',
    specialty: 'African Philosophy & Consciousness',
    email: 'okambon@ug.edu.gh',
    photo_url: '/images/staff/senior-member-9.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Genevieve Nrenzah',
    role: 'Senior Research Fellow',
    specialty: 'African Medical Anthropology',
    email: 'gnrenzah@ug.edu.gh',
    photo_url: '/images/staff/senior-member-10.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Chika C. Mba',
    role: 'Senior Lecturer',
    specialty: 'African Economic Development',
    email: 'cmba@ug.edu.gh',
    photo_url: '/images/staff/senior-member-11.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Kojo Opoku Aidoo',
    role: 'Senior Lecturer',
    specialty: 'African Political Science',
    email: 'kaidoo@ug.edu.gh',
    photo_url: '/images/staff/senior-member-12.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor. (Mrs) Mercy Akrofi Ansah',
    role: 'Professor',
    specialty: 'African Music & Cultural Heritage',
    email: 'mankrofi@ug.edu.gh',
    photo_url: '/images/staff/senior-member-13.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Peter Narh',
    role: 'Senior Lecturer',
    specialty: 'African Urban Geography',
    email: 'pnarh@ug.edu.gh',
    photo_url: '/images/staff/senior-member-14.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Pius Siakwah',
    role: 'Senior Lecturer',
    specialty: 'African Social Development',
    email: 'psiakwah@ug.edu.gh',
    photo_url: '/images/staff/senior-member-15.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Kwame Amoah Labi',
    role: 'Professor',
    specialty: 'African Literature & Cultural Studies',
    email: 'klabi@ug.edu.gh',
    photo_url: '/images/staff/senior-member-16.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor Michael Kpessa-Whyte',
    role: 'Professor',
    specialty: 'African Religious Studies & Philosophy',
    email: 'mkpessa@ug.edu.gh',
    photo_url: '/images/staff/senior-member-17.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'George Gyasi Gyesaw',
    role: 'Archivist',
    specialty: 'J H Kwabena Nketia Archives',
    email: 'ggyesaw@ug.edu.gh',
    photo_url: '/images/staff/senior-member-6.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Mjiba Frehiwot',
    role: 'Senior Lecturer',
    specialty: 'African Peace & Conflict Studies',
    email: 'mfrehiwot@ug.edu.gh',
    photo_url: '/images/staff/senior-member-18.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Hasiyatu Abubakari',
    role: 'Senior Lecturer',
    specialty: 'African Islamic Studies',
    email: 'habubakari@ug.edu.gh',
    photo_url: '/images/staff/senior-member-19.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Benjamin Kobina Kwansa',
    role: 'Senior Lecturer',
    specialty: 'African Heritage Management',
    email: 'bkwansa@ug.edu.gh',
    photo_url: '/images/staff/senior-member-20.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Aristedes Narh Hargoe',
    role: 'Lecturer',
    specialty: 'African Environmental Conservation',
    email: 'ahargoe@ug.edu.gh',
    photo_url: '/images/staff/senior-member-21.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Eric Tamatey Lawer',
    role: 'Lecturer',
    specialty: 'African Archaeology',
    email: 'elawer@ug.edu.gh',
    photo_url: '/images/staff/senior-member-22.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Edwin Asa Adjei',
    role: 'Senior Lecturer',
    specialty: 'African Linguistics',
    email: 'eadjei@ug.edu.gh',
    photo_url: '/images/staff/senior-member-23.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Ahmed Badawi Mustapha',
    role: 'Senior Lecturer',
    specialty: 'African Islamic History',
    email: 'amustapha@ug.edu.gh',
    photo_url: '/images/staff/senior-member-24.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'N. Laryea Akwetteh',
    role: 'Senior Research Fellow',
    specialty: 'African Cultural Heritage',
    email: 'lakwetteh@ug.edu.gh',
    photo_url: '/images/staff/senior-member-25.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Mrs. Yvonne Lartey',
    role: 'Senior Lecturer',
    specialty: 'African Food Culture & Nutrition',
    email: 'ylartey@ug.edu.gh',
    photo_url: '/images/staff/senior-member-26.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Obodai Torto',
    role: 'Senior Lecturer',
    specialty: 'African Indigenous Knowledge',
    email: 'otorto@ug.edu.gh',
    photo_url: '/images/staff/senior-member-27.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Osman Abdul-Rahman Alhassan',
    role: 'Senior Lecturer',
    specialty: 'African Islamic Civilization',
    email: 'oalhassan@ug.edu.gh',
    photo_url: '/images/staff/senior-member-28.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Professor. Samuel Ntewusu',
    role: 'Professor',
    specialty: 'African History & Politics',
    email: 'sntewusu@ug.edu.gh',
    photo_url: '/images/staff/senior-member-29.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Dr. Benjamin O. Ayeetey',
    role: 'Senior Lecturer',
    specialty: 'African Social Anthropology',
    email: 'bayeetey@ug.edu.gh',
    photo_url: '/images/staff/senior-member-30.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Ms. Vivian Appiah',
    role: 'Senior Research Fellow',
    specialty: 'African Gender & Development',
    email: 'vappiah@ug.edu.gh',
    photo_url: '/images/staff/senior-member-31.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Prof. Irene Appeaning Addo',
    role: 'Professor',
    specialty: 'African Maritime Heritage',
    email: 'iaddo@ug.edu.gh',
    photo_url: '/images/staff/senior-member-1.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Prof. Edem Adotey',
    role: 'Professor',
    specialty: 'African Arts & Aesthetics',
    email: 'eadotey@ug.edu.gh',
    photo_url: '/images/staff/senior-member-2.jpg',
    department: 'Institute of African Studies',
  },
  {
    name: 'Prof. Deborah Atobrah',
    role: 'Professor',
    specialty: 'African Women & Development',
    email: 'datobrah@ug.edu.gh',
    photo_url: '/images/staff/senior-member-3.jpg',
    department: 'Institute of African Studies',
  },
];

async function seedDatabase() {
  try {
    console.log('[v0] Starting database seed...');

    const { error } = await supabase.from('staff_profiles').insert(staffData);

    if (error) {
      console.error('[v0] Seed error:', error);
      process.exit(1);
    }

    console.log(`[v0] Successfully seeded ${staffData.length} staff members`);
  } catch (error) {
    console.error('[v0] Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();
