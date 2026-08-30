import { industries, services, sektorSeo } from '../data.js'
import { icon } from '../utils/icons.js'

export function renderSektorler() {
    return `
    <section class="section page-hero sector-section">
        <div class="sector-section-glow" aria-hidden="true"></div>
        <div class="container">
            <span class="eyebrow eyebrow--accent">Sektörler</span>
            <h1 class="section-title">Sektörünüze özel<br>çözümler.</h1>
            <p class="section-lede">Genel geçer paket değil — her sektörün kendi akışına göre kurulan yazılım, otomasyon ve chatbot çözümleri.</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <div class="sektor-grid">
                ${industries.map(ind => `
                    <a class="sektor-card reveal" href="/sektorler/${ind.slug}">
                        <span class="sektor-card-emoji">${ind.emoji}</span>
                        <h3>${ind.name}</h3>
                        <p>${sektorSeo[ind.slug]?.intro || ind.headline}</p>
                        <span class="link-arrow">Çözümleri incele ${icon('arrow')}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    </section>
    `
}

export function renderSektorlerDetay(slug) {
    const ind = industries.find(x => x.slug === slug)
    if (!ind) {
        return `
        <section class="section page-hero">
            <div class="container">
                <h1 class="section-title">Sektör bulunamadı.</h1>
                <a href="/sektorler" class="link-arrow">Tüm sektörler ${icon('arrow')}</a>
            </div>
        </section>`
    }

    const meta = sektorSeo[slug] || {}
    const relatedServices = ind.services
        .map(id => services.find(s => s.id === id))
        .filter(Boolean)
    const others = industries.filter(x => x.slug !== slug)

    return `
    <section class="section page-hero page-hero-grid">
        <div class="intro-grid-pattern" aria-hidden="true"></div>
        <div class="container">
            <a href="/sektorler" class="link-arrow svc-detail-back">${icon('arrow')} Tüm Sektörler</a>
            <span class="sektor-detail-emoji">${ind.emoji}</span>
            <span class="eyebrow">Sektör Çözümleri</span>
            <h1 class="section-title">${ind.name}<span class="dot">.</span></h1>
            <p class="section-lede">${ind.headline}</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container svc-detail-grid">
            <div class="svc-detail-copy reveal">
                <p class="sektor-intro">${meta.intro || ''}</p>

                <h3 class="svc-detail-subhead">Neler Kuruyoruz</h3>
                <div class="svc-detail-checklist">
                    ${ind.screens.map(sc => `<div class="svc-check-row"><span class="svc-check-icon">${icon('check')}</span>${sc.note}</div>`).join('')}
                </div>

                <h3 class="svc-detail-subhead">Diğer Sektörler</h3>
                <div class="service-tags service-tags--links">
                    ${others.map(o => `<a href="/sektorler/${o.slug}">${o.emoji} ${o.name}</a>`).join('')}
                </div>
            </div>

            <div class="svc-detail-side reveal">
                <div class="svc-results-card">
                    <h3 class="svc-detail-subhead">İlgili Hizmetler</h3>
                    ${relatedServices.map(s => `
                        <a class="sektor-svc-row" href="/hizmetler/${s.id}">
                            <strong>${s.title}</strong>
                            <span>${s.short}</span>
                        </a>
                    `).join('')}
                    <a href="/iletisim" class="btn btn--primary" style="width:100%">Bu Sektör İçin Teklif Al ${icon('arrow')}</a>
                </div>
            </div>
        </div>
    </section>
    `
}
