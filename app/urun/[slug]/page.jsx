'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

const urunler = {
  'organik-zeytinyagi': {
    baslik: 'Organik Zeytinyağı',
    resim: '/urun1.jpg',
    fiyat: '150₺',
    aciklama: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.',
  },
  'el-dokumasi-hali': {
    baslik: 'El Dokuması Halı',
    resim: '/urun2.jpg',
    fiyat: '3.200₺',
    aciklama: 'Tamamen el dokuması, doğal yün ve kök boya kullanılarak üretilmiştir.',
  },
  'ahsap-oyuncak-seti': {
    baslik: 'Ahşap Oyuncak Seti',
    resim: '/urun3.jpg',
    fiyat: '450₺',
    aciklama: 'Sağlığa uygun boyalarla boyanmış el yapımı ahşap oyuncak seti.',
  },
};

export default function UrunDetay() {
  const { slug } = useParams();
  const urun = urunler[slug];

  if (!urun) {
    return <div className="p-6">Ürün bulunamadı.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{urun.baslik}</h1>
      <Image
        src={urun.resim}
        alt={urun.baslik}
        width={500}
        height={300}
        className="rounded shadow mb-4"
      />
      <p className="text-xl font-semibold text-green-700 mb-2">{urun.fiyat}</p>
      <p className="text-gray-700">{urun.aciklama}</p>
    </div>
  );
}