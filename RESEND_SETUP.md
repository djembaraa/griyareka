# Resend Setup Guide (Email Automation)

To transform the Moderated Testimonials system into a powerful Lead Generation tool, you can integrate Resend to send automated emails (e.g., a "Thank you for subscribing" welcome email) when a user opts into your newsletter.

## Configuration Steps

1. **Create an Account**: Register at [Resend.com](https://resend.com) to obtain a free API Key.
2. **Install the SDK**: If not already installed, install the Resend Node.js SDK via your terminal:
   ```bash
   npm install resend
   ```
3. **Configure Environment Variables**: Open the `.env.local` file in your local environment (and later in your Vercel deployment settings) and add your API Key:
   ```env
   RESEND_API_KEY=re_123456789...
   ```
4. **Implement the Logic**: Open the Server Action file for testimonials (`src/app/actions/testimonials.ts`). Locate the placeholder comment block (`// TODO: Integrate Resend API here...`) and replace it with a standard Resend API call:

   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);

   // Inside your submitTestimonial function:
   if (validatedData.is_subscribed && validatedData.email) {
     await resend.emails.send({
       from: 'onboarding@resend.dev', // Replace with your verified domain in production
       to: validatedData.email,
       subject: 'Thank You for Subscribing to GriyaReka!',
       html: '<p>Welcome to our newsletter. You will receive the latest updates soon.</p>'
     });
   }
   ```
