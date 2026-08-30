import { services, projects } from './data.js'

const BASE = 'https://yaptir.io'

/* Rota bazlı başlık/açıklama — hem çalışma anında (History API geçişleri)
   hem de build sırasındaki prerender'da (scripts/prerender.mjs) kullanılır. */
export function metaFor(path) {
    const [base, slug] = path.replace(/^\/+|\/+$/g, '').split('/')

    if (base === 'hizmetler' && slug) {
        const s = services.find(x => x.id === slug)
        if (s) return {
            title: `${s.title} — yaptir.io`,
            description: `${s.long} ${s.short}`.slice(0, 158),
            canonical: `${BASE}/hizmetler/${slug}`
        }
    }
    if (base === 'projeler' && slug) {
        const p = projects.find(x => x.slug === slug)
        if (p) return {
            title: `${p.title} — Proje | yaptir.io`,
            description: p.short.slice(0, 158),
            canonical: `${BASE}/projeler/${slug}`
        }
    }

    const pages = {
        '': {
            title: 'yaptir.io — KOBİ\'ler için Yapay Zeka Otomasyonu ve Özel Yazılım',
            description: 'Restoran, e-ticaret, klinik ve 9 sektöre özel yapay zeka otomasyonu, chatbot ve özel yazılım çözümleri. Fikirden canlı ürüne — teklif almak 5 dakika.'
        },
        hizmetler: {
            title: 'Hizmetlerimiz — AI Otomasyon, Özel Yazılım, Chatbot | yaptir.io',
            description: 'AI otomasyon, özel yazılım, veri & analitik, entegrasyon, chatbot, danışmanlık ve sosyal medya yönetimi — işletmenize uçtan uca çözümler.'
        },
        projeler: {
            title: 'Projelerimiz — Başarı Hikayeleri | yaptir.io',
            description: 'MUUS PRO, SSW, RetroLokal, NEST ve DRV-E — farklı sektörlerde hayata geçirdiğimiz gerçek projeler, ekran görüntüleri ve ölçülebilir sonuçlarıyla.'
        },
        hakkimizda: {
            title: 'Hakkımızda — Ekibimiz ve Çalışma Şeklimiz | yaptir.io',
            description: 'Yapay zeka mühendisleri ve full-stack geliştiricilerden oluşan ekibimiz, her projeye iş ortağı gözüyle yaklaşır. Önce dinle, sonra anla, en son çöz.'
        },
        iletisim: {
            title: 'İletişim — Teklif Alın | yaptir.io',
            description: 'Projeniz için 24 saat içinde dönüş: teklif formu, info@yaptir.io, Cihangir/İstanbul. İlk görüşme ücretsiz.'
        }
    }
    const m = pages[base] || pages['']
    return { ...m, canonical: `${BASE}/${base}` .replace(/\/$/, '') || BASE }
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
