'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import UrunKarti from '@/components/UrunKarti';

export default function AnaSayfa() {
  const [lang, setLang] = useState('TR');

  const kategoriler = [
    { ad: 'Ambalaj ve Baskı' },
    { ad: 'Taşımacılık' },
    { ad: 'Isıklar ve Aydınlatma' },
    { ad: 'Sanat ve El Sanatları' },
    { ad: 'Oyuncaklar' },
    { ad: 'Giyim ve Aksesuar' },
    { ad: 'Tüketici Elektroniği' },
    { ad: 'Günlük Kullanım Ürünleri' },
    { ad: 'Gıda ve Tarım' },
    { ad: 'Mobilya' },
    { ad: 'Ev Gereçleri' },
    { ad: 'Yapı ve İnşaat' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* ÜST ŞERİT */}
      <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow relative">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="TurkBazaar Logosu" width={40} height={40} />
          <span className="text-xl font-bold">TurkBazaar</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/giris-yap" className="hover:underline">Giriş Yap</Link>
          <Link href="/kayit-ol" className="hover:underline">Kayıt Ol</Link>

          {/* Kategoriler Açılır Menü */}
          <div className="relative group">
            <button className="hover:underline">Kategoriler</button>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-md rounded mt-2 p-2 w-48 z-50">
              {kategoriler.map((kat, i) => (
                <div key={i} className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm">
                  {kat.ad}
                </div>
              ))}
            </div>
          </div>

          {/* Dil Seçimi */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white text-green-700 px-2 py-1 rounded"
          >
            <option value="TR">🇹🇷 Türkçe</option>
            <option value="EN">🇬🇧 English</option>
            <option value="AR">🇸🇦 عربي</option>
            <option value="DE">🇩🇪 Deutsch</option>
            <option value="ZH">🇨🇳 中文</option>
            <option value="KO">🇰🇷 한국어</option>
          </select>

          <a
            href="https://wa.me/905551112233"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100"
          >
            Canlı Destek
          </a>
        </div>
      </header>

      {/* ANA İÇERİK */}
      <main className="p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">TurkBazaar&apos;a Hoş Geldiniz</h1>
          <p className="text-gray-600 mb-6">Türkiye&apos;nin yerli satıcılarını dünyayla buluşturan ticaret platformu.</p>
        </div>

        {/* ARAMA */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Ürün veya kategori ara..."
            className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-l-md text-black"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
            Ara
          </button>
        </div>

        {/* KATEGORİLER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          {kategoriler.map((kategori, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer text-center"
            >
              <p className="font-medium text-gray-700">{kategori.ad}</p>
            </div>
          ))}
        </div>

        {/* ÖNE ÇIKAN ÜRÜNLER */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Öne Çıkan Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <UrunKarti baslik="Organik Zeytinyağı" resim="/urun1.jpg" fiyat="150₺" />
            <UrunKarti baslik="El Dokuması Halı" resim="/urun2.jpg" fiyat="3.200₺" />
            <UrunKarti baslik="Ahşap Oyuncak Seti" resim="/urun3.jpg" fiyat="450₺" />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-green-800 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-bold mb-2">Hakkımızda</h2>
            <p className="text-sm text-gray-200">
              TurkBazaar, yerli satıcıların ürünlerini hem Türkiye'de hem de dünyada sergileyebileceği modern bir B2B pazaryeridir.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Bağlantılar</h2>
            <ul className="text-sm text-gray-200 space-y-1">
              <li><Link href="/giris-yap">Giriş Yap</Link></li>
              <li><Link href="/kayit-ol">Kayıt Ol</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>
              <li><Link href="/sss">SSS</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">İletişim</h2>
            <p className="text-sm text-gray-200">+90 555 555 55 55</p>
            <p className="text-sm text-gray-200">info@turkbazaar.com.tr</p>
            <p className="text-sm text-gray-200">Türkiye Merkez Ofis</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-300 mt-6">
          © 2025 TurkBazaar. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
