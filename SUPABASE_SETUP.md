# SkillBridge Supabase Setup Guide

This guide will help you set up Supabase for your SkillBridge application.

## Prerequisites

- A free Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm/yarn installed
- SkillBridge project cloned and running locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Project Name**: `skillbridge` or any name you prefer
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. In your SkillBridge project root, create a `.env.local` file:

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
- All necessary tables (profiles, skill_requests, proposals, etc.)
- Row Level Security policies
- Database triggers for automatic profile creation
- Indexes for better performance

## Step 5: Verify Setup

1. Restart your development server:

```bash
npm run dev
# or
yarn dev
```

2. Go to `http://localhost:3000/auth`
3. Try creating a new account
4. If successful, you should be redirected to the dashboard

## Step 6: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see tables: `profiles`, `skill_requests`, `proposals`, `messages`, `reviews`
3. After creating a test account, check the `profiles` table - you should see your user profile

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

### Environment variables not working
- Ensure `.env.local` is in your project root (same level as `package.json`)
- Environment variable names must start with `NEXT_PUBLIC_` for client-side access
- Restart your development server after any changes to `.env.local`

## Security Notes

- Never commit `.env.local` to version control
- The `anon` key is safe to use in client-side code
- Row Level Security policies protect your data
- Users can only access their own data and public information

## Next Steps

Once Supabase is set up, you can:
- Create user accounts and profiles
- Post skill requests
- Browse instructors
- Set up messaging between users
- Implement the full SkillBridge functionality

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [SkillBridge GitHub Issues](https://github.com/your-username/skillbridge/issues)

---

**Happy coding! 🚀** 