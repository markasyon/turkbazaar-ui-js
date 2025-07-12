'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

const urunler = [
  {
    slug: 'organik-zeytinyagi',
    baslik: 'Organik Zeytinyağı',
    resim: '/urun1.jpg',
    fiyat: '150₺',
    aciklama: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.',
  },
  {
    slug: 'el-dokumasi-hali',
    baslik: 'El Dokuması Halı',
    resim: '/urun2.jpg',
    fiyat: '3.200₺',
    aciklama: 'Tamamen el dokuması, doğal yün ve kök boya kullanılarak üretilmiştir.',
  },
  {
    slug: 'ahsap-oyuncak-seti',
    baslik: 'Ahşap Oyuncak Seti',
    resim: '/urun3.jpg',
    fiyat: '450₺',
    aciklama: 'Sağlığa uygun boyalarla boyanmış el yapımı ahşap oyuncak seti.',
  }
];

export default function UrunDetay() {
  const { slug } = useParams();
  const urun = urunler.find((u) => u.slug === slug);

  if (!urun) {
    return <div className="p-6 text-red-600">Ürün bulunamadı.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">{urun.baslik}</h1>

      <div className="w-full max-w-md mx-auto">
        <Image
          src={urun.resim}
          alt={urun.baslik}
          width={400}
          height={300}
          className="w-full h-auto object-contain rounded shadow mb-6"
        />
      </div>

      <p className="text-base sm:text-lg text-gray-700 mb-4">{urun.aciklama}</p>
      <p className="text-lg sm:text-xl font-bold text-green-700 mb-6">{urun.fiyat}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          Teklif Ver
        </button>
        <button className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-gray-100">
          Müzakere Et
        </button>
      </div>
    </div>
  );
}
