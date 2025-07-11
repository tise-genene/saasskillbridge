# Eagle Tutorials Services Supabase Setup Guide

This guide will help you set up Supabase for your Eagle Tutorials Services application.

## Prerequisites

- A free Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm/yarn installed
- Eagle Tutorials project cloned and running locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Project Name**: `eagle-tutorials` or any name you prefer
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users (preferably Europe for Ethiopia)
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. In your Eagle Tutorials project root, create a `.env.local` file:

```bash
# Create the file
touch .env.local
```

2. Add your Supabase credentials to `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Replace the values with your actual credentials from Step 2.

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema

This will create:
- All necessary tables (profiles, tutor_requests, proposals, sessions, etc.)
- Ethiopian education subjects (Mathematics, English, Amharic, Physics, etc.)
- Row Level Security policies
- Database triggers for automatic profile creation and rating updates
- Indexes for better performance

## Step 5: Verify Setup

1. Restart your development server:

```bash
npm run dev
# or
yarn dev
```

2. Go to `http://localhost:3000/auth`
3. Try creating a new account as a parent or tutor
4. If successful, you should be redirected to the dashboard

## Step 6: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see tables: `profiles`, `children`, `subjects`, `tutor_requests`, `proposals`, `sessions`, `messages`, `reviews`, `notifications`
3. Check the `subjects` table - it should contain Ethiopian curriculum subjects
4. After creating a test account, check the `profiles` table - you should see your user profile

## Ethiopian Curriculum Integration

The database comes pre-loaded with subjects from the Ethiopian education system:

### Primary Subjects (Grades 1-12)
- Mathematics
- English 
- Amharic

### Secondary Subjects (Grades 7-12)
- History
- Geography  
- Civics

### Science Subjects (Grades 9-12)
- Physics
- Chemistry
- Biology

### Technology (Grades 9-12)
- Computer Science

## Location Setup for Addis Ababa

The system supports Addis Ababa's administrative structure:

### Sub-cities Include:
- Addis Ketema
- Akaky Kaliti
- Arada
- Bole
- Gullele
- Kirkos
- Kolfe Keranio
- Lideta
- Nifas Silk-Lafto
- Yeka

Each profile and tutor request can specify:
- `location_subcity`: The sub-city (e.g., "Bole")
- `location_kebele`: The kebele within the sub-city
- `location_details`: Specific address or landmarks

## User Types

Eagle Tutorials supports three user types:

1. **Parent**: Creates tutor requests for their children
2. **Student**: Can also create requests (for older students)
3. **Tutor**: Provides tutoring services and responds to requests

## Troubleshooting

### Error: "Failed to fetch"
- Check that your environment variables are correct
- Ensure you've restarted your development server after creating `.env.local`
- Verify your Supabase project is active (not paused)

### Error: "Error fetching profile"
- Run the database schema from `supabase-schema.sql`
- Check that the `profiles` table exists
- Verify Row Level Security policies are set up

### Profile not created after signup
- Ensure the `handle_new_user()` trigger function is installed
- Check the `auth.users` table in Supabase - your user should be there
- The trigger should automatically create a profile when a user signs up

### Subjects not appearing
- Check that the subjects were inserted correctly
- Run this query in SQL Editor: `SELECT * FROM subjects;`
- If empty, re-run the INSERT statements from the schema

### Environment variables not working
- Ensure `.env.local` is in your project root (same level as `package.json`)
- Environment variable names must start with `NEXT_PUBLIC_` for client-side access
- Restart your development server after any changes to `.env.local`

## Security Notes

- Never commit `.env.local` to version control
- The `anon` key is safe to use in client-side code
- Row Level Security policies protect your data
- Users can only access their own data and public tutor information
- All tutors go through verification before being approved

## Next Steps

Once Supabase is set up, you can:
- Create parent accounts and add children
- Register as a tutor and complete verification
- Post tutor requests with specific subjects and locations
- Browse available tutors in your area
- Book and manage tutoring sessions
- Implement payment processing with Ethiopian mobile money

## Ethiopian Payment Integration

Future phases will include:
- **Telebirr** integration for mobile payments
- **CBE Birr** support
- **Commercial Bank of Ethiopia** integration
- Cash payment tracking

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Eagle Tutorials GitHub Issues](https://github.com/your-username/eagle-tutorials/issues)

---

**Happy tutoring! 🦅📚** Made with ❤️ for Ethiopian education. 