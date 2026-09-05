# II. Dünya Savaşı Web Sitesi — Sistem Mimarisi Dokümanı

## 1. Proje Özeti

**Site Adı (öneri):** WW2Archive / İkinciDünyaSavaşıAnsiklopedisi
**Amaç:** II. Dünya Savaşı hakkında olayları, kişileri, cepheleri, savaşları, ülkeleri ve kaynakları kronolojik ve kategorik olarak sunan, interaktif harita ve zaman çizelgesi içeren bir bilgi/ansiklopedi platformu.

**Hedef Kitle:** Tarih meraklıları, öğrenciler, akademisyenler, içerik editörleri (admin panel üzerinden).

**Temel Özellikler:**
- Kronolojik zaman çizelgesi (Timeline)
- İnteraktif dünya haritası (cephe hareketleri, işgal bölgeleri)
- Kişi/biyografi arşivi (komutanlar, liderler, sivil figürler)
- Savaş/muharebe detay sayfaları
- Ülke/cephe bazlı gruplama (Avrupa Cephesi, Pasifik Cephesi, Afrika Cephesi vb.)
- Medya galerisi (fotoğraf, belge, video, ses arşivi)
- Arama ve filtreleme motoru
- Çok dilli destek (TR/EN)
- Yönetim paneli (CMS)
- Kullanıcı yorum/katkı sistemi (moderasyonlu)

---

## 2. Genel Mimari Yaklaşım

**Mimari Tipi:** 3 katmanlı (Client - Server/API - Database), mikroservise gerek olmayan orta ölçekli monolitik-modüler yapı (ileride mikroservise bölünebilir).

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT KATMANI                        │
│   Web Tarayıcı (Desktop/Mobile) - React/Next.js SPA/SSR      │
└───────────────────────────┬───────────────────────────────────┘
                            │ HTTPS / REST-GraphQL
┌───────────────────────────▼───────────────────────────────────┐
│                     UYGULAMA (API) KATMANI                     │
│  ┌───────────┐ ┌────────────┐ ┌───────────┐ ┌───────────────┐ │
│  │ Auth       │ │ Content    │ │ Search     │ │ Media         │ │
│  │ Service    │ │ Service    │ │ Service    │ │ Service       │ │
│  └───────────┘ └────────────┘ └───────────┘ └───────────────┘ │
│                     Node.js/Express veya Django/FastAPI        │
└───────────────────────────┬───────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                        VERİ KATMANI                            │
│  PostgreSQL (ana veri) | Elasticsearch (arama) | Redis (cache)│
│  S3/Object Storage (medya dosyaları) | CDN (statik içerik)     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Teknoloji Yığını (Tech Stack)

### Frontend
| Katman | Teknoloji | Açıklama |
|---|---|---|
| Framework | Next.js (React) | SSR/SSG ile SEO dostu sayfalar |
| Stil | Tailwind CSS | Hızlı, tutarlı tasarım sistemi |
| Harita | Mapbox GL / Leaflet.js | İnteraktif cephe haritaları |
| Zaman Çizelgesi | vis-timeline / D3.js | Kronoloji görselleştirme |
| State Yönetimi | Zustand / Redux Toolkit | Global state kontrolü |
| Form/Validasyon | React Hook Form + Zod | Admin paneli formları |

### Backend
| Katman | Teknoloji | Açıklama |
|---|---|---|
| Runtime | Node.js (NestJS) veya Python (FastAPI) | REST + GraphQL API |
| Kimlik Doğrulama | JWT + OAuth2 (Google/Apple ile giriş) | Kullanıcı ve admin girişi |
| Arama Motoru | Elasticsearch / Meilisearch | Tam metin arama, filtreleme |
| Cache | Redis | Sık erişilen sayfalar, oturum verisi |
| Kuyruk Sistemi | BullMQ / RabbitMQ | Medya işleme, e-posta bildirimleri |
| Dosya Depolama | AWS S3 / MinIO (self-hosted) | Fotoğraf, video, PDF arşivi |

### Veritabanı
| Tip | Teknoloji | Kullanım Amacı |
|---|---|---|
| İlişkisel | PostgreSQL | Ana içerik verisi (olaylar, kişiler, savaşlar) |
| Doküman | MongoDB (opsiyonel) | Esnek içerik blokları, yorum sistemi |
| Arama İndeksi | Elasticsearch | Hızlı, çok kriterli arama |
| Cache | Redis | Oturum, rate-limiting, geçici veri |

### Altyapı / DevOps
| Bileşen | Teknoloji |
|---|---|
| Konteynerleştirme | Docker + Docker Compose |
| Orkestrasyon | Kubernetes (ölçeklenme gerekirse) |
| CI/CD | GitHub Actions / GitLab CI |
| İzleme | Grafana + Prometheus |
| Hata Takibi | Sentry |
| CDN | Cloudflare |
| Barındırma | AWS / DigitalOcean / Hetzner |

