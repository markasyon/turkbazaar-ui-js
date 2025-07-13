'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Ürün verileri
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
  const [formGoster, setFormGoster] = useState(false);
  const [form, setForm] = useState({ ad: '', email: '', telefon: '', adet: '', mesaj: '' });

  if (!urun) {
    return <div className="p-6 text-red-600">Ürün bulunamadı.</div>;
  }

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
            <div className="flex items-center gap-3 mb-3">
              {urun.firma.logo && (
                <Image src={urun.firma.logo} alt="Firma Logosu" width={40} height={40} className="rounded-full" />
              )}
              <span className="text-sm text-gray-600">{urun.firma.ad}</span>
            </div>
          )}

          {/* Açıklama */}
          <p className="text-gray-700 mb-2">{urun.aciklama}</p>

          {/* Teknik Özellikler */}
          {urun.teknik && (
            <p className="text-gray-800 text-sm font-medium mb-4">
              <strong>Teknik Özellikler:</strong> {urun.teknik}
            </p>
          )}

          {/* Fiyat aralığı tablosu */}
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

          {/* Butonlar */}
          <div className="flex gap-3 flex-wrap mb-4">
            <button
              onClick={() => setFormGoster(!formGoster)}
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

            <button
              onClick={() => alert('Örnek isteğiniz alındı! Satıcı sizinle iletişime geçecek.')}
              className="bg-gray-100 text-gray-700 border px-4 py-2 rounded hover:bg-gray-200"
            >
              Örnek İste
            </button>
          </div>

          {/* Teklif Ver Formu */}
          {formGoster && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Teklif formu gönderildi!');
                setFormGoster(false);
                setForm({ ad: '', email: '', telefon: '', adet: '', mesaj: '' });
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Adınız"
                value={form.ad}
                onChange={(e) => setForm({ ...form, ad: e.target.value })}
                className="border px-4 py-2 w-full rounded"
                required
              />
              <input
                type="email"
                placeholder="E-posta"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border px-4 py-2 w-full rounded"
                required
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={form.telefon}
                onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                className="border px-4 py-2 w-full rounded"
                required
              />
              <input
                type="number"
                placeholder="İstenen Adet"
                value={form.adet}
                onChange={(e) => setForm({ ...form, adet: e.target.value })}
                className="border px-4 py-2 w-full rounded"
              />
              <textarea
                placeholder="Ek Mesajınız"
                value={form.mesaj}
                onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                className="border px-4 py-2 w-full rounded"
              />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
