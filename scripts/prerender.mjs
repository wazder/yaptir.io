/* Build sonrası prerender: her rotanın tam HTML'ini dist/<rota>/index.html
   olarak yazar. Sayfa modülleri saf template-string fonksiyonları olduğu için
   Node'da doğrudan çalışır — tarayıcı gerekmez. Botlar (Google + AI) JS
   çalıştırmadan gerçek içeriği görür; SPA yüklenince aynı DOM'u devralır. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { renderHome } = await import('../src/pages/home.js')
const { renderHizmetler } = await import('../src/pages/hizmetler.js')
const { renderHizmetlerDetay } = await import('../src/pages/hizmetlerDetay.js')
const { renderProjeler } = await import('../src/pages/projeler.js')
const { renderProjelerDetay } = await import('../src/pages/projelerDetay.js')
const { renderHakkimizda } = await import('../src/pages/hakkimizda.js')
const { renderIletisim } = await import('../src/pages/iletisim.js')
const { metaFor } = await import('../src/seo.js')
const { services, projects, contact, faqGenel, team, process: surec } = await import('../src/data.js')

const BASE = 'https://yaptir.io'

const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'yaptir.io',
    alternateName: ['yaptir', 'Yaptır', 'yaptir io'],
    slogan: 'Bugün senin için ne yaptırıyoruz?',
    url: BASE,
    logo: `${BASE}/favicon.png`,
    image: `${BASE}/og.jpg`,
    description: "KOBİ'ler için yapay zeka otomasyonu, chatbot ve özel yazılım çözümleri.",
    email: contact.email,
    founder: [
        { '@type': 'Person', name: 'Musa Soylu', jobTitle: 'Kurucu & CEO' },
        { '@type': 'Person', name: 'Nazlı Nehir Sertbaş', jobTitle: 'Co-Founder & Creative Art Direction Lead' }
    ],
    knowsAbout: [
        'yapay zeka otomasyonu', 'chatbot geliştirme', 'WhatsApp chatbot', 'özel yazılım',
        'web uygulaması geliştirme', 'mobil uygulama', 'API entegrasyonu', 'veri analitiği',
        'dashboard', 'e-ticaret entegrasyonu', 'dijital dönüşüm danışmanlığı', 'Meta reklam yönetimi'
    ],
    priceRange: '₺₺',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Cihangir, Oba Sk. No: 2 D:B',
        postalCode: '34433',
        addressLocality: 'Beyoğlu',
        addressRegion: 'İstanbul',
        addressCountry: 'TR'
    },
    geo: { '@type': 'GeoCoordinates', latitude: 41.03175, longitude: 28.98262 },
    hasMap: 'https://www.openstreetmap.org/?mlat=41.03175&mlon=28.98262#map=17/41.03175/28.98262',
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00', closes: '18:00'
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: contact.email,
        availableLanguage: ['Turkish', 'English'],
        url: `${BASE}/iletisim/`
    },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Hizmetler',
        itemListElement: services.map(s => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, url: `${BASE}/hizmetler/${s.id}/` }
        }))
    }
}

function serviceLd(s) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.title,
        description: s.seo?.desc || s.long,
        provider: { '@type': 'Organization', name: 'yaptir.io', url: BASE },
        url: `${BASE}/hizmetler/${s.id}/`,
        areaServed: 'TR',
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${BASE}/iletisim/` }
    }
}

function projectLd(p) {
    const ld = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.title,
        description: p.short,
        image: `${BASE}${p.image}`,
        dateCreated: p.year,
        creator: { '@type': 'Organization', name: 'yaptir.io', url: BASE },
        url: `${BASE}/projeler/${p.slug}/`
    }
    if (p.url) ld.mainEntityOfPage = p.url
    return ld
}

function videoLd(p) {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `${p.title} — ürün turu`,
        description: `${p.title} projesinin canlı arayüzünde gezinti: ${p.short}`,
        thumbnailUrl: `${BASE}${p.image}`,
        contentUrl: `${BASE}${p.video}`,
        uploadDate: `${p.year}-01-01`,
        inLanguage: 'tr'
    }
}

const teamLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'yaptir.io ekibi',
    itemListElement: team.map((m, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: {
            '@type': 'Person', name: m.name, jobTitle: m.role,
            worksFor: { '@type': 'Organization', name: 'yaptir.io', url: BASE }
        }
    }))
}

function faqLd(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a }
        }))
    }
}

function breadcrumbLd(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map(([name, url], i) => ({
            '@type': 'ListItem', position: i + 1, name, item: url
        }))
    }
}

const routes = [
    { path: '', html: renderHome(), ld: [orgLd, {
        '@context': 'https://schema.org', '@type': 'WebSite', name: 'yaptir.io',
        alternateName: 'Yaptır', url: BASE, inLanguage: 'tr'
    }] },
    { path: 'hizmetler', html: renderHizmetler(), ld: [breadcrumbLd([['Ana Sayfa', BASE], ['Hizmetler', `${BASE}/hizmetler/`]])] },
    { path: 'projeler', html: renderProjeler(), ld: [breadcrumbLd([['Ana Sayfa', BASE], ['Projeler', `${BASE}/projeler/`]])] },
    { path: 'hakkimizda', html: renderHakkimizda(), ld: [orgLd, teamLd] },
    { path: 'iletisim', html: renderIletisim(), ld: [orgLd, faqLd(faqGenel)] },
    ...services.map(s => ({
        path: `hizmetler/${s.id}`, html: renderHizmetlerDetay(s.id),
        ld: [
            serviceLd(s),
            ...(s.faq ? [faqLd(s.faq)] : []),
            breadcrumbLd([['Ana Sayfa', BASE], ['Hizmetler', `${BASE}/hizmetler/`], [s.title, `${BASE}/hizmetler/${s.id}/`]])
        ]
    })),
    ...projects.map(p => ({
        path: `projeler/${p.slug}`, html: renderProjelerDetay(p.slug),
        ogImage: `${BASE}${p.image}`,
        ld: [
            projectLd(p),
            ...(p.video ? [videoLd(p)] : []),
            breadcrumbLd([['Ana Sayfa', BASE], ['Projeler', `${BASE}/projeler/`], [p.title, `${BASE}/projeler/${p.slug}/`]])
        ]
    }))
]

const shell = readFileSync(join(dist, 'index.html'), 'utf-8')

for (const r of routes) {
    const m = metaFor('/' + r.path)
    let page = shell
    page = page.replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`)
    page = page.replace(/(<meta name="description" content=")[^"]*(")/, `$1${m.description}$2`)
    page = page.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${m.title}$2`)
    page = page.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${m.description}$2`)
    page = page.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${m.canonical}$2`)
    page = page.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${m.title}$2`)
    page = page.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${m.description}$2`)
    if (r.ogImage) {
        page = page.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${r.ogImage}$2`)
        page = page.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${r.ogImage}$2`)
        page = page.replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${m.title}$2`)
    }

    const ldTags = r.ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')
    const altLinks = `<link rel="alternate" hreflang="tr" href="${m.canonical}" />\n<link rel="alternate" hreflang="x-default" href="${m.canonical}" />`
    page = page.replace('</head>', `<link rel="canonical" href="${m.canonical}" />\n${altLinks}\n${ldTags}\n</head>`)
    page = page.replace('<main id="app"></main>', `<main id="app">${r.html}</main>`)

    const out = r.path ? join(dist, r.path, 'index.html') : join(dist, 'index.html')
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, page)
    console.log('prerender:', '/' + r.path)
}

// sitemap.xml — canlı sunucunun nihai (sondaki eğik çizgili) URL biçimiyle,
// proje sayfalarında görsel arama için image: girdileriyle
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes.map(r => {
    const loc = r.path ? `${BASE}/${r.path}/` : `${BASE}/`
    const img = r.ogImage ? `<image:image><image:loc>${r.ogImage}</image:loc></image:image>` : ''
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod>${img}</url>`
}).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log('sitemap.xml:', routes.length, 'url')

// 404.html — CF Pages bunu bilinmeyen yollar için 404 statüsüyle servis eder;
// yoksa her yanlış URL 200 dönüp "soft 404" olarak indekslenmeye çalışır.
let p404 = shell
p404 = p404.replace(/<title>[^<]*<\/title>/, '<title>Sayfa bulunamadı — yaptir.io</title>')
p404 = p404.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex$2')
p404 = p404.replace('<main id="app"></main>', `<main id="app">
    <section class="section page-hero"><div class="container">
        <span class="eyebrow eyebrow--accent">404</span>
        <h1 class="section-title">Sayfa bulunamadı<span class="dot">.</span></h1>
        <p class="section-lede">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
        <p style="margin-top:32px"><a href="/" class="btn btn--primary">Ana Sayfaya Dön</a></p>
    </div></section>
</main>`)
writeFileSync(join(dist, '404.html'), p404)
console.log('404.html yazıldı')

// llms-full.txt — AI asistanları için tam içerik dökümü (data.js'ten üretilir,
// siteyle asla çelişmez)
const llmsFull = `# yaptir.io — tam içerik

> KOBİ'ler için yapay zeka otomasyonu, chatbot ve özel yazılım çözümleri üreten İstanbul merkezli teknoloji stüdyosu. Marka adı Türkçe "yaptır" fiilinden gelir: yazılım yaptırmak, chatbot yaptırmak, otomasyon yaptırmak isteyen işletmeler için tek adres.

## Ekip

${team.map(m => `- ${m.name} — ${m.role}`).join('\n')}

## Hizmetler

${services.map(s => `### ${s.title} (${BASE}/hizmetler/${s.id}/)

${s.long}

Kapsam:
${s.bullets.map(b => `- ${b}`).join('\n')}

Beklenen sonuçlar: ${s.results.map(([v, l]) => `${l}: ${v}`).join(' · ')}
${s.faq ? `\nSık sorulanlar:\n${s.faq.map(([q, a]) => `- S: ${q}\n  C: ${a}`).join('\n')}` : ''}`).join('\n\n')}

## Projeler

${projects.map(p => `### ${p.title} (${BASE}/projeler/${p.slug}/)

${p.short}
Müşteri: ${p.client} · Süre: ${p.duration} · Yıl: ${p.year}${p.url ? `\nCanlı: ${p.url}` : ''}`).join('\n\n')}

## Çalışma süreci

${surec.map(s => `${s.num}. ${s.title}: ${s.text}`).join('\n')}

## Genel sık sorulanlar

${faqGenel.map(([q, a]) => `- S: ${q}\n  C: ${a}`).join('\n')}

## İletişim

- E-posta: ${contact.email}
- Adres: ${contact.address}
- Teklif formu: ${BASE}/iletisim/ (24 saat içinde dönüş, ilk görüşme ücretsiz)
`
writeFileSync(join(dist, 'llms-full.txt'), llmsFull)
console.log('llms-full.txt yazıldı')
