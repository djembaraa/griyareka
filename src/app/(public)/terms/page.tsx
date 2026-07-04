export default function TermsOfServicePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">1. Penerimaan Syarat</h2>
          <p className="text-slate-600 mb-4">
            Dengan mengakses dan menggunakan situs web GriyaReka, Anda menyetujui untuk terikat oleh 
            Ketentuan Layanan ini, serta semua hukum dan peraturan yang berlaku. Jika Anda tidak 
            menyetujui syarat apa pun, Anda dilarang menggunakan situs web ini.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">2. Layanan Kami</h2>
          <p className="text-slate-600 mb-4">
            GriyaReka menyediakan layanan konsultasi desain arsitektur, pembangunan rumah, dan integrasi 
            smart home. Segala informasi yang ditampilkan di situs web ini, termasuk namun tidak terbatas 
            pada spesifikasi properti, desain, dan harga, bersifat informatif dan dapat berubah sewaktu-waktu 
            tanpa pemberitahuan sebelumnya.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">3. Kekayaan Intelektual</h2>
          <p className="text-slate-600 mb-4">
            Situs web ini beserta semua materi yang ada di dalamnya, termasuk namun tidak terbatas pada gambar, 
            teks, logo, dan desain arsitektur, adalah milik GriyaReka atau dilisensikan kepada kami dan dilindungi 
            oleh undang-undang hak cipta dan kekayaan intelektual lainnya. Anda tidak diperkenankan untuk 
            mereproduksi, mendistribusikan, atau menggunakan materi tersebut untuk tujuan komersial tanpa izin 
            tertulis dari kami.
          </p>
          
          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">4. Batasan Tanggung Jawab</h2>
          <p className="text-slate-600 mb-4">
            Dalam keadaan apa pun, GriyaReka tidak akan bertanggung jawab atas kerusakan apa pun 
            (termasuk, tanpa batasan, kerugian atas hilangnya data atau keuntungan) yang timbul dari 
            penggunaan atau ketidakmampuan untuk menggunakan materi di situs web kami, bahkan jika 
            pihak GriyaReka telah diberitahu secara lisan atau tertulis tentang kemungkinan kerusakan tersebut.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">5. Perubahan Ketentuan</h2>
          <p className="text-slate-600 mb-4">
            Kami dapat merevisi Ketentuan Layanan ini sewaktu-waktu tanpa pemberitahuan. Dengan menggunakan 
            situs web ini, Anda menyetujui untuk terikat oleh versi terbaru dari Ketentuan Layanan ini.
          </p>
        </div>
      </div>
    </div>
  );
}
