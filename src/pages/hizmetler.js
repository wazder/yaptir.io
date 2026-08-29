import { services } from '../data.js'
import { icon } from '../utils/icons.js'
import { serviceVisualHTML } from '../components/serviceVisuals.js'

export function renderHizmetler() {
    return `
    <section class="section" style="padding-top:160px">
        <div class="container">
            <span class="eyebrow">Hizmetlerimiz</span>
            <h1 class="section-title">Uçtan uca<br>çözümler.</h1>
            <p class="section-lede">Yapay zeka ve modern yazılım teknolojileriyle işletmenizin her ihtiyacına özel çözümler sunuyoruz.</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <div class="service-grid">
                ${services.map(s => `
                    <div class="service-card reveal" data-service-card="${s.id}" tabindex="0" role="button">
                        <span class="service-num">${s.num}</span>
                        ${serviceVisualHTML(s.id) || `<div class="service-icon">${icon(s.icon)}</div>`}
                        <h3>${s.title}</h3>
                        <p>${s.long}</p>
                        <div class="service-tags">
                            ${s.tags.map(t => `<span>${t}</span>`).join('')}
                        </div>
                        <span class="service-detail-link">Detaylar ${icon('arrow')}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `
}
