# GriyaReka Web Application

GriyaReka is a professional Home Developer Company Profile web application equipped with an integrated Content Management System (CMS) for managing properties and blog posts. 

> [!WARNING]
> **Academic Laboratory Purpose**: This project was developed as an academic laboratory environment for testing Cross-Site Scripting (XSS) vulnerabilities and mitigations. Specifically, the Blog feature utilizes `isomorphic-dompurify` to sanitize HTML inputs and defend against malicious script injection.

## Project Overview
This application is built with modern, cutting-edge web technologies to ensure optimal performance, security, and an excellent user experience.

**Core Tech Stack:**
- **Frontend**: Next.js 16 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v3, Shadcn UI, Framer Motion (for premium UI animations)
- **Backend / Database**: Supabase (PostgreSQL, Supabase Auth)
- **Icons**: Lucide React

## Local Setup

### 1. Prerequisites
- Node.js (v18.17 or higher)
- npm or yarn or pnpm
- A live Supabase project

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd griyareka-web
npm install
```

### 3. Running the Development Server
**CRITICAL**: You must set up your Supabase database before running the local development server, or the application will throw errors due to missing data connections. Please refer to the complete, step-by-step instructions in the [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) file.

Additionally, to configure other third-party services:
- **Resend (Email Automations)**: See [RESEND_SETUP.md](./RESEND_SETUP.md)
- **Groq AI (Chatbot)**: See [GROQ_SETUP.md](./GROQ_SETUP.md)

Once `.env.local` is fully configured:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Usage Guide

### Public Navigation
- **Home (`/`)**: Main landing page showcasing premium design, services, and testimonials.
- **Properties (`/properties`)**: Property catalog displaying available homes. Click "View Details" for specific property views.
- **Blog (`/blog`)**: Company news and architecture tips. Click a card to read the full HTML-sanitized article.
- **About (`/about`) & Services (`/services`)**: Static company information pages.

### Admin CMS Navigation
- Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)** or `/admin/login`.
- Log in using the credentials you created in the Supabase Dashboard.
- **Dashboard**: High-level overview of the CMS.
- **Properties**: Create, edit, and delete properties showcased in the public catalog.
- **Posts**: Create, edit, and delete HTML blog posts. All rich text input is sanitized on the server before rendering.
- **Testimonials**: Manage user-submitted reviews and view collected lead generation data.

## Vercel Deployment

Deploying the Next.js application to Vercel is highly recommended.

### 1. Prepare for Deployment
1. Ensure your code is committed to a Git repository (GitHub, GitLab, or Bitbucket).
2. Create a dedicated branch for deployment using a hyphen naming convention. For example:
   ```bash
   git checkout -b deployment-griyareka
   git push -u origin deployment-griyareka
   ```

### 2. Deploy via Vercel Dashboard
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your Git repository.
4. Select the `deployment-griyareka` branch (or `main`/`master` if you prefer).

### 3. Configure Environment Variables
Before clicking "Deploy", you must configure the environment variables so Vercel can connect to your Supabase project and other services:
1. In the "Environment Variables" section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (for admin bypass)
   - `GROQ_API_KEY`: Your Groq API Key
   - `RESEND_API_KEY`: Your Resend API Key

### 4. Deploy
Click **Deploy**. Vercel will automatically build and deploy your application. Once finished, you will be provided with a live URL!

## License and Copyright
Copyright (c) 2026 Djembar Arafat. All rights reserved.
This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.
