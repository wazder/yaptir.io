import { projects } from '../data.js'
import { icon } from '../utils/icons.js'

export function renderProjelerDetay(slug) {
    const p = projects.find(x => x.slug === slug)
    if (!p) {
        return `
        <section class="section page-hero">
            <div class="container">
                <h1 class="section-title">Proje bulunamadı.</h1>
                <a href="/projeler" class="link-arrow">Projelere dön ${icon('arrow')}</a>
            </div>
        </section>`
    }

    return `
    <section class="section page-hero" style="position:relative;overflow:hidden">
        <span class="intro-watermark project-detail-watermark">${p.letter}</span>
        <div class="container">
            <div class="project-detail-head">
                <a href="/projeler" class="link-arrow">${icon('arrow')} Tüm Projeler</a>
                <span class="project-tag">${p.tag}</span>
            </div>
            <h1 class="section-title">${p.title}<span class="dot">.</span></h1>
            <div class="project-detail-meta">
                <span><strong>Müşteri:</strong> ${p.client}</span>
                <span><strong>Süre:</strong> ${p.duration}</span>
                <span><strong>Yıl:</strong> ${p.year}</span>
                ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener" class="link-arrow">Canlı siteyi gör ${icon('arrow')}</a>` : ''}
            </div>
        </div>
    </section>

    ${p.video || p.image ? `
    <section class="section section--tight" style="padding-bottom:0">
        <div class="container">
            <div class="project-detail-shot reveal">
                ${p.video
                    ? `<video src="${p.video}" poster="${p.image || ''}" width="1600" height="800" autoplay muted loop playsinline></video>`
                    : `<img src="${p.image}" alt="${p.title} ekran görüntüsü" width="1600" height="800" />`}
            </div>
        </div>
    </section>` : ''}

    <section class="section section--tight">
        <div class="container">
            <div class="project-detail-grid">
                <div class="reveal">
                    <span class="eyebrow">Problem</span>
                    <p>${p.problem}</p>
                </div>
                <div class="reveal">
                    <span class="eyebrow eyebrow--accent">Çözüm</span>
                    <p>${p.solution}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <h2 class="section-title" style="font-size:28px;margin-bottom:32px">Sonuçlar</h2>
            <div class="project-detail-results">
                ${p.metrics.map(([label, value]) => `
                    <div class="project-detail-result">
                        <div class="project-detail-result-val">${value}</div>
                        <div class="project-detail-result-label">${label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `
}