---

## 4. Veritabanı Şeması (Özet ER Modeli)

```
Users
 ├─ id (PK)
 ├─ email
 ├─ password_hash
 ├─ role (admin, editor, viewer)
 └─ created_at

Events (Olaylar)
 ├─ id (PK)
 ├─ title
 ├─ description
 ├─ date_start
 ├─ date_end
 ├─ front_id (FK -> Fronts)
 ├─ location (lat, lng)
 ├─ category_id (FK -> Categories)
 └─ importance_level

Fronts (Cepheler)
 ├─ id (PK)
 ├─ name (Avrupa, Pasifik, Afrika, Doğu Cephesi...)
 └─ description

Battles (Muharebeler)
 ├─ id (PK)
 ├─ name
 ├─ event_id (FK -> Events)
 ├─ casualties_summary
 ├─ outcome
 └─ participants (FK -> Countries, many-to-many)

Countries (Ülkeler)
 ├─ id (PK)
 ├─ name
 ├─ alliance (Mihver / Müttefik)
 └─ flag_image_url

People (Kişiler)
 ├─ id (PK)
 ├─ name
 ├─ role (komutan, lider, sivil...)
 ├─ country_id (FK -> Countries)
 ├─ birth_date / death_date
 └─ biography

Media (Medya)
 ├─ id (PK)
 ├─ type (image, video, document, audio)
 ├─ url
 ├─ related_entity_type (event, person, battle)
 └─ related_entity_id

Categories (Kategoriler)
 ├─ id (PK)
 └─ name (Cephe, Siyasi, Teknoloji, Soykırım, vb.)

Comments (Yorumlar)
 ├─ id (PK)
 ├─ user_id (FK -> Users)
 ├─ entity_type / entity_id
 ├─ content
 └─ status (pending, approved, rejected)
```

---

## 5. API Uç Noktaları (Örnek REST Endpoint Listesi)

```
GET    /api/events                → Tüm olayları listele (filtre: tarih, cephe, kategori)
GET    /api/events/:id            → Tek olay detayı
GET    /api/battles               → Muharebe listesi
GET    /api/battles/:id           → Muharebe detayı
GET    /api/people                → Kişi/biyografi listesi
GET    /api/people/:id            → Kişi detayı
GET    /api/countries             → Ülke listesi
GET    /api/countries/:id         → Ülke detayı + ilişkili olaylar
GET    /api/timeline              → Zaman çizelgesi verisi (tarih aralığına göre)
GET    /api/map/fronts            → Harita için cephe/koordinat verisi
GET    /api/search?q=             → Genel arama (Elasticsearch destekli)
POST   /api/comments              → Yorum gönder (auth gerekli)
POST   /api/auth/login            → Giriş
POST   /api/auth/register         → Kayıt
--- Admin ---
POST   /api/admin/events          → Yeni olay ekle
PUT    /api/admin/events/:id      → Olay güncelle
DELETE /api/admin/events/:id      → Olay sil
POST   /api/admin/media/upload    → Medya yükle
```

---

## 6. Site Haritası / Sayfa İskeleti (Sitemap)

```
/
├── / (Anasayfa)
│   ├── Öne çıkan olaylar
│   ├── İnteraktif zaman çizelgesi önizleme
│   ├── Popüler kişiler
│   └── Son eklenen içerikler
│
├── /zaman-cizelgesi
│   └── /zaman-cizelgesi/[yil]           (örn: /zaman-cizelgesi/1943)
│
├── /harita
│   └── /harita/[cephe-slug]             (örn: /harita/dogu-cephesi)
│
├── /cepheler
│   ├── /cepheler/avrupa-cephesi
│   ├── /cepheler/pasifik-cephesi
│   ├── /cepheler/afrika-cephesi
│   ├── /cepheler/dogu-cephesi
│   └── /cepheler/[cephe-slug]
│
├── /muharebeler
│   ├── /muharebeler (liste + filtre)
│   └── /muharebeler/[muharebe-slug]     (örn: /muharebeler/stalingrad-muharebesi)
│
├── /kisiler
│   ├── /kisiler (liste + filtre: komutan/lider/sivil)
│   └── /kisiler/[kisi-slug]             (örn: /kisiler/winston-churchill)
│
├── /ulkeler
│   ├── /ulkeler (Mihver/Müttefik gruplandırma)
│   └── /ulkeler/[ulke-slug]
│
├── /konular
│   ├── /konular/soykirim-ve-holokost
│   ├── /konular/teknoloji-ve-silahlar
│   ├── /konular/siyasi-arka-plan
│   └── /konular/gunluk-hayat
│
├── /medya-arsivi
│   ├── /medya-arsivi/fotograflar
│   ├── /medya-arsivi/videolar
│   ├── /medya-arsivi/belgeler
│   └── /medya-arsivi/ses-kayitlari
│
├── /arama?q=
│
├── /hakkinda
│   ├── /hakkinda/kaynakca
│   └── /hakkinda/iletisim
│
├── /giris
├── /kayit
├── /profil
│
└── /admin (korumalı panel)
    ├── /admin/dashboard
    ├── /admin/olaylar (CRUD)
    ├── /admin/muharebeler (CRUD)
    ├── /admin/kisiler (CRUD)
    ├── /admin/medya (yükleme/yönetim)
    ├── /admin/yorumlar (moderasyon)
    └── /admin/kullanicilar
```

