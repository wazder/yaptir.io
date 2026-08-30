import { services } from '../data.js'
import { icon } from '../utils/icons.js'

export function renderHizmetlerDetay(slug) {
    const s = services.find(x => x.id === slug)
    if (!s) {
        return `
        <section class="section page-hero">
            <div class="container">
                <h1 class="section-title">Hizmet bulunamadı.</h1>
                <a href="/hizmetler" class="link-arrow">Hizmetlere dön ${icon('arrow')}</a>
            </div>
        </section>`
    }

    return `
    <section class="section page-hero page-hero-grid">
        <div class="intro-grid-pattern" aria-hidden="true"></div>
        <div class="container">
            <a href="/hizmetler" class="link-arrow svc-detail-back">${icon('arrow')} Tüm Hizmetler</a>
            <div class="service-icon svc-detail-icon">${icon(s.icon)}</div>
            <span class="eyebrow">${s.num}</span>
            <h1 class="section-title">${s.title}<span class="dot">.</span></h1>
            <p class="section-lede">${s.long}</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container svc-detail-grid">
            <div class="svc-detail-copy reveal">
                <div class="svc-detail-checklist">
                    ${s.bullets.map(b => `<div class="svc-check-row"><span class="svc-check-icon">${icon('check')}</span>${b}</div>`).join('')}
                </div>

                <h3 class="svc-detail-subhead">Teknoloji Stack</h3>
                <div class="service-tags">
                    ${s.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>

            <div class="svc-detail-side reveal">
                <div class="svc-results-card">
                    <h3 class="svc-detail-subhead">Beklenen Sonuçlar</h3>
                    ${s.results.map(([val, label]) => `
                        <div class="svc-result-row">
                            <div class="svc-result-val">${val}</div>
                            <div class="svc-result-label">${label}</div>
                        </div>
                    `).join('')}
                    <a href="/iletisim" class="btn btn--primary" style="width:100%">Bu Hizmet İçin Teklif Al ${icon('arrow')}</a>
                </div>
            </div>
        </div>
    </section>
    `
}
