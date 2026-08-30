import { projects } from '../data.js'
import { projectRowHTML } from '../components/projectRow.js'

export function renderProjeler() {
    return `
    <section class="section page-hero sector-section">
        <div class="sector-section-glow" aria-hidden="true"></div>
        <div class="container">
            <span class="eyebrow eyebrow--accent">Portföy</span>
            <h1 class="section-title">Başarı<br>hikayeleri.</h1>
            <p class="section-lede">Farklı sektörlerde hayata geçirdiğimiz projelerden seçmeler.</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <div class="project-grid">
                ${projects.map(p => projectRowHTML(p)).join('')}
            </div>
        </div>
    </section>
    `
}