---

## 7. Klasör Yapısı (Örnek Proje Dizini)

```
ww2-website/
├── frontend/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                 → Anasayfa
│   │   │   ├── zaman-cizelgesi/
│   │   │   ├── harita/
│   │   │   ├── cepheler/
│   │   │   ├── muharebeler/
│   │   │   ├── kisiler/
│   │   │   ├── ulkeler/
│   │   │   ├── konular/
│   │   │   ├── medya-arsivi/
│   │   │   └── arama/
│   │   ├── (auth)/
│   │   │   ├── giris/
│   │   │   └── kayit/
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── olaylar/
│   │       ├── muharebeler/
│   │       ├── kisiler/
│   │       └── medya/
│   ├── components/
│   │   ├── ui/                          → Buton, kart, modal vb.
│   │   ├── timeline/
│   │   ├── map/
│   │   └── layout/
│   ├── lib/                             → API client, yardımcı fonksiyonlar
│   ├── hooks/
│   ├── styles/
│   └── public/                          → Statik dosyalar (logo, ikonlar)
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── events/
│   │   │   ├── battles/
│   │   │   ├── people/
│   │   │   ├── countries/
│   │   │   ├── media/
│   │   │   ├── search/
│   │   │   └── comments/
│   │   ├── common/                      → Guard, interceptor, filtre
│   │   ├── config/
│   │   └── main.ts
│   ├── prisma/ (veya migrations/)       → Veritabanı şema/migrasyon
│   └── test/
│
├── infra/
│   ├── docker-compose.yml
│   ├── nginx/
│   └── k8s/ (opsiyonel)
│
└── docs/
    └── api-docs.md
```

---

## 8. Güvenlik Katmanı

- **HTTPS zorunlu** (TLS 1.3), tüm trafik Cloudflare üzerinden.
- **JWT tabanlı kimlik doğrulama**, refresh token rotasyonu.
- **Rol bazlı yetkilendirme (RBAC):** admin, editor, viewer.
- **Rate limiting:** Redis destekli, IP bazlı istek sınırlama (özellikle arama ve yorum uçları için).
- **Input sanitization:** XSS/SQL Injection önleme (parametreli sorgular, DOMPurify).
- **CSRF koruması:** SameSite cookie + CSRF token.
- **Medya yükleme doğrulaması:** dosya tipi/boyut kontrolü, virüs taraması (ClamAV).
- **Yorum moderasyonu:** otomatik spam filtresi + manuel admin onayı.
- **Loglama ve denetim izi (audit log):** içerik değişikliklerinin kim/ne zaman yaptığı kaydı.

---

## 9. Performans ve Ölçeklenebilirlik

- **CDN üzerinden statik varlık dağıtımı** (görseller, CSS, JS).
- **Sayfa önbellekleme:** SSG/ISR (Incremental Static Regeneration) ile sık değişmeyen sayfalar (kişi/olay detayları) statik üretilir.
- **Redis cache katmanı:** sık sorgulanan API yanıtları (timeline, harita verisi) önbelleklenir.
- **Elasticsearch ile arama:** PostgreSQL üzerinde tam metin aramadan çok daha hızlı sonuç.
- **Lazy loading:** medya galerisi ve harita katmanları için.
- **Yatay ölçeklenme:** Docker/Kubernetes ile API servislerinin çoklu instance çalıştırılması.
- **Veritabanı indeksleme:** tarih, cephe_id, kategori_id gibi sık filtrelenen alanlarda index.

---

## 10. Yol Haritası (Geliştirme Fazları)

| Faz | İçerik |
|---|---|
| Faz 1 | Veritabanı şeması, temel CRUD API, anasayfa + olay/kişi detay sayfaları |
| Faz 2 | Zaman çizelgesi ve interaktif harita entegrasyonu |
| Faz 3 | Arama motoru (Elasticsearch), filtreleme sistemi |
| Faz 4 | Medya arşivi, kullanıcı yorum sistemi |
| Faz 5 | Admin paneli (CMS), rol yönetimi |
| Faz 6 | Çok dilli destek, SEO optimizasyonu, performans iyileştirmeleri |
| Faz 7 | Test, güvenlik denetimi, canlıya alma (production deploy) |

---

*Bu doküman, projenin başlangıç mimarisini tanımlar; geliştirme sürecinde ekip ihtiyaçlarına göre revize edilebilir.*
