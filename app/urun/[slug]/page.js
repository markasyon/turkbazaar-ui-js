'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const urunler = [
  {
    slug: 'urun1',
    ad: 'Demo Ürün 1',
    aciklama: 'Bu demo ürün 1\'in açıklamasıdır.',
    fiyat: '250₺',
    resim: '/urun1.jpg',
  },
  {
    slug: 'urun2',
    ad: 'Demo Ürün 2',
    aciklama: 'Bu demo ürün 2\'nin açıklamasıdır.',
    fiyat: '399₺',
    resim: '/urun2.jpg',
  }
];

export default function UrunDetay() {
  const { slug } = useParams();
  const urun = urunler.find((u) => u.slug === slug);

  if (!urun) {
    return <div className="text-center text-red-600 mt-20">Ürün bulunamadı.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow-md">
        <Image
          src={urun.resim}
          alt={urun.ad}
          width={500}
          height={400}
          className="rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{urun.ad}</h1>
        <p className="text-gray-700 mb-4">{urun.aciklama}</p>
        <p className="text-lg font-semibold mb-4 text-green-600">{urun.fiyat}</p>
        <Link href="/" className="text-blue-600 hover:underline">← Ana Sayfa</Link>
      </div>
    </div>
  );
}