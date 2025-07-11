'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GirisYapPage() {
  const [lang, setLang] = useState("TR");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ÜST ŞERİT */}
      <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="TurkBazaar Logosu" width={40} height={40} />
          <span className="text-xl font-bold">TurkBazaar</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Ana Sayfa */}
          <Link href="/" className="hover:underline">
            Ana Sayfa
          </Link>

          {/* Dil Seçimi */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white text-green-700 rounded px-2 py-1"
          >
            <option value="TR">🇹🇷 Türkçe</option>
            <option value="EN">🇬🇧 English</option>
          </select>

          {/* Canlı Destek */}
          <button className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100">
            💬 Canlı Destek
          </button>
        </div>
      </header>

      {/* GİRİŞ FORMU */}
      <main className="flex justify-center items-center mt-20">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Giriş Yap</h1>
          <p className="text-center text-sm mb-4 text-gray-600">
            Türkiye’nin yerli satıcılarına özel platform. Devam etmek için giriş yapın.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="E-posta"
              className="border rounded px-4 py-2"
            />
            <input
              type="password"
              placeholder="Şifre"
              className="border rounded px-4 py-2"
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Giriş Yap
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Hesabınız yok mu?{" "}
            <Link href="/kayit-ol" className="text-green-700 font-medium hover:underline">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}