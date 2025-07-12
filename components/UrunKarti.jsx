'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function UrunKarti({ baslik, resim, fiyat }) {
  // Slug'ı oluştur (örneğin: "El Dokuması Halı" -> "el-dokumasi-hali")
  const slug = baslik.toLowerCase().replace(/ç/g, 'c')
    .replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o')
    .replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <Link href={`/urun/${slug}`}>
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
        <Image
          src={resim}
          alt={baslik}
          width={400}
          height={300}
          className="rounded mb-2"
        />
        <h3 className="text-lg font-semibold">{baslik}</h3>
        <p className="text-green-700 font-bold">{fiyat}</p>
      </div>
    </Link>
  );
}
