'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// SSS hâlâ statik olarak burada tanımlı
const ssSorular = [
  { soru: 'Kargo süresi ne kadar?', cevap: 'Siparişiniz 2 iş günü içinde kargoya verilir.' },
  { soru: 'İade koşulları nelerdir?', cevap: 'Ürün tesliminden sonra 14 gün içinde iade edebilirsiniz.' }
];

export default function UrunDetay() {
  const { slug } = useParams();

  // ➊ Dinamik veriler
  const [urun, setUrun] = useState(null);
  const [yorumList, setYorumList] = useState([]);
  const [benzerUrunler, setBenzerUrunler] = useState([]);

  // ➋ Mevcut statik state’ler
  const [teklifModal, setTeklifModal] = useState(false);
  const [ornekModal, setOrnekModal] = useState(false);
  const [favori, setFavori] = useState(false);

  // ➌ Teklif / örnek formları
  const [form, setForm] = useState({ isim: '', eposta: '', telefon: '', adet: '', mesaj: '' });
  const [ornekForm, setOrnekForm] = useState({ isim: '', adres: '', telefon: '', mesaj: '' });

  // ➍ Yorum formu state’i
  const [yorumForm, setYorumForm] = useState({ isim: '', text: '', rating: 0 });

  // ➎ Sayfa açılır açılmaz verileri çek
  useEffect(() => {
    async function load() {
      // ürün + benzer
      const res = await fetch(`/api/urun/${slug}`);
      const data = await res.json();
      setUrun(data.urun);
      setBenzerUrunler(data.similar);

      // yorumlar
      const cres = await fetch(`/api/urun/${slug}/comments`);
      setYorumList(await cres.json());
    }
    load();
  }, [slug]);

  if (!urun) return <div className="p-6 text-gray-500">Yükleniyor...</div>;

  // statik helper’lar
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleOrnekChange = e => setOrnekForm({ ...ornekForm, [e.target.name]: e.target.value });
  const handleGonder = () => { alert(`Teklif gönderildi:\n${JSON.stringify(form, null, 2)}`); setTeklifModal(false); };
  const handleOrnekGonder = () => { alert(`Örnek talebi gönderildi:\n${JSON.stringify(ornekForm, null, 2)}`); setOrnekModal(false); };

  // yorum handler’ları
  const handleYorumChange = e => setYorumForm({ ...yorumForm, [e.target.name]: e.target.value });
  const handlePuanSelect = n => setYorumForm(f => ({ ...f, rating: n }));
  const handleYorumSubmit = async () => {
    const res = await fetch(`/api/urun/${slug}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(yorumForm),
    });
    const yeni = await res.json();
    setYorumList(prev => [yeni, ...prev]);
    setYorumForm({ isim: '', text: '', rating: 0 });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Ürün görseli ve favori */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <Image src={urun.image} alt={urun.title} width={500} height={350} className="rounded shadow" />
          <button
            onClick={() => setFavori(!favori)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-105 transition"
            title="Favorilere Ekle"
          >
            {favori ? '❤️' : '🤍'}
          </button>
        </div>
        {/* Ürün bilgileri */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{urun.title}</h1>
          {urun.firma && (
            <div className="flex items-center gap-3 mb-2">
              {urun.firma.logo && (
                <Image src={urun.firma.logo} alt="Firma Logosu" width={40} height={40} className="rounded-full" />
              )}
              <span className="text-sm text-gray-600">{urun.firma.ad}</span>
            </div>
          )}
          <p className="text-gray-700 mb-2">{urun.description}</p>
          {urun.teknik && (
            <div className="text-sm text-gray-800 font-medium mb-3">
              <span className="font-semibold text-gray-600">Teknik Özellikler: </span>
              {urun.teknik}
            </div>
          )}
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
            <button onClick={() => setTeklifModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              Teklif Ver
            </button>
            <a
              href={`https://wa.me/${urun.whatsapp}?text=Merhaba,%20${urun.title}%20için%20müzakere%20etmek%20istiyorum.`}
              target="_blank" rel="noopener noreferrer"
              className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-gray-100"
            >
              Müzakere Et
            </a>
            <button onClick={() => setOrnekModal(true)} className="bg-gray-100 text-gray-700 border px-4 py-2 rounded hover:bg-gray-200">
              Örnek İste
            </button>
          </div>
        </div>
      </div>

      {/* Kargo & Garanti */}
      <div className="mt-6 bg-gray-50 p-4 rounded border">
        <h3 className="font-semibold mb-1">Kargo & Garanti Bilgisi</h3>
        <p className="text-sm text-gray-700">
          Ürünlerimiz kargo firmasına 48 saat içinde teslim edilir. 14 gün içinde koşulsuz iade garantisi vardır.
        </p>
      </div>

      {/* SSS */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Sık Sorulan Sorular</h2>
        {ssSorular.map((s, i) => (
          <details key={i} className="mb-3 border rounded p-3">
            <summary className="font-semibold cursor-pointer">{s.soru}</summary>
            <p className="text-sm text-gray-700 mt-2">{s.cevap}</p>
          </details>
        ))}
      </div>

      {/* Yorumlar & Form */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Kullanıcı Yorumları</h2>
        {yorumList.map((y, i) => (
          <div key={i} className="border rounded p-4 mb-3 bg-gray-50">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{y.name}</span>
              <span className="text-xs text-gray-500">{new Date(y.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="text-yellow-500 mb-1">
              {'★'.repeat(y.rating)}{'☆'.repeat(5 - y.rating)}
            </div>
            <p className="text-gray-700">{y.text}</p>
          </div>
        ))}

        {/* Yeni Yorum Formu */}
        <div className="mt-6 p-4 border rounded bg-white">
          <h3 className="font-semibold mb-2">Yorum Yazın</h3>
          <input
            type="text"
            name="isim"
            placeholder="Adınız"
            value={yorumForm.isim}
            onChange={handleYorumChange}
            className="w-full border px-3 py-2 mb-2 rounded"
          />
          <textarea
            name="text"
            placeholder="Yorumunuz"
            value={yorumForm.text}
            onChange={handleYorumChange}
            className="w-full border px-3 py-2 mb-2 rounded"
            rows={3}
          />
          <div className="flex items-center mb-2">
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => handlePuanSelect(n)}
                className={`text-2xl focus:outline-none ${yorumForm.rating >= n ? 'text-yellow-500' : 'text-gray-300'}`}
              >★</button>
            ))}
          </div>
          <button
            onClick={handleYorumSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Gönder
          </button>
        </div>
      </div>

      {/* Benzer Ürünler */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Benzer Ürünler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benzerUrunler.map((b, i) => (
            <a key={i} href={`/urun/${b.slug}`} className="border rounded p-3 bg-white hover:shadow">
              <Image src={b.image} alt={b.title} width={300} height={200} className="rounded mb-2" />
              <h3 className="text-sm font-semibold text-gray-700">{b.title}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Modallar (Teklif & Örnek) */}
      {/* … Mevcut modal JSX’iniz buraya gelecek, aynen koruyun … */}

    </div>
  );
}