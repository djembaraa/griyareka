# Groq API Setup Guide (AI Chatbot)

This application is equipped with an interactive AI Chatbot feature powered by Llama 3 via Groq. This feature is designed to intelligently and rapidly answer customer inquiries in real-time.

To run this feature locally and in production, you need a valid Groq API key.

## Configuration Steps

1. **Create an Account**: Register and log in to the [Groq Cloud Console](https://console.groq.com).
2. **Generate API Key**: Navigate to the **API Keys** section and generate a new API Key for free.
3. **Configure Environment Variables**: Open the `.env.local` file in your local repository and insert the generated key:
   ```env
   GROQ_API_KEY=gsk_your_actual_key_here...
   ```
4. **Verify Functionality**: Once the API Key is inserted and the development server is restarted (`npm run dev`), the floating Chatbot Widget on the frontend will immediately become functional and stream responses.
