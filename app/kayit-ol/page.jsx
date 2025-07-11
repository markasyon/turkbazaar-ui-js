'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function KayitOlPage() {
  const [lang, setLang] = useState("TR");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ÜST ŞERİT */}
      <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="TurkBazaar Logo" width={40} height={40} />
          <span className="text-xl font-bold">TurkBazaar</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white text-green-700 rounded px-2 py-1">
            <option value="TR">🇹🇷 Türkçe</option>
            <option value="EN">🇬🇧 English</option>
          </select>
          <button className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100">💬 Canlı Destek</button>
        </div>
      </header>

      {/* KAYIT KUTUSU */}
      <main className="flex justify-center items-center mt-20">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">TurkBazaar’a Kayıt Ol</h1>
          <p className="text-center text-sm mb-4 text-gray-600">
            Türkiye’nin yerli satıcılarına özel pazar yerine katılmak için hesabınızı oluşturun.
          </p>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Ad Soyad" className="border rounded px-4 py-2" />
            <input type="email" placeholder="E-posta" className="border rounded px-4 py-2" />
            <input type="tel" placeholder="Telefon" className="border rounded px-4 py-2" />
            <input type="password" placeholder="Şifre" className="border rounded px-4 py-2" />
            <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Kayıt Ol
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris-yap" className="text-green-700 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}