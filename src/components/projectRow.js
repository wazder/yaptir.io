import { icon } from '../utils/icons.js'

export function projectRowHTML(p, { withMetrics = true } = {}) {
    return `
    <div class="project-row reveal">
        <div class="project-thumb">${p.letter}</div>
        <div>
            <span class="project-tag">${p.tag}</span>
            <span class="project-year">${p.year}</span>
            <h3>${p.title}</h3>
            <p>${p.short}</p>
            ${withMetrics ? `
                <div class="project-metrics">
                    ${p.metrics.map(([label, value]) => `
                        <div><strong>${value}</strong>${label}</div>
                    `).join('')}
                </div>
            ` : `<a href="#/iletisim" class="service-detail-link">Detayları gör ${icon('arrow')}</a>`}
        </div>
    </div>`
}
