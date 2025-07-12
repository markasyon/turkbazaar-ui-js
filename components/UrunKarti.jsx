'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function UrunKarti({ baslik, resim, fiyat }) {
  const slug = baslik.toLowerCase().replace(/ç/g, 'c')
    .replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o')
    .replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <Link href={`/urun/${slug}`}>
      <div className="bg-white p-3 rounded shadow hover:shadow-lg transition cursor-pointer text-center">
        <Image
          src={resim}
          alt={baslik}
          width={200}
          height={150}
          className="mx-auto object-contain rounded mb-2"
        />
        <h3 className="text-sm font-semibold text-gray-800">{baslik}</h3>
        <p className="text-green-700 font-bold text-sm">{fiyat}</p>
      </div>
    </Link>
  );
}
