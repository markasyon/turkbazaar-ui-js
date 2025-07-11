'use client';

import Image from 'next/image';

interface UrunKartiProps {
  baslik: string;
  resim: string;
  fiyat: string;
}

export default function UrunKarti({ baslik, resim, fiyat }: UrunKartiProps) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <Image src={resim} alt={baslik} width={300} height={200} className="rounded" />
      <h3 className="text-lg font-semibold mt-2">{baslik}</h3>
      <p className="text-green-700 font-bold">{fiyat}</p>
    </div>
  );
}