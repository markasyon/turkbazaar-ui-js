'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function UrunKarti({ baslik, resim }) {
  // Slug üretimi
  const slug = baslik.toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <Link href={`/urun/${slug}`}>
      <div className="bg-white p-3 rounded shadow hover:shadow-lg transition cursor-pointer text-center">
        <Image
          src={resim}
          alt={baslik}
          width={200}
          height={150}
          className="rounded mx-auto mb-2"
        />
        <h3 className="text-md font-semibold text-gray-800">{baslik}</h3>
        <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
          Fiyat Teklifi Al
        </button>
      </div>
    </Link>
  );
}