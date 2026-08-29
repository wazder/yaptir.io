import { contact, services } from '../data.js'
import { icon } from '../utils/icons.js'

export function renderIletisim() {
    return `
    <section class="section" style="padding-top:160px">
        <div class="container">
            <span class="eyebrow eyebrow--accent">İletişim</span>
            <h1 class="section-title">Konuşalım<span class="dot">.</span></h1>
            <p class="section-lede">Projeniz hakkında bilgi almak veya iş birliği fırsatlarını değerlendirmek için bize ulaşın.</p>

            <div class="contact-grid" style="margin-top:56px">
                <div>
                    <div class="contact-info">
                        <div class="contact-info-item">
                            <span class="icon">${icon('mail')}</span>
                            <div><h4>E-posta</h4><p>${contact.email}</p></div>
                        </div>
                        <div class="contact-info-item">
                            <span class="icon">${icon('pin')}</span>
                            <div><h4>Adres</h4><p>${contact.address}</p></div>
                        </div>
                        <div class="contact-info-item">
                            <span class="icon">${icon('clock')}</span>
                            <div><h4>Çalışma Saatleri</h4><p>${contact.hours}</p></div>
                        </div>
                    </div>
                    <div class="map-embed">
                        <iframe
                            src="https://www.openstreetmap.org/export/embed.html?bbox=28.9752%2C41.0270%2C28.9900%2C41.0365&layer=mapnik&marker=41.03175%2C28.98262"
                            title="yaptir.io ofis konumu — Cihangir, Beyoğlu/İstanbul"
                            loading="lazy"></iframe>
                        <a class="map-embed-link" href="https://www.openstreetmap.org/?mlat=41.03175&mlon=28.98262#map=17/41.03175/28.98262" target="_blank" rel="noopener">
                            ${icon('pin')} Haritada aç
                        </a>
                    </div>
                </div>

                <form class="contact-form" data-contact-form>
                    <h3>Teklif Formu</h3>
                    <p>Alanları doldurun, 24 saat içinde dönüş yapalım.</p>

                    <div class="form-row">
                        <div class="field">
                            <label>Ad Soyad *</label>
                            <input type="text" name="name" placeholder="Adınız Soyadınız" required />
                        </div>
                        <div class="field">
                            <label>Şirket</label>
                            <input type="text" name="company" placeholder="Şirket Adı" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="field">
                            <label>E-posta *</label>
                            <input type="email" name="email" placeholder="email@sirket.com" required />
                        </div>
                        <div class="field">
                            <label>Telefon</label>
                            <input type="tel" name="phone" placeholder="+90 (5XX) XXX XX XX" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="field">
                            <label>İlgilendiğiniz Hizmet</label>
                            <select name="service">
                                <option value="">Seçiniz</option>
                                ${services.map(s => `<option value="${s.title}">${s.title}</option>`).join('')}
                            </select>
                        </div>
                        <div class="field">
                            <label>Tahmini Bütçe</label>
                            <select name="budget">
                                <option value="">Seçiniz</option>
                                <option>50.000 TL altı</option>
                                <option>50.000 - 150.000 TL</option>
                                <option>150.000 - 500.000 TL</option>
                                <option>500.000 TL üzeri</option>
                            </select>
                        </div>
                    </div>

                    <div class="field" style="margin-bottom:8px">
                        <label>Mesajınız *</label>
                        <textarea name="message" placeholder="Projeniz hakkında bize kısaca bilgi verin. Hedefleriniz, zaman çizelgeniz ve beklentileriniz neler?" required></textarea>
                    </div>

                    <button type="submit" class="btn btn--primary" style="width:100%;margin-top:16px">
                        Teklif Talebi Gönder ${icon('arrow')}
                    </button>
                    <p class="form-msg" data-form-msg></p>
                </form>
            </div>
        </div>
    </section>
    `
}
