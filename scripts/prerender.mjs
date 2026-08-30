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
const { services, projects, contact, faqGenel } = await import('../src/data.js')

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
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: ['https://muuspro.tr', 'https://retrolokal.com']
}

function serviceLd(s) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.title,
        description: s.seo?.desc || s.long,
        provider: { '@type': 'Organization', name: 'yaptir.io', url: BASE },
        url: `${BASE}/hizmetler/${s.id}`,
        areaServed: 'TR',
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${BASE}/iletisim` }
    }
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
    { path: 'hizmetler', html: renderHizmetler(), ld: [breadcrumbLd([['Ana Sayfa', BASE], ['Hizmetler', `${BASE}/hizmetler`]])] },
    { path: 'projeler', html: renderProjeler(), ld: [breadcrumbLd([['Ana Sayfa', BASE], ['Projeler', `${BASE}/projeler`]])] },
    { path: 'hakkimizda', html: renderHakkimizda(), ld: [orgLd] },
    { path: 'iletisim', html: renderIletisim(), ld: [orgLd, faqLd(faqGenel)] },
    ...services.map(s => ({
        path: `hizmetler/${s.id}`, html: renderHizmetlerDetay(s.id),
        ld: [
            serviceLd(s),
            ...(s.faq ? [faqLd(s.faq)] : []),
            breadcrumbLd([['Ana Sayfa', BASE], ['Hizmetler', `${BASE}/hizmetler`], [s.title, `${BASE}/hizmetler/${s.id}`]])
        ]
    })),
    ...projects.map(p => ({
        path: `projeler/${p.slug}`, html: renderProjelerDetay(p.slug),
        ld: [breadcrumbLd([['Ana Sayfa', BASE], ['Projeler', `${BASE}/projeler`], [p.title, `${BASE}/projeler/${p.slug}`]])]
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

    const ldTags = r.ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')
    page = page.replace('</head>', `<link rel="canonical" href="${m.canonical}" />\n${ldTags}\n</head>`)
    page = page.replace('<main id="app"></main>', `<main id="app">${r.html}</main>`)

    const out = r.path ? join(dist, r.path, 'index.html') : join(dist, 'index.html')
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, page)
    console.log('prerender:', '/' + r.path)
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${BASE}/${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n').replace(new RegExp(`${BASE}/</loc>`, 'g'), `${BASE}/</loc>`)}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log('sitemap.xml:', routes.length, 'url')
