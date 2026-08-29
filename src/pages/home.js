import { referanslar, services, testimonials } from '../data.js'
import { icon } from '../utils/icons.js'
import { marqueeHTML } from '../components/marquee.js'
import { initHeroField } from '../components/heroField.js'
import { industryPickerHTML, initIndustryPicker } from '../components/industryScenario.js'
import { initTypewriterPlaceholder } from '../components/typewriterPlaceholder.js'

export function renderHome() {
    return `
    <section class="hero">
        <div class="hero-field" data-hero-field aria-hidden="true">
            <span class="hero-blob hero-blob--accent"></span>
            <span class="hero-blob hero-blob--primary"></span>
        </div>
        <h1>Bugün senin için<br><span class="accent">ne yaptırıyoruz?</span></h1>

        <form class="ai-input" data-hero-ai>
            <input type="text" placeholder="Bir şey sor veya yaptırmak istediğini yaz..." data-hero-ai-input />
            <button type="submit" aria-label="Gönder">${icon('send')}</button>
        </form>

        <div class="chip-row">
            <button class="chip" data-hero-chip="hizmetler">Hizmetleriniz neler?</button>
            <button class="chip" data-hero-chip="projeler">Projelerinizi incele</button>
            <button class="chip" data-hero-chip="iletisim">Teklif almak istiyorum</button>
        </div>
    </section>

    <section class="intro-section reveal">
        <span class="intro-watermark">AI</span>
        <div class="intro-grid-pattern" aria-hidden="true"></div>
        <div class="container intro-grid">
            <div class="intro-copy">
                <h2>İşinizi <span class="swash-underline gradient-orange">dönüştüren</span><br>teknoloji<span class="intro-dot">.</span></h2>
                <p>Yapay zeka otomasyonları ve özel yazılım çözümleriyle işletmenizin süreçlerini hızlandırın, maliyetleri düşürün ve rekabet avantajı kazanın.</p>
                <div class="cta-btn-row">
                    <a href="#/iletisim" class="btn btn--primary">Projenizi Konuşalım ${icon('arrow')}</a>
                    <a href="#/projeler" class="btn btn--outline">Projelerimiz ↗</a>
                </div>
            </div>
            <div class="intro-stats">
                <div class="stat-item"><div class="stat-num">20<span class="accent">+</span></div><div class="stat-label">Tamamlanan İş</div></div>
                <div class="stat-item"><div class="stat-num">4</div><div class="stat-label">Aktif Proje</div></div>
                <div class="stat-item"><div class="stat-num">3x</div><div class="stat-label">Ortalama Verimlilik Artışı</div></div>
            </div>
        </div>
    </section>

    <div class="marquee-wrap">
        <span class="eyebrow">Güvenilir referanslarımız</span>
        ${marqueeHTML(referanslar)}
    </div>

    <section class="section section--tight sector-section">
        <div class="sector-section-glow" aria-hidden="true"></div>
        <div class="container">
            <span class="eyebrow eyebrow--accent">Her sektöre</span>
            <h2 class="section-title">İşletmeniz hangisi<span class="dot">?</span></h2>
            <p class="section-lede">Seçin, size özel çözümü görün — her sektör için ayrı bir hikayemiz var.</p>
            <div class="reveal">
                ${industryPickerHTML()}
            </div>
        </div>
    </section>

    <section class="section services-section" id="hizmetler">
        <div class="services-section-aurora" aria-hidden="true"></div>
        <div class="container">
            <div class="section-head">
                <div>
                    <span class="eyebrow">Hizmetlerimiz</span>
                    <h2 class="section-title">Ne yapıyoruz<span class="dot">?</span></h2>
                </div>
                <a href="#/hizmetler" class="link-arrow">Tüm hizmetler ${icon('arrow')}</a>
            </div>
            <div class="service-grid service-grid--compact">
                ${services.map(s => `
                    <div class="service-card reveal" data-service-card="${s.id}" tabindex="0" role="button">
                        <span class="service-num">${s.num}</span>
                        <div class="service-icon">${icon(s.icon)}</div>
                        <h3>${s.title}</h3>
                        <p>${s.short}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <span class="eyebrow eyebrow--accent">Müşteri Deneyimi</span>
            <h2 class="section-title">Onlar anlatıyor<span class="dot">.</span></h2>
            <div class="testimonial-grid">
                ${testimonials.map(t => `
                    <figure class="testimonial-card reveal">
                        <blockquote>"${t.quote}"</blockquote>
                        <figcaption>
                            <span class="testimonial-avatar">${t.initial}</span>
                            <span>
                                <strong>${t.who}</strong>
                                <small>${t.role}</small>
                            </span>
                        </figcaption>
                    </figure>
                `).join('')}
                <a class="testimonial-card testimonial-card--cta reveal" href="#/projeler">
                    <span class="testimonial-cta-num">5</span>
                    <span class="testimonial-cta-text">tamamlanmış projeyi ekran görüntüleri ve sonuçlarıyla inceleyin</span>
                    <span class="link-arrow">Projelere git ${icon('arrow')}</span>
                </a>
            </div>
        </div>
    </section>

    <section class="cta-band reveal">
        <div class="container">
            <div>
                <h2>Projenizi bugün konuşmaya başlayalım.</h2>
                <p>Sektörünüze özel çözümü birlikte tasarlayalım — teklif almak 5 dakikanızı alır.</p>
            </div>
            <a href="#/iletisim" class="btn" style="background:#fff;color:var(--primary)">Teklif Al ${icon('arrow')}</a>
        </div>
    </section>
    `
}

const CHIP_TEXT = {
    hizmetler: 'Hizmetleriniz neler?',
    projeler: 'Projelerinizi incele',
    iletisim: 'Teklif almak istiyorum'
}

export function initHome(root = document) {
    initHeroField(root.querySelector('[data-hero-field]'))
    initIndustryPicker(root)

    const form = root.querySelector('[data-hero-ai]')
    const input = root.querySelector('[data-hero-ai-input]')
    initTypewriterPlaceholder(input)

    form?.addEventListener('submit', (e) => {
        e.preventDefault()
        const text = input.value.trim()
        if (!text) return
        input.value = ''
        window.__yaptirChat?.ask(text)
    })

    root.querySelectorAll('[data-hero-chip]').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.heroChip
            const text = key === 'iletisim' && btn.textContent.includes('İletişime')
                ? 'İletişime geç'
                : (CHIP_TEXT[key] || btn.textContent.trim())
            window.__yaptirChat?.ask(text)
        })
    })
}
