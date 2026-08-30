import { icon } from '../utils/icons.js'

/* Rehber sayfaları — arama niyeti "araştırma" aşamasındaki kullanıcıyı
   yakalayan uzun içerik. Şema (Article + FAQPage) prerender'da bu
   dosyadaki verilerden üretilir; içerik ile şema asla ayrışmaz. */

export const REHBER_SSS = [
    ['Yazılım yaptırmak kaç paraya mal olur?', 'Kapsama göre çok değişir: küçük bir otomasyon veya chatbot işi on binlerce lira seviyesinde başlar, kapsamlı bir web/mobil ürün yüz binlerce liraya uzanabilir. Sabit fiyatlı teklif isteyin — proje ortasında sürpriz maliyet çıkmamalı.'],
    ['Yazılım yaptırmak ne kadar sürer?', 'Chatbot ve otomasyon işleri genellikle 1–3 hafta, özel yazılım projeleri ortalama 4–8 hafta sürer. Her hafta çalışan bir demo görmüyorsanız süreç kara kutuya dönmüş demektir.'],
    ['Fikrimi anlatınca çalınmasından korkuyorum, ne yapmalıyım?', 'İlk görüşmeden önce gizlilik sözleşmesi (NDA) isteyebilirsiniz; ciddi hiçbir ajans buna itiraz etmez. Ayrıca fikirden çok uygulama kıymetlidir — asıl koruma, hızlı hayata geçirmektir.'],
    ['Freelance yazılımcı mı, ajans mı tercih etmeliyim?', 'Küçük ve tek seferlik işlerde freelance daha ekonomik olabilir; sürekli yaşayacak, bakım ve büyüme isteyen bir üründe tasarım + geliştirme + destek disiplinini tek çatıda tutan bir ekip daha güvenlidir.'],
    ['Yazılım teslim edildikten sonra bakım şart mı?', 'Yazılım canlıya çıktığı gün bitmez: bağlandığı platformlar API değiştirir, güvenlik güncellemeleri gelir, işiniz büyüdükçe yeni ihtiyaç doğar. Aylık küçük bir bakım planı, bozulan bir entegrasyonun kaybettireceğinden her zaman ucuzdur.']
]

export const REHBERLER = {
    'yazilim-yaptirma': {
        title: 'Yazılım Yaptırma Rehberi',
        desc: 'Yazılım yaptırmak isteyen işletme sahipleri için dürüst rehber: fiyatı ne belirler, teklif nasıl değerlendirilir, kaynak kod kimde kalmalı, süreç nasıl işler ve en sık yapılan hatalar.'
    }
}

