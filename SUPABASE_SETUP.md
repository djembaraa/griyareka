# Supabase Setup Guide

This project requires a Supabase PostgreSQL database to function properly as the backend and BaaS (Backend-as-a-Service). Follow these instructions carefully to set up your Supabase project.

## 1. Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and create an account or sign in.
2. Click **"New Project"**.
3. Choose your organization, assign a project name (e.g., `GriyaReka`), and set a secure database password.
4. Select a region close to your users and click **"Create new project"**.

## 2. Set Up Environment Variables
Once your project is created and provisioned:
1. Navigate to **Project Settings** (the gear icon on the left sidebar) -> **API**.
2. Locate your **Project URL** and **anon public API key**.
3. In the root of your `griyareka-web` project directory, create a file named `.env.local` (or edit if it exists).
4. Add the following lines, replacing the placeholder values with your actual URL and Anon Key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsIn...
```

## 3. Apply the Database Schema
1. In your Supabase Dashboard, navigate to the **SQL Editor** (the terminal icon on the left sidebar).
2. Click **"New query"**.
3. Copy and paste the entire SQL schema below into the editor.
4. Click **"Run"** in the bottom right corner. This will create the `profiles`, `posts`, and `properties` tables, and apply the necessary Row Level Security (RLS) policies.

```sql
-- Supabase Schema for GriyaReka

-- Users table (Supabase Auth handles the primary users table in auth.users)
-- This is an optional public profile table linked to auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);


-- Posts table for the Blog CMS
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL, -- Stored HTML content
  author_id UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone." ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Only authenticated users can update their posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Only authenticated users can delete their posts" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- Properties table for Property Catalog
CREATE TABLE public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone." ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert properties" ON public.properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update properties" ON public.properties
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete properties" ON public.properties
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials table for Moderated Testimonials System
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are viewable by everyone." ON public.testimonials
  FOR SELECT USING (is_published = true);
  
CREATE POLICY "Admin can view all testimonials." ON public.testimonials
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit a testimonial." ON public.testimonials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can update testimonials." ON public.testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete testimonials." ON public.testimonials
  FOR DELETE USING (auth.role() = 'authenticated');
```

## 4. Create the First Admin User
To access the Admin CMS in the application, you need to create a user account.
1. In the Supabase Dashboard, navigate to **Authentication** (the people icon) -> **Users**.
2. Click **"Add User"** and select **"Create new user"**.
3. Enter an email address (e.g., `admin@griyareka.id`) and a strong password.
4. Uncheck "Auto Confirm User" if you prefer, or leave it checked. Click **"Create user"**.
5. *Optional*: If you didn't auto-confirm, ensure the user's email is confirmed so they can log in.
6. (Required for Posts) You also need to create a profile entry for this user manually to publish articles:
   - Navigate to **Table Editor** -> `profiles`.
   - Click **"Insert row"**.
   - Copy the User ID (UUID) from the Authentication page and paste it into the `id` field.
   - Fill in a `display_name` (e.g., "Admin GriyaReka") and click **"Save"**.

You can now log into the `/admin/login` page on your local GriyaReka Next.js app using this email and password!
