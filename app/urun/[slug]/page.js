'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

const urunler = [
  {
    slug: 'organik-zeytinyagi',
    baslik: 'Organik Zeytinyağı',
    resim: '/urun1.jpg',
    aciklama: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.',
    fiyatAraligi: [
      { adet: '1-99', fiyat: '180₺' },
      { adet: '100-499', fiyat: '160₺' },
      { adet: '500+', fiyat: '150₺' },
    ],
    teknikDetaylar: [
      { label: 'Menşei', value: 'Türkiye' },
      { label: 'Ambalaj', value: 'Cam Şişe 1L' },
      { label: 'Saklama', value: 'Serin ve kuru yerde' },
    ],
    firma: {
      ad: 'Lider Süt ve Süt Ürünleri',
      logo: '/logo.png',
      konum: 'Adıyaman / Türkiye',
    }
  },
  // Diğer ürünler burada devam eder...
];

export default function UrunDetay() {
  const { slug } = useParams();
  const urun = urunler.find((u) => u.slug === slug);

  if (!urun) {
    return <div className="p-6 text-red-600">Ürün bulunamadı.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* ÜRÜN ÜST ALAN */}
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={urun.resim}
          alt={urun.baslik}
          width={500}
          height={400}
          className="rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{urun.baslik}</h1>
          <p className="text-gray-700 mb-4">{urun.aciklama}</p>

          {/* FİYAT TABLOSU */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Adet Bazlı Fiyatlandırma</h2>
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Adet</th>
                  <th className="p-2 border">Birim Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {urun.fiyatAraligi.map((f, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-2 border">{f.adet}</td>
                    <td className="p-2 border text-green-700 font-semibold">{f.fiyat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BUTONLAR */}
          <div className="flex gap-4 mb-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              Teklif Ver
            </button>
            <button className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-gray-100">
              Müzakere Et
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
              Örnek Talep Et
            </button>
          </div>

          {/* FİRMA BİLGİLERİ */}
          <div className="flex items-center gap-4 mt-6">
            <Image src={urun.firma.logo} alt="Firma Logosu" width={50} height={50} className="rounded" />
            <div>
              <p className="font-semibold">{urun.firma.ad}</p>
              <p className="text-sm text-gray-600">{urun.firma.konum}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TEKNİK DETAYLAR */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Teknik Detaylar</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {urun.teknikDetaylar.map((detay, i) => (
            <li key={i} className="bg-gray-50 p-3 border rounded">
              <span className="font-medium">{detay.label}: </span>
              {detay.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