export function renderRehber(slug) {
    const r = REHBERLER[slug]
    if (!r) {
        return `
        <section class="section page-hero">
            <div class="container">
                <h1 class="section-title">Rehber bulunamadı.</h1>
                <a href="/" class="link-arrow">Ana sayfa ${icon('arrow')}</a>
            </div>
        </section>`
    }

    return `
    <section class="section page-hero page-hero-grid">
        <div class="intro-grid-pattern" aria-hidden="true"></div>
        <div class="container">
            <span class="eyebrow eyebrow--accent">Rehber</span>
            <h1 class="section-title">Yazılım yaptırma<br>rehberi.</h1>
            <p class="section-lede">İlk kez yazılım yaptıracak bir işletme sahibinin bilmesi gereken her şey — satış konuşması değil, dürüst bir yol haritası.</p>
        </div>
    </section>

    <section class="section section--tight">
        <div class="container rehber-content">
            <h2>1. Önce ihtiyacını netleştir</h2>
            <p>"Bir uygulama istiyorum" ile başlayan projeler en pahalı projelerdir. Teklif almadan önce tek bir soruya cevap verin: <strong>hangi işiniz şu an elle yürüyor ve size en çok zaman/para kaybettiriyor?</strong> Cevabınız "siparişleri üç panelden takip ediyorum" veya "randevuları telefonla alıyorum" gibi somutsa, doğru yoldasınız. Kapsamı siz netleştirdikçe fiyat düşer — belirsizliğin bedelini her zaman müşteri öder.</p>

            <h2>2. Hazır paket mi, özel yazılım mı?</h2>
            <p>Bu sorunun dürüst cevabı "duruma göre"dir. Süreçleriniz sektör ortalamasına uyuyorsa hazır paket daha hızlı ve ucuzdur. Özel yazılımı haklı çıkaran üç durum var: süreçleriniz size özgüyse (hazır paket sizi kendine uydurmaya zorlar), aylık kullanıcı başı aidatlar büyüdükçe kiraya dönüşüyorsa, ve yazılımın kendisi rekabet avantajınızsa. Çoğu işletme için doğru cevap karmadır: hazır araçları özel entegrasyonlarla birbirine bağlamak.</p>

            <h2>3. Fiyatı ne belirler?</h2>
            <div class="svc-detail-checklist">
                <div class="svc-check-row"><span class="svc-check-icon">${icon('check')}</span><span><strong>Ekran ve süreç sayısı</strong> — her ekran tasarım + geliştirme + test demektir.</span></div>
                <div class="svc-check-row"><span class="svc-check-icon">${icon('check')}</span><span><strong>Entegrasyonlar</strong> — Trendyol, muhasebe, kargo, ödeme… her bağlantı ayrı iştir.</span></div>
                <div class="svc-check-row"><span class="svc-check-icon">${icon('check')}</span><span><strong>Teslim süresi</strong> — "iki haftaya lazım" her zaman daha pahalıdır.</span></div>
                <div class="svc-check-row"><span class="svc-check-icon">${icon('check')}</span><span><strong>Bakım kapsamı</strong> — teslimden sonrası fiyata dahil mi, ayrı mı?</span></div>
            </div>
            <p>Türkiye'de küçük bir otomasyon/chatbot işi on binlerce lira seviyesinden başlar; kapsamlı bir web veya mobil ürün yüz binlerce liraya uzanır. Rakamdan daha önemlisi <strong>fiyatın sabit olması</strong>: saatlik ücretle açık uçlu ilerleyen projelerde bütçe kontrolü sizde değildir.</p>

            <h2>4. Teklifi değerlendirirken sorulacak 5 soru</h2>
            <ol>
                <li><strong>Kaynak kod kime ait olacak?</strong> Doğru cevap: %100 size. Kod ajansta kalırsa ömür boyu ona bağımlısınız.</li>
                <li><strong>İlerlemeyi nasıl göreceğim?</strong> Doğru cevap: her hafta çalışan bir demo. "Bitince göstereceğiz" bir uyarı işaretidir.</li>
                <li><strong>Projeyi fiilen kim geliştirecek?</strong> Satış toplantısına gelen ekiple işi yapan ekip aynı mı?</li>
                <li><strong>Teslimden sonra ne oluyor?</strong> Bakım, hata düzeltme ve yeni özellik koşulları baştan yazılı olmalı.</li>
                <li><strong>Benzer bir işi daha önce yaptınız mı?</strong> Ekran görüntüsü ve canlı adres isteyin — anlatılan değil, gösterilen referans sayılır.</li>
            </ol>

            <h2>5. Süreç nasıl işler?</h2>
            <p>Sağlıklı bir proje kabaca şu sırayla ilerler: <strong>keşif</strong> (süreçleriniz dinlenir, kapsam yazılır) → <strong>tasarım</strong> (ekranlar onayınıza sunulur) → <strong>haftalık sprintlerle geliştirme</strong> (her hafta demo) → <strong>test</strong> → <strong>canlıya geçiş ve eğitim</strong> → <strong>bakım</strong>. Keşif adımı atlanan projelerde yazılım biter ama işinize uymaz — en pahalı hata budur.</p>

            <h2>6. En sık yapılan 4 hata</h2>
            <ol>
                <li><strong>Her şeyi tek seferde istemek.</strong> İlk sürüm, en çok kanayan tek problemi çözmeli; gerisi çalışan ürünün üstüne eklenir.</li>
                <li><strong>En ucuz teklifi seçmek.</strong> Yarım kalan projeyi ikinci bir ekibe tamamlatmak, baştan doğru yapmaktan neredeyse her zaman pahalıdır.</li>
                <li><strong>Sözleşmesiz başlamak.</strong> Kapsam, fiyat, süre ve kaynak kod sahipliği yazılı olmadan iş başlamamalı.</li>
                <li><strong>Bakımı bütçelememek.</strong> Canlıdaki yazılım yaşayan bir şeydir; "bitti" diye bırakılan sistemler bir yıl içinde bozulur.</li>
            </ol>

            <h2>Sık sorulan sorular</h2>
            <div class="faq-list faq-list--wide">
                ${REHBER_SSS.map(([q, a]) => `
                    <details class="faq-item">
                        <summary>${q}<span class="faq-chevron">${icon('arrow')}</span></summary>
                        <p>${a}</p>
                    </details>
                `).join('')}
            </div>

            <div class="rehber-cta">
                <p>Aklınızdaki işi konuşmak isterseniz ilk görüşme ücretsiz — 24 saat içinde dönüş yapıyoruz.</p>
                <a href="/iletisim" class="btn btn--primary">Teklif Al ${icon('arrow')}</a>
            </div>
        </div>
    </section>
    `
}
