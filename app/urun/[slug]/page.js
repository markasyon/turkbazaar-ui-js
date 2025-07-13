'use client';

import Image from 'next/image'; import { useParams } from 'next/navigation'; import { useState } from 'react';

const urunler = [ { slug: 'organik-zeytinyagi', baslik: 'Organik Zeytinyağı', resim: '/urun1.jpg', fiyatAralik: [ { adet: '1-10', fiyat: '150₺' }, { adet: '11-50', fiyat: '140₺' }, { adet: '51+', fiyat: '125₺' } ], aciklama: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.', teknik: 'Soğuk sıkım, 1. kalite, cam şişe 1L.', whatsapp: '905551112233', firma: { ad: 'Lider Süt ve Süt Ürünleri', logo: '/firma-logo.png' } } ];

const yorumlar = [ { isim: 'Ahmet K.', yorum: 'Ürün beklediğimden kaliteli çıktı, kargo da hızlıydı.', puan: 5, tarih: '13 Temmuz 2025' }, { isim: 'Elif Y.', yorum: 'Fiyat/performans açısından çok iyi. Tavsiye ederim.', puan: 4, tarih: '10 Temmuz 2025' }, { isim: 'Mehmet B.', yorum: 'Ürün güzel ama paketleme geliştirilebilir.', puan: 3, tarih: '5 Temmuz 2025' } ];

const benzerUrunler = [ { slug: 'naturel-zeytinyagi', baslik: 'Naturel Zeytinyağı', resim: '/urun2.jpg' }, { slug: 'zeytin-sabunu', baslik: 'Zeytin Sabunu', resim: '/urun3.jpg' } ];

const ssSorular = [ { soru: 'Kargo süresi ne kadar?', cevap: 'Siparişiniz 2 iş günü içinde kargoya verilir.' }, { soru: 'İade koşulları nelerdir?', cevap: 'Ürün tesliminden sonra 14 gün içinde iade edebilirsiniz.' } ];

export default function UrunDetay() { const { slug } = useParams(); const urun = urunler.find((u) => u.slug === slug);

const [teklifModal, setTeklifModal] = useState(false); const [ornekModal, setOrnekModal] = useState(false); const [favori, setFavori] = useState(false);

const [form, setForm] = useState({ isim: '', eposta: '', telefon: '', adet: '', mesaj: '' }); const [ornekForm, setOrnekForm] = useState({ isim: '', adres: '', telefon: '', mesaj: '' });

const [yorumForm, setYorumForm] = useState({ isim: '', yorum: '', puan: 5 }); const [tumYorumlar, setTumYorumlar] = useState([...yorumlar]);

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }); const handleOrnekChange = (e) => setOrnekForm({ ...ornekForm, [e.target.name]: e.target.value }); const handleYorumChange = (e) => setYorumForm({ ...yorumForm, [e.target.name]: e.target.value });

const handleYorumSubmit = () => { const yeniYorum = { ...yorumForm, tarih: new Date().toLocaleDateString('tr-TR') }; setTumYorumlar([yeniYorum, ...tumYorumlar]); setYorumForm({ isim: '', yorum: '', puan: 5 }); alert('Yorumunuz eklendi!'); };

const handleGonder = () => { alert(Teklif gönderildi:\n${JSON.stringify(form, null, 2)}); setTeklifModal(false); };

const handleOrnekGonder = () => { alert(Örnek talebi gönderildi:\n${JSON.stringify(ornekForm, null, 2)}); setOrnekModal(false); };

if (!urun) return 'Ürün bulunamadı.';

return ( <div className="p-4 max-w-4xl mx-auto"> <div className="relative"> <Image src={urun.resim} alt={urun.baslik} width={600} height={400} className="rounded mb-4" /> <button onClick={() => setFavori(!favori)} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-105 transition" title="Favorilere Ekle" > {favori ? '❤️' : '🤍'} </button> </div>

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

  <div className="mt-10">
    <h2 className="text-xl font-bold mb-4">Yorum Yaz</h2>
    <input
      type="text"
      name="isim"
      placeholder="Adınız Soyadınız"
      value={yorumForm.isim}
      onChange={handleYorumChange}
      className="w-full border px-3 py-2 mb-2 rounded"
    />
    <textarea
      name="yorum"
      placeholder="Yorumunuz"
      value={yorumForm.yorum}
      onChange={handleYorumChange}
      className="w-full border px-3 py-2 mb-2 rounded"
    />
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">Puanınız:</label>
      <select
        name="puan"
        value={yorumForm.puan}
        onChange={handleYorumChange}
        className="border px-2 py-1 rounded"
      >
        {[5,4,3,2,1].map((p) => (
          <option key={p} value={p}>{p} Yıldız</option>
        ))}
      </select>
    </div>
    <button onClick={handleYorumSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
      Yorum Gönder
    </button>
  </div>

  <div className="mt-10">
    <h2 className="text-xl font-bold mb-4">Kullanıcı Yorumları</h2>
    {tumYorumlar.map((yorum, i) => (
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
</div>

); }
