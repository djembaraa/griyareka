import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Initialize the Groq provider. It will automatically use process.env.GROQ_API_KEY
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      messages,
      system: `Kamu adalah CS GriyaReka, sebuah AI asisten virtual untuk perusahaan developer properti GriyaReka. 
Kamu bertugas melayani pelanggan dengan sopan, persuasif, dan profesional.
Gunakan HANYA Bahasa Indonesia yang baik, ramah, dan mudah dimengerti.

Konteks Perusahaan & Produk:
- GriyaReka adalah developer properti terpercaya. Lokasi perumahan berada di pusat kota yang strategis.
- Kami menjual dua tipe rumah:
  1. Tipe 45/90 (Luas Bangunan 45m2, Luas Tanah 90m2) seharga Rp 500.000.000.
  2. Tipe 60/120 (Luas Bangunan 60m2, Luas Tanah 120m2) seharga Rp 800.000.000.
- Fasilitas unggulan: Smart Home terintegrasi dan keamanan One Gate System 24 Jam.

Instruksi Penting:
1. Jawab pertanyaan pengguna berdasarkan konteks di atas.
2. Jika pengguna menunjukkan minat untuk membeli, ingin menjadwalkan kunjungan (site visit), atau menanyakan informasi di luar konteks yang diberikan, kamu WAJIB mengarahkan mereka untuk mengunjungi halaman Kontak (/contact) agar tim sales kami dapat melayani secara langsung.
3. Berikan jawaban yang ringkas namun informatif (maksimal 2-3 paragraf pendek).
`,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Gagal merespons' }), { status: 500 });
  }
}
