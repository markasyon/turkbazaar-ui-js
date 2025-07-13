"use client";

import Image from 'next/image'; import { useParams } from 'next/navigation'; import { useState } from 'react';

const urunler = [ { slug: 'organik-zeytinyagi', baslik: 'Organik Zeytinyağı', resim: '/urun1.jpg', fiyatAralik: [ { adet: '1-10', fiyat: '150₺' }, { adet: '11-50', fiyat: '140₺' }, { adet: '51+', fiyat: '125₺' } ], aciklama: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.', teknik: 'Soğuk sıkım, 1. kalite, cam şişe 1L.', whatsapp: '905551112233', firma: { ad: 'Lider Süt ve Süt Ürünleri', logo: '/firma-logo.png' } }, ];

const yorumlar = [ { isim: 'Ahmet K.', yorum: 'Ürün beklediğimden kaliteli çıktı, kargo da hızlıydı.', puan: 5, tarih: '13 Temmuz 2025' }, { isim: 'Elif Y.', yorum: 'Fiyat/performans açısından çok iyi. Tavsiye ederim.', puan: 4, tarih: '10 Temmuz 2025' }, { isim: 'Mehmet B.', yorum: 'Ürün güzel ama paketleme geliştirilebilir.', puan: 3, tarih: '5 Temmuz 2025' } ];

const benzerUrunler = [ { slug: 'naturel-zeytinyagi', baslik: 'Naturel Zeytinyağı', resim: '/urun2.jpg' }, { slug: 'zeytin-sabunu', baslik: 'Zeytin Sabunu', resim: '/urun3.jpg' } ];

const ssSorular = [ { soru: 'Kargo süresi ne kadar?', cevap: 'Siparişiniz 2 iş günü içinde kargoya verilir.' }, { soru: 'İade koşulları nelerdir?', cevap: 'Ürün tesliminden sonra 14 gün içinde iade edebilirsiniz.' } ];

export default function UrunDetay() { const { slug } = useParams(); const urun = urunler.find((u) => u.slug === slug); const [teklifModal, setTeklifModal] = useState(false); const [ornekModal, setOrnekModal] = useState(false); const [favori, setFavori] = useState(false); const [form, setForm] = useState({ isim: '', eposta: '', telefon: '', adet: '', mesaj: '' }); const [ornekForm, setOrnekForm] = useState({ isim: '', adres: '', telefon: '', mesaj: '' });

if (!urun) return <div className="p-6 text-red-600">Ürün bulunamadı.</div>;

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }); const handleOrnekChange = (e) => setOrnekForm({ ...ornekForm, [e.target.name]: e.target.value }); const handleGonder = () => { alert(Teklif gönderildi:\n${JSON.stringify(form, null, 2)}); setTeklifModal(false); }; const handleOrnekGonder = () => { alert(Örnek talebi gönderildi:\n${JSON.stringify(ornekForm, null, 2)}); setOrnekModal(false); };

return ( <div className="p-6 max-w-5xl mx-auto"> <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> <div className="relative"> <Image src={urun.resim} alt={urun.baslik} width={500} height={350} className="rounded shadow" /> <button onClick={() => setFavori(!favori)} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-105 transition" title="Favorilere Ekle" > {favori ? '❤️' : '🤍'} </button> </div>

<div>
      <h1 className="text-3xl font-bold mb-2">{urun.baslik}</h1>
      {urun.firma && (
        <div className="flex items-center gap-3 mb-2">
          {urun.firma.logo && (
            <Image src={urun.firma.logo} alt="Firma Logosu" width={40} height={40} className="rounded-full" />
          )}
          <span className="text-sm text-gray-600">{urun.firma.ad}</span>
        </div>
      )}
      <p className="text-gray-700 mb-2">{urun.aciklama}</p>
      {urun.teknik && (
        <div className="text-sm text-gray-800 font-medium mb-3">
          <span className="font-semibold text-gray-600">Teknik Özellikler: </span>{urun.teknik}
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
      <div className="flex gap-3 flex-wrap mb-4">
        <button onClick={() => setTeklifModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">Teklif Ver</button>
        <a
          href={`https://wa.me/${urun.whatsapp}?text=Merhaba,%20${urun.baslik}%20için%20müzakere%20etmek%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-gray-100"
        >Müzakere Et</a>
        <button onClick={() => setOrnekModal(true)} className="bg-gray-100 text-gray-700 border px-4 py-2 rounded hover:bg-gray-200">Örnek İste</button>
      </div>
    </div>
  </div>

  {/* Kargo & Garanti */}
  <div className="mt-6 bg-gray-50 p-4 rounded border">
    <h3 className="font-semibold mb-1">Kargo & Garanti Bilgisi</h3>
    <p className="text-sm text-gray-700">Ürünlerimiz kargo firmasına 48 saat içinde teslim edilir. 14 gün içinde koşulsuz iade garantisi vardır.</p>
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

  {/* Yorumlar */}
  <div className="mt-10">
    <h2 className="text-xl font-bold mb-4">Kullanıcı Yorumları</h2>
    {yorumlar.map((yorum, i) => (
      <div key={i} className="border rounded p-4 mb-3 bg-gray-50">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold">{yorum.isim}</span>
          <span className="text-xs text-gray-500">{yorum.tarih}</span>
        </div>
        <div className="text-yellow-500 mb-1">
          {'★'.repeat(yorum.puan)}{'☆'.repeat(5 - yorum.puan)}
        </div>
        <p className="text-gray-700">{yorum.yorum}</p>
      </div>
    ))}
  </div>

  {/* Benzer Ürünler */}
  <div className="mt-10">
    <h2 className="text-xl font-bold mb-4">Benzer Ürünler</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {benzerUrunler.map((item, i) => (
        <a key={i} href={`/urun/${item.slug}`} className="border rounded p-3 bg-white hover:shadow">
          <Image src={item.resim} alt={item.baslik} width={300} height={200} className="rounded mb-2" />
          <h3 className="text-sm font-semibold text-gray-700">{item.baslik}</h3>
        </a>
      ))}
    </div>
  </div>

  {/* Paylaş Butonları */}
  <div className="mt-8">
    <h2 className="text-sm font-semibold mb-2">Bu ürünü paylaş:</h2>
    <div className="flex gap-3 flex-wrap">
      <a href={`https://wa.me/?text=https://site.com/urun/${urun.slug}`} target="_blank" className="text-green-600 hover:underline">WhatsApp</a>
      <a href={`https://t.me/share/url?url=https://site.com/urun/${urun.slug}`} target="_blank" className="text-blue-500 hover:underline">Telegram</a>
      <a href={`mailto:?subject=Ürün Tavsiyesi&body=https://site.com/urun/${urun.slug}`} className="text-red-500 hover:underline">E-posta</a>
      <button onClick={() => { navigator.clipboard.writeText(`https://site.com/urun/${urun.slug}`); alert('Bağlantı kopyalandı!'); }} className="text-gray-600 hover:underline">Bağlantıyı Kopyala</button>
    </div>
  </div>
</div>

); }
