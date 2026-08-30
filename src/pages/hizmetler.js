import { services } from '../data.js'
import { icon } from '../utils/icons.js'

export function renderHizmetler() {
    return `
    <section class="section page-hero page-hero-grid">
        <div class="intro-grid-pattern" aria-hidden="true"></div>
        <div class="container">
            <span class="eyebrow">Hizmetlerimiz</span>
            <h1 class="section-title">Uçtan uca<br>çözümler.</h1>
            <p class="section-lede">Yapay zeka ve modern yazılım teknolojileriyle işletmenizin her ihtiyacına özel çözümler sunuyoruz.</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <div class="service-list">
                ${services.map(s => `
                    <a class="service-row reveal" href="/hizmetler/${s.id}">
                        <span class="service-row-num">${s.num}</span>
                        <div class="service-icon service-row-icon">${icon(s.icon)}</div>
                        <h3 class="service-row-title">${s.title}</h3>
                        <div class="service-row-body">
                            <p>${s.long}</p>
                            <div class="service-tags">
                                ${s.tags.map(t => `<span>${t}</span>`).join('')}
                            </div>
                        </div>
                        <span class="service-row-link">Detaylar ${icon('arrow')}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    </section>
    `
}
