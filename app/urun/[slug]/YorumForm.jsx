'use client'
import { useState } from 'react'

export default function YorumForm({ slug, onYorumEklendi }) {
  const [form, setForm] = useState({ name: '', text: '', rating: 0 })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleStar = i => setForm(f => ({ ...f, rating: i }))

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(`/api/urun/${slug}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const yeni = await res.json()
    onYorumEklendi(yeni)
    setForm({ name: '', text: '', rating: 0 })
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h3 className="font-semibold mb-2">Yorum Yaz</h3>
      <div className="flex mb-2">
        {[1,2,3,4,5].map(i => (
          <button
            type="button"
            key={i}
            onClick={() => handleStar(i)}
            className="text-yellow-500 text-2xl"
          >
            {i <= form.rating ? '★' : '☆'}
          </button>
        ))}
      </div>
      <input
        name="name" value={form.name} onChange={handleChange}
        placeholder="Adınız" required
        className="w-full border px-2 py-1 mb-2 rounded"
      />
      <textarea
        name="text" value={form.text} onChange={handleChange}
        placeholder="Yorumunuz" required rows={3}
        className="w-full border px-2 py-1 mb-2 rounded"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Gönder</button>
    </form>
  )
}