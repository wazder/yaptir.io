import { services, projects, industries, sektorSeo } from './data.js'

const BASE = 'https://yaptir.io'

/* Rota bazlı başlık/açıklama — hem çalışma anında (History API geçişleri)
   hem de build sırasındaki prerender'da (scripts/prerender.mjs) kullanılır. */
export function metaFor(path) {
    const [base, slug] = path.replace(/^\/+|\/+$/g, '').split('/')

    if (base === 'hizmetler' && slug) {
        const s = services.find(x => x.id === slug)
        if (s) return {
            title: s.seo?.title || `${s.title} — yaptir.io`,
            description: (s.seo?.desc || `${s.long} ${s.short}`).slice(0, 158),
            canonical: `${BASE}/hizmetler/${slug}/`
        }
    }
    if (base === 'sektorler' && slug) {
        const m = sektorSeo[slug]
        const ind = industries.find(x => x.slug === slug)
        if (m && ind) return {
            title: m.title,
            description: m.desc.slice(0, 158),
            canonical: `${BASE}/sektorler/${slug}/`
        }
    }
    if (base === 'rehber' && slug === 'yazilim-yaptirma') {
        return {
            title: 'Yazılım Yaptırma Rehberi 2026 — Fiyatlar, Süreç, Dikkat Edilecekler | yaptir.io',
            description: 'Yazılım yaptırmak isteyenler için dürüst rehber: fiyatı ne belirler, teklife hangi 5 soru sorulur, kaynak kod kimde kalmalı, süreç nasıl işler, en sık 4 hata.'.slice(0, 158),
            canonical: `${BASE}/rehber/yazilim-yaptirma/`
        }
    }
    if (base === 'projeler' && slug) {
        const p = projects.find(x => x.slug === slug)
        if (p) return {
            title: `${p.title} — ${p.client || 'Proje'} Referansı | yaptir.io`,
            description: p.short.slice(0, 158),
            canonical: `${BASE}/projeler/${slug}/`
        }
    }

    /* "yaptır" markanın kendisi aynı zamanda arama niyeti taşıyan bir fiil:
       "chatbot yaptır", "yazılım yaptırmak istiyorum" gibi sorgular doğrudan
       marka+niyet eşleşmesi kurar — başlıklar bu kalıba göre yazıldı. */
    const pages = {
        '': {
            title: 'Yazılım Yaptır — Yapay Zeka Otomasyonu, Chatbot & Özel Yazılım | yaptir.io',
            description: 'İşini büyütmek isteyen KOBİ\'ler için İstanbul merkezli yazılım stüdyosu: yapay zeka otomasyonu, WhatsApp chatbot, özel yazılım ve entegrasyon yaptırın. Teklif 24 saatte.'
        },
        hizmetler: {
            title: 'Hizmetler — AI Otomasyon, Chatbot, Özel Yazılım Yaptır | yaptir.io',
            description: 'Yapay zeka otomasyonu, özel yazılım, chatbot, veri analitiği, API entegrasyonu, danışmanlık ve reklam yönetimi. Ne yaptırmak istediğinizi seçin, gerisini biz kuralım.'
        },
        projeler: {
            title: 'Projeler & Referanslar — Gerçek İşler, Ölçülü Sonuçlar | yaptir.io',
            description: 'MUUS PRO, SSW, RetroLokal, NEST ve DRV-E — kafeden nörobilime farklı sektörlerde canlıya aldığımız gerçek projeler, ekran görüntüleri ve ölçülebilir sonuçlarıyla.'
        },
        sektorler: {
            title: 'Sektörler — Restoran, E-ticaret, Klinik, Otel Yazılımları | yaptir.io',
            description: 'Restoran, e-ticaret, klinik, kuaför, emlak, hukuk, fitness, eğitim ve otel — 9 sektöre özel yazılım, otomasyon ve chatbot çözümleri. Sektörünüzü seçin.'
        },
        hakkimizda: {
            title: 'Hakkımızda — İstanbul Merkezli Yazılım & AI Ekibi | yaptir.io',
            description: 'Nazlı Nehir Sertbaş (Kurucu & CEO) liderliğindeki İstanbul merkezli ekip: yapay zeka mühendisliği, full-stack geliştirme ve kreatif yönetim tek çatıda. Önce dinle, sonra çöz.'
        },
        iletisim: {
            title: 'Teklif Al — Yazılım, Chatbot, Otomasyon Fiyat Teklifi | yaptir.io',
            description: 'Yazılım veya chatbot yaptırmak mı istiyorsunuz? Formu doldurun, 24 saat içinde net teklif alın. İlk görüşme ücretsiz — info@yaptir.io, Cihangir/İstanbul.'
        }
    }
    /* Canlı sunucu (CF Pages) dizin rotalarını sondaki eğik çizgiyle servis
       ediyor (/hizmetler → 308 → /hizmetler/); canonical ve sitemap 308
       zincirine girmesin diye nihai biçimi kullanır. */
    const m = pages[base] || pages['']
    return { ...m, canonical: base ? `${BASE}/${base}/` : `${BASE}/` }
}

export function applyMeta(path) {
    const m = metaFor(path)
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
    }
    link.href = m.canonical
}
