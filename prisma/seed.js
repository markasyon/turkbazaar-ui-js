// prisma/seed.js
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  await db.product.upsert({
    where: { slug: 'organik-zeytinyagi' },
    update: {}, // Mevcutsa hiçbir şeyi güncelleme (boş bırakıyoruz)
    create: {
      slug: 'organik-zeytinyagi',
      title: 'Organik Zeytinyağı',
      description: 'Doğal sıkım, katkısız ve taze organik zeytinyağı.',
      image: '/urun1.jpg',
      whatsapp: '905551112233',
      reviews: {
        create: [
          {
            name: 'Ahmet K.',
            text: 'Ürün beklediğimden kaliteli çıktı, kargo da hızlıydı.',
            rating: 5
          },
          {
            name: 'Elif Y.',
            text: 'Fiyat/performans açısından çok iyi. Tavsiye ederim.',
            rating: 4
          },
          {
            name: 'Mehmet B.',
            text: 'Ürün güzel ama paketleme geliştirilebilir.',
            rating: 3
          }
        ]
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })