'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Ürün listesi örneği
const urunler = [
  {
    slug: 'organik-zeytinyagi',
    baslik: 'Organik Zeytinyağı',
    resim: '/urun1.jpg',
    fiyatAralik: [
      { adet: '1-10', fiyat: '150₺' },
      { adet: '11-50', fiyat: '140₺' },
      { adet: '51+', fiyat: '125₺' }
    ],
    aciklama: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.',
    teknik: 'Soğuk sıkım, 1. kalite, cam şişe 1L',
    whatsapp: '905551112233',
    firma: {
      ad: 'Lider Süt ve Süt Ürünleri',
      logo: '/firma-logo.png'
    }
  },
];

export default function UrunDetay() {
  const { slug } = useParams();
  const urun = urunler.find((u) => u.slug === slug);

  const [modalAcik, setModalAcik] = useState(false);
  const [form, setForm] = useState({ isim: '', adet: '', mesaj: '' });

  if (!urun) {
    return <div className="p-6 text-red-600">Ürün bulunamadı.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGonder = () => {
    alert(`Teklif gönderildi:\nİsim: ${form.isim}\nAdet: ${form.adet}\nMesaj: ${form.mesaj}`);
    setModalAcik(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün görseli */}
        <div>
          <Image
            src={urun.resim}
            alt={urun.baslik}
            width={500}
            height={350}
            className="rounded shadow"
          />
        </div>

        {/* Ürün bilgileri */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{urun.baslik}</h1>

          {/* Firma bilgisi */}
          {urun.firma && (
            <div className="flex items-center gap-3 mb-4">
              {urun.firma.logo && (
                <Image src={urun.firma.logo} alt="Firma Logosu" width={40} height={40} className="rounded-full" />
              )}
              <span className="text-sm text-gray-600">{urun.firma.ad}</span>
            </div>
          )}

          {/* Fiyat tablosu */}
          <table className="w-full text-sm border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Adet</th>
                <th className="border px-2 py-1 text-left">Birim Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {urun.fiyatAralik.map((f, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{f.adet}</td>
                  <td className="border px-2 py-1 text-green-700 font-semibold">{f.fiyat}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Açıklama ve teknik detay */}
          <p className="text-gray-700 mb-2">{urun.aciklama}</p>
          <p className="text-gray-500 italic text-sm mb-4">{urun.teknik}</p>

          {/* Butonlar */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setModalAcik(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Teklif Ver
            </button>

            <a
              href={`https://wa.me/${urun.whatsapp}?text=Merhaba,%20${urun.baslik}%20için%20müzakere%20etmek%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-gray-100"
            >
              Müzakere Et
            </a>

            <button className="bg-gray-100 text-gray-700 border px-4 py-2 rounded hover:bg-gray-200">
              Örnek İste
            </button>
          </div>
        </div>
      </div>

      {/* TEKLİF MODALI */}
      {modalAcik && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-lg relative">
            <button onClick={() => setModalAcik(false)} className="absolute top-2 right-3 text-gray-500 hover:text-black">
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Teklif Ver</h2>

            <input
              type="text"
              name="isim"
              value={form.isim}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <input
              type="number"
              name="adet"
              value={form.adet}
              onChange={handleChange}
              placeholder="İstenilen Adet"
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <textarea
              name="mesaj"
              value={form.mesaj}
              onChange={handleChange}
              placeholder="Ek bilgi / talepler"
              className="w-full border px-3 py-2 mb-3 rounded"
              rows={3}
            ></textarea>

            <button
              onClick={handleGonder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
