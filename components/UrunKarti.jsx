import Image from 'next/image';

export default function UrunKarti({ baslik, resim, fiyat }) {
  return (
    <div className="border p-4 rounded shadow">
      <Image src={resim} alt={baslik} width={300} height={200} className="mb-2" />
      <h3 className="font-semibold text-lg">{baslik}</h3>
      <p className="text-green-700 font-bold">{fiyat}</p>
    </div>
  );
}
