import { team, process, stack } from '../data.js'
import { icon } from '../utils/icons.js'

export function renderHakkimizda() {
    return `
    <section class="section page-hero services-section">
        <div class="services-section-aurora" aria-hidden="true"></div>
        <div class="container">
            <span class="eyebrow">Hakkımızda</span>
            <h1 class="section-title">Teknolojiyle<br>değer yaratırız.</h1>
            <p class="section-lede">Yapay zeka ve yazılım dünyasında uzmanlaşmış ekibimiz, her projeye iş ortağı gözüyle yaklaşır.</p>

            <div class="stat-band">
                <div class="stat-row">
                    <div><div class="stat-num">20+</div><div class="stat-label">Tamamlanan İş</div></div>
                    <div><div class="stat-num">4</div><div class="stat-label">Aktif Proje</div></div>
                    <div><div class="stat-num">3x</div><div class="stat-label">Ortalama Verimlilik Artışı</div></div>
                </div>
            </div>

            <div class="about-lede-grid">
                <h2 class="about-lede-title">Amacımız sadece kod yazmak değil, işinizi gerçekten anlayarak en doğru çözümü üretmek.</h2>
                <div class="about-lede-body">
                    <p>Kurulduğumuz günden bu yana finans, sağlık, lojistik ve perakende sektörlerinde onlarca şirkete dijital dönüşüm yolculuklarında eşlik ettik.</p>
                    <p>Her projede aynı ilkeyi takip ediyoruz: önce dinle, sonra anla, en son çöz. Bu yaklaşım bizi sadece bir teknoloji sağlayıcısı değil, güvenilir bir iş ortağı yapıyor.</p>
                    <p>Ekibimiz yapay zeka mühendisleri, full-stack geliştiriciler, veri bilimciler, UX tasarımcılar ve proje yöneticilerinden oluşuyor. Her biri kendi alanında uzman, birlikte çalışmaya tutkulu.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <span class="eyebrow eyebrow--accent">Ekibimiz</span>
            <h2 class="section-title">Arkasındaki isimler<span class="dot">.</span></h2>
            <div class="team-grid">
                ${team.map(m => `
                    <div class="team-card reveal">
                        <div class="team-avatar">${m.initials}</div>
                        <h4>${m.name}</h4>
                        <span>${m.role}</span>
                        ${m.linkedin ? `<a class="team-card-social" href="${m.linkedin}" target="_blank" rel="noopener" aria-label="${m.name} LinkedIn">${icon('linkedin')}</a>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <span class="eyebrow">Sürecimiz</span>
            <h2 class="section-title">Nasıl çalışırız<span class="dot">?</span></h2>
            <div class="process-grid">
                ${process.map(s => `
                    <div class="process-card reveal">
                        <div class="process-num">${s.num}</div>
                        <h4>${s.title}</h4>
                        <p>${s.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container">
            <span class="eyebrow eyebrow--accent">Teknolojiler</span>
            <h2 class="section-title">Araç kutumuz<span class="dot">.</span></h2>
            <div class="stack-grid">
                ${stack.map(col => `
                    <div class="stack-col reveal">
                        <h4>${col.title}</h4>
                        <ul>${col.items.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `
}
