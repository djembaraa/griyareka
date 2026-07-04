export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">1. Pendahuluan</h2>
          <p className="text-slate-600 mb-4">
            GriyaReka ("kami", "milik kami", atau "kita") berkomitmen untuk melindungi privasi Anda. 
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga 
            informasi Anda saat Anda mengunjungi situs web kami.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">2. Pengumpulan Data</h2>
          <p className="text-slate-600 mb-4">
            Kami mungkin mengumpulkan informasi tentang Anda dengan berbagai cara. Informasi yang kami kumpulkan di Situs Web mencakup:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
            <li>Data Pribadi (Nama, alamat email, nomor telepon)</li>
            <li>Data Penggunaan (Alamat IP, tipe browser, halaman yang dikunjungi)</li>
            <li>Data Transaksi (Detail pesanan dan konsultasi)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">3. Penggunaan Informasi Anda</h2>
          <p className="text-slate-600 mb-4">
            Kami menggunakan informasi yang dikumpulkan dari Anda untuk:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
            <li>Menyediakan, mengoperasikan, dan memelihara situs web kami</li>
            <li>Meningkatkan, mempersonalisasi, dan memperluas situs web kami</li>
            <li>Memahami dan menganalisis bagaimana Anda menggunakan situs web kami</li>
            <li>Berkomunikasi dengan Anda, baik secara langsung maupun melalui mitra kami</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">4. Hubungi Kami</h2>
          <p className="text-slate-600 mb-4">
            Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini, silakan hubungi kami di:
          </p>
          <p className="text-slate-600 font-medium">
            Email: hello@griyareka.id<br />
            Telepon: +62 811 2345 6789
          </p>
        </div>
      </div>
    </div>
  );
}
