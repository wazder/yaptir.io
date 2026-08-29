export const referanslar = [
    'Muus Coffee', 'Oyunevi', 'RetroLokal', 'Okeep',
    'PRT Entertainment', 'Ercan Hukuk', 'Seya Mühendislik', 'Loop Casting'
]

/* One dedicated scenario per industry — its own headline, its own demo,
   not the same widget relabelled. Picking a different industry should
   feel like a different product, not a different sticker on the same box. */
export const industries = [
    {
        slug: 'restoran', emoji: '🍽️', name: 'Restoran & Kafe',
        headline: 'Adisyo, Yemeksepeti, Getir Yemek — hepsi birbirine bağlı, hepsi otomatik.',
        app: { brand: 'Masa', domain: 'masa.yaptir.io', navLabels: ['Masalar', 'Menü', 'Mutfak', 'Kasa'] },
        screens: [
            { kind: 'rows', note: 'Masa 4 ödenmemiş, Masa 7 hazırlanıyor — hepsi anlık, elden takip yok.', cfg: { title: 'Masa Takip · Canlı', rows: [
                { icon: '🧾', title: 'Masa 4', meta: '2 kişi · 19dk', val: '190 ₺', label: 'Ödenmemiş', status: 'warn' },
                { icon: '☕', title: 'Masa 7', meta: 'Yeni sipariş', val: '64 ₺', label: 'Hazırlanıyor', status: 'info' },
                { icon: '✅', title: 'Masa 2', meta: '1 kişi · 8dk', val: '112 ₺', label: 'Ödendi', status: 'ok' }
            ] } },
            { kind: 'sync', note: 'Adisyo, Yemeksepeti ve Getir Yemek aynı stoktan besleniyor, hiçbiri şaşmıyor.', cfg: { title: 'Entegrasyon · Sipariş Kanalları', brands: ['Adisyo POS', 'Yemeksepeti', 'Getir Yemek', 'Trendyol Yemek'], status: 'Menü & stok senkronize · 8sn önce' } },
            { kind: 'chat', note: "Rezervasyon isteği WhatsApp'a düşer düşmez bot yanıtlıyor, siz mutfağa bakıyorsunuz.", cfg: { title: 'Rezervasyon Botu · WhatsApp', ask: 'Yarın için masa var mı?', reply: "Evet, 19:00'da 2 kişilik masa ayırdım ✅" } },
            { kind: 'funnel', note: "Reklam bütçeniz rezervasyona dönüşüyor, ROAS'ı canlı görüyorsunuz.", cfg: { title: 'Reklam Paneli · Restoran', rows: [['Gösterim', '8.2K', 100], ['Tıklama', '410', 55], ['Rezervasyon', '62', 22]], roas: '3.6x' } }
        ],
        services: ['ai-otomasyon', 'entegrasyon', 'chatbot', 'sosyal-reklam']
    },
    {
        slug: 'eticaret', emoji: '🛒', name: 'E-ticaret',
        headline: 'Trendyol, Hepsiburada, Shopify — tek panelden, tek stoktan yönetin.',
        app: { brand: 'Vitrin', domain: 'vitrin.yaptir.io', navLabels: ['Siparişler', 'Ürünler', 'Kargo', 'Muhasebe'] },
        screens: [
            { kind: 'rows', note: 'Trendyol, Shopify ve Hepsiburada siparişleri aynı ekranda, tek tek panel açmadan.', cfg: { title: 'Sipariş Takip · Canlı', rows: [
                { icon: '📦', title: '#TR-88213', meta: 'Trendyol · 2 ürün', val: '349 ₺', label: 'Kargoda', status: 'info' },
                { icon: '🛍️', title: '#SHP-4410', meta: 'Shopify · Kapıda ödeme', val: '212 ₺', label: 'Hazırlanıyor', status: 'warn' },
                { icon: '↩️', title: '#HB-2290', meta: 'Hepsiburada · iade talebi', val: '89 ₺', label: 'Onaylandı', status: 'ok' }
            ] } },
            { kind: 'sync', note: 'Shopify, Trendyol ve Hepsiburada stoğu aynı anda güncelleniyor, fazla satış riski sıfır.', cfg: { title: 'Entegrasyon · Satış Kanalları', brands: ['Shopify', 'Trendyol', 'Hepsiburada', 'Paraşüt'], status: 'Stok & fatura senkron · 4sn önce' } },
            { kind: 'funnel', note: 'Meta reklamınızın hangi satışa dönüştüğünü kuruşu kuruşuna görüyorsunuz.', cfg: { title: 'Meta Reklam Paneli', rows: [['Gösterim', '12.4K', 100], ['Tıklama', '840', 62], ['Satış', '96', 24]], roas: '4.2x' } },
            { kind: 'chat', note: 'Kargo sorularını bot cevaplıyor, ekibiniz müşteriyle değil kutuyla uğraşmıyor.', cfg: { title: 'Sipariş Botu · Instagram', ask: 'Kargom nerede?', reply: 'Kargonuz yarın 14:00 civarı elinizde olur 📦' } }
        ],
        services: ['entegrasyon', 'veri-analitik', 'sosyal-reklam']
    },
    {
        slug: 'klinik', emoji: '💆', name: 'Klinik & Güzellik',
        headline: 'Randevu, hatırlatma ve fatura — Google Takvim ile senkron, kendi kendine işler.',
        app: { brand: 'Ajanda', domain: 'ajanda.yaptir.io', navLabels: ['Randevular', 'Hastalar', 'Faturalar', 'Hatırlatma'] },
        screens: [
            { kind: 'chat', note: 'Cumartesi randevu isteği geldiği anda bot yerinizi ayırıyor.', cfg: { title: 'Randevu Botu · Web Sitesi', ask: 'Cumartesi için yer var mı?', reply: "Var! Saat 15:30'a sizi kaydettim ✅" } },
            { kind: 'rows', note: 'Hangi randevu onaylı, hangisi bekliyor — tek bakışta.', cfg: { title: 'Randevu Takip · Canlı', rows: [
                { icon: '📅', title: 'Ayşe K.', meta: 'Cilt bakımı · 14:00', val: '450 ₺', label: 'Onaylı', status: 'ok' },
                { icon: '🔔', title: 'Merve T.', meta: 'Lazer epilasyon · 15:30', val: '600 ₺', label: 'Hatırlatıldı', status: 'info' },
                { icon: '⏳', title: 'Deniz A.', meta: 'Cilt bakımı · 17:00', val: '450 ₺', label: 'Bekliyor', status: 'warn' }
            ] } },
            { kind: 'calendar', note: "Cilt bakımı, lazer epilasyon, masaj — üç hizmet de Google Takvim'le senkron.", cfg: { title: 'Randevu Takvimi · Google Takvim Senkron', days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'],
                channels: [{ label: 'Cilt Bakımı', color: '#e8544a' }, { label: 'Lazer Epilasyon', color: '#3b6fe0' }, { label: 'Masaj', color: '#00a37a' }],
                bookings: [
                    { channel: 0, start: 1, span: 1 }, { channel: 0, start: 3, span: 1 }, { channel: 0, start: 5, span: 2 },
                    { channel: 1, start: 2, span: 1 }, { channel: 1, start: 4, span: 1 }, { channel: 1, start: 7, span: 1 },
                    { channel: 2, start: 1, span: 2 }, { channel: 2, start: 6, span: 1 }
                ] } },
            { kind: 'funnel', note: 'Kampanyanız kaç randevuya dönüştü, canlı takip ediyorsunuz.', cfg: { title: 'Kampanya Paneli · Klinik', rows: [['Gösterim', '6.1K', 100], ['Tıklama', '380', 48], ['Randevu', '54', 18]], roas: '3.1x' } }
        ],
        services: ['chatbot', 'ai-otomasyon', 'sosyal-reklam']
    },
    {
        slug: 'kuafor', emoji: '✂️', name: 'Kuaför & Berber',
        headline: "WhatsApp'tan randevu alın, koltuğunuz hep dolu kalsın.",
        app: { brand: 'Sandalye', domain: 'sandalye.yaptir.io', navLabels: ['Koltuklar', 'Personel', 'Kampanya', 'Yorumlar'] },
        screens: [
            { kind: 'chat', note: 'Yarının koltuğu WhatsApp\'tan doluyor, siz telefona bakmıyorsunuz.', cfg: { title: 'Rezervasyon Botu · WhatsApp', ask: 'Yarın saç kesimi için yer var mı?', reply: "Evet, 14:00'e sizi aldım ✅" } },
            { kind: 'calendar', note: '3 koltuğun da doluluğu aynı ekranda, boş koltuk kalmıyor.', cfg: { title: 'Koltuk Takvimi · 3 Koltuk', days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'],
                channels: [{ label: 'Koltuk 1', color: '#e8544a' }, { label: 'Koltuk 2', color: '#f4551f' }, { label: 'Koltuk 3', color: '#3b6fe0' }],
                bookings: [
                    { channel: 0, start: 1, span: 2 }, { channel: 0, start: 4, span: 1 }, { channel: 0, start: 6, span: 2 },
                    { channel: 1, start: 2, span: 1 }, { channel: 1, start: 3, span: 2 }, { channel: 1, start: 7, span: 1 },
                    { channel: 2, start: 1, span: 1 }, { channel: 2, start: 5, span: 3 }
                ] } },
            { kind: 'flow', note: 'Randevu biter bitmez teşekkür mesajı gidiyor, yorum otomatik isteniyor.', cfg: { title: 'Teşekkür Otomasyonu', icons: ['check', 'bell', 'star'], labels: ['Randevu Bitti', 'Teşekkür Gitti', 'Yorum İstendi'] } },
            { kind: 'funnel', note: 'Reklamdan gelen her tıklama bir randevuya dönüşüyor mu, görüyorsunuz.', cfg: { title: 'Reklam Paneli · Kuaför', rows: [['Gösterim', '4.8K', 100], ['Tıklama', '290', 44], ['Randevu', '38', 16]], roas: '2.9x' } }
        ],
        services: ['chatbot', 'sosyal-reklam']
    },
    {
        slug: 'emlak', emoji: '🏠', name: 'Emlak',
        headline: 'Sahibinden, Hepsiemlak, Emlakjet — tek girişle hepsinde yayında.',
        app: { brand: 'Portföy', domain: 'portfoy.yaptir.io', navLabels: ['Portföy', 'İlanlar', 'Görüşme', 'Sözleşme'] },
        screens: [
            { kind: 'rows', note: 'Sahibinden, Hepsiemlak, Emlakjet — hangi ilan ne durumda, tek ekranda.', cfg: { title: 'Portföy Takip · Canlı', rows: [
                { icon: '🏠', title: 'Suadiye 3+1', meta: 'Sahibinden · 1.240 görüntülenme', val: '4.2M ₺', label: 'Aktif', status: 'ok' },
                { icon: '🏢', title: 'Bostancı 2+1', meta: 'Hepsiemlak · fiyat düştü', val: '2.85M ₺', label: 'Güncellendi', status: 'info' },
                { icon: '📉', title: 'Kadıköy Ofis', meta: 'Emlakjet · 21 gün ilanda', val: '18K ₺/ay', label: 'İlgi Az', status: 'warn' }
            ] } },
            { kind: 'sync', note: 'Bir ilanı güncelleyin, 4 portalda birden yayına girsin.', cfg: { title: 'Entegrasyon · İlan Portalları', brands: ['Sahibinden', 'Hepsiemlak', 'Emlakjet', 'Zingat'], status: 'İlanlar senkronize · 15sn önce' } },
            { kind: 'calendar', note: 'Suadiye, Bostancı, Kadıköy — hangi portföyün gösterimi ne zaman, tek takvimde.', cfg: { title: 'Gösterim Takvimi · Portföy Bazlı', days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'],
                channels: [{ label: 'Suadiye 3+1', color: '#00a650' }, { label: 'Bostancı 2+1', color: '#e6007e' }, { label: 'Kadıköy Ofis', color: '#3b6fe0' }],
                bookings: [
                    { channel: 0, start: 2, span: 1 }, { channel: 0, start: 5, span: 1 },
                    { channel: 1, start: 1, span: 1 }, { channel: 1, start: 4, span: 1 }, { channel: 1, start: 6, span: 1 },
                    { channel: 2, start: 3, span: 1 }
                ] } }
        ],
        services: ['veri-analitik', 'ozel-yazilim']
    },
    {
        slug: 'hukuk', emoji: '⚖️', name: 'Hukuk Bürosu',
        headline: 'UYAP dosya durumunu takip edin, müşteriye otomatik bilgi geçsin.',
        app: { brand: 'Dava', domain: 'dava.yaptir.io', navLabels: ['Dosyalar', 'Duruşma', 'Müşteri', 'Fatura'] },
        screens: [
            { kind: 'rows', note: 'UYAP\'taki dosya durumu otomatik senkron, siz sürekli sorgulamıyorsunuz.', cfg: { title: 'Dosya Takip · UYAP Senkron', rows: [
                { icon: '⚖️', title: '2026/482 E.', meta: 'İstanbul 4. Asliye · 12 Mart', val: '—', label: 'Duruşma Var', status: 'info' },
                { icon: '📄', title: '2026/119 E.', meta: 'Tüketici Mahkemesi', val: '—', label: 'Karar Bekliyor', status: 'warn' },
                { icon: '✅', title: '2025/903 E.', meta: 'İcra Dairesi', val: '—', label: 'Kapandı', status: 'ok' }
            ] } },
            { kind: 'chat', note: "Müşteri 'dosyam ne durumda' diye sorduğunda bot anında cevap veriyor.", cfg: { title: 'Dosya Botu · Müşteri Portalı', ask: 'Dosyam ne durumda?', reply: 'Duruşma tarihiniz 12 Mart olarak belirlendi ✅' } },
            { kind: 'calendar', note: 'Duruşma ve müşteri görüşmeleri aynı takvimde, çakışma riski yok.', cfg: { title: 'Duruşma Takvimi · UYAP Senkron', days: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
                channels: [{ label: 'Duruşma', color: '#e8544a' }, { label: 'Müşteri Görüşmesi', color: '#3b6fe0' }],
                bookings: [
                    { channel: 0, start: 3, span: 1 }, { channel: 0, start: 6, span: 1 }, { channel: 0, start: 9, span: 1 },
                    { channel: 1, start: 1, span: 1 }, { channel: 1, start: 4, span: 2 }, { channel: 1, start: 8, span: 1 }
                ] } },
            { kind: 'flow', note: 'Duruşma planlanınca hatırlatma otomatik gidiyor, takip elden çıkmıyor.', cfg: { title: 'Duruşma Otomasyonu', icons: ['cal', 'bell', 'check'], labels: ['Duruşma Planlandı', 'Hatırlatma Gitti', 'Tamamlandı'] } }
        ],
        services: ['danismanlik', 'ai-otomasyon']
    },
    {
        slug: 'fitness', emoji: '🏋️', name: 'Fitness & Spor Merkezi',
        headline: 'Üyelik, paket ve ders programını otomatikleştirin.',
        app: { brand: 'Salon', domain: 'salon.yaptir.io', navLabels: ['Üyelikler', 'Dersler', 'Antrenör', 'Ödemeler'] },
        screens: [
            { kind: 'rows', note: 'Kimin üyeliği bitiyor, kim ödeme yapmadı — anlık liste.', cfg: { title: 'Üyelik Takip · Canlı', rows: [
                { icon: '💳', title: 'Kerem Y.', meta: 'Yıllık paket', val: '2.400 ₺', label: 'Ödendi', status: 'ok' },
                { icon: '⏳', title: 'Selin B.', meta: 'Aylık paket · 3 gün kaldı', val: '350 ₺', label: 'Yenilenecek', status: 'warn' },
                { icon: '🔔', title: 'Onur T.', meta: 'Aylık paket', val: '350 ₺', label: 'Hatırlatıldı', status: 'info' }
            ] } },
            { kind: 'calendar', note: 'Pilates, yoga, crossfit — üç salonun doluluğu aynı ekranda.', cfg: { title: 'Ders Programı · Salon Doluluk', days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'],
                channels: [{ label: 'Pilates', color: '#e8544a' }, { label: 'Yoga', color: '#3b6fe0' }, { label: 'Crossfit', color: '#f4551f' }],
                bookings: [
                    { channel: 0, start: 1, span: 1 }, { channel: 0, start: 3, span: 1 }, { channel: 0, start: 5, span: 1 },
                    { channel: 1, start: 2, span: 1 }, { channel: 1, start: 4, span: 1 }, { channel: 1, start: 6, span: 1 },
                    { channel: 2, start: 1, span: 1 }, { channel: 2, start: 3, span: 2 }, { channel: 2, start: 7, span: 1 }
                ] } },
            { kind: 'chat', note: 'Üyelik bitmeden bot hatırlatıyor, indirimle otomatik yenilemeyi öneriyor.', cfg: { title: 'Yenileme Botu · SMS', ask: 'Üyeliğim ne zaman bitiyor?', reply: '15 gün kaldı, şimdi yenilerseniz %10 indirim 🎁' } },
            { kind: 'funnel', note: 'Reklamdan gelen tıklamanın kaçı üyeliğe dönüştü, net görüyorsunuz.', cfg: { title: 'Reklam Paneli · Fitness', rows: [['Gösterim', '9.4K', 100], ['Tıklama', '520', 50], ['Üyelik', '44', 12]], roas: '2.7x' } }
        ],
        services: ['ai-otomasyon', 'chatbot', 'sosyal-reklam']
    },
    {
        slug: 'egitim', emoji: '🎓', name: 'Eğitim & Kurs Merkezi',
        headline: 'Kayıt, taksit ve devamsızlık takibini veliye otomatik bildirin.',
        app: { brand: 'Sınıf', domain: 'sinif.yaptir.io', navLabels: ['Öğrenciler', 'Program', 'Veliler', 'Ödemeler'] },
        screens: [
            { kind: 'rows', note: 'Taksidini ödemeyen, devamsız kalan öğrenci veliye otomatik bildiriliyor.', cfg: { title: 'Öğrenci Takip · Canlı', rows: [
                { icon: '🎓', title: 'Ege Y.', meta: 'İngilizce B2 · Taksit 3/6', val: '850 ₺', label: 'Ödendi', status: 'ok' },
                { icon: '📵', title: 'Zeynep A.', meta: 'Matematik · 2 gün devamsız', val: '—', label: 'Veli Bilgilendirildi', status: 'warn' },
                { icon: '📝', title: 'Kerem D.', meta: 'Kayıt yenileme', val: '1.200 ₺', label: 'Bekliyor', status: 'info' }
            ] } },
            { kind: 'calendar', note: 'İngilizce ve matematik ders saatleri aynı programda, çakışma yok.', cfg: { title: 'Ders Programı · Kurs Merkezi', days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'],
                channels: [{ label: 'İngilizce B2', color: '#3b6fe0' }, { label: 'Matematik', color: '#e8544a' }],
                bookings: [
                    { channel: 0, start: 1, span: 1 }, { channel: 0, start: 3, span: 1 }, { channel: 0, start: 5, span: 1 },
                    { channel: 1, start: 2, span: 1 }, { channel: 1, start: 4, span: 2 }, { channel: 1, start: 7, span: 1 }
                ] } },
            { kind: 'chat', note: 'Yeni dönem sorusuna bot anında cevap veriyor, kayıt formunu kendisi açıyor.', cfg: { title: 'Kayıt Botu · Web Sitesi', ask: 'Yeni dönem ne zaman başlıyor?', reply: "7 Ekim'de başlıyor, hemen kaydınızı oluşturabilirim 📝" } },
            { kind: 'funnel', note: 'Kayıt kampanyasının kaç öğrenciye dönüştüğünü canlı görüyorsunuz.', cfg: { title: 'Kayıt Kampanyası', rows: [['Gösterim', '7.6K', 100], ['Tıklama', '440', 46], ['Kayıt', '52', 14]], roas: '3.3x' } }
        ],
        services: ['ozel-yazilim', 'veri-analitik', 'sosyal-reklam']
    },
    {
        slug: 'otel', emoji: '🏨', name: 'Otel & Konaklama',
        headline: "Booking.com, Airbnb, Expedia — tek takvimden, çift rezervasyon riski sıfır.",
        app: { brand: 'Konak', domain: 'konak.yaptir.io', navLabels: ['Rezerve', 'Odalar', 'Temizlik', 'Misafir'] },
        screens: [
            { kind: 'rows', note: 'Hangi oda temizlikte, hangisi check-in\'e hazır — anlık durum.', cfg: { title: 'Rezervasyon Takip · Canlı', rows: [
                { icon: '🛎️', title: 'Oda 204', meta: 'Check-in bugün · 3 gece', val: '4.200 ₺', label: 'Onaylı', status: 'ok' },
                { icon: '🧹', title: 'Oda 108', meta: 'Check-out 11:00', val: '—', label: 'Temizlik', status: 'warn' },
                { icon: '🔑', title: 'Oda 301', meta: 'Check-in 14:00', val: '3.100 ₺', label: 'Bekliyor', status: 'info' }
            ] } },
            { kind: 'sync', note: 'Booking.com, Airbnb ve Expedia\'daki fiyat ve müsaitlik aynı anda güncelleniyor.', cfg: { title: 'Entegrasyon · Kanal Yöneticisi', brands: ['Booking.com', 'Airbnb', 'Expedia', 'Otelz'], status: 'Fiyat & müsaitlik senkron · 6sn önce' } },
            { kind: 'calendar', note: 'Hangi geceyi hangi kanal sattı, tek takvimde — çift rezervasyon riski sıfır.', cfg: { title: 'Doluluk Takvimi · Kanal Yöneticisi', days: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
                channels: [{ label: 'Airbnb', color: '#FF385C' }, { label: 'Booking.com', color: '#003580' }, { label: 'Doğrudan', color: '#f4551f' }],
                bookings: [
                    { channel: 0, start: 1, span: 2 }, { channel: 0, start: 6, span: 1 }, { channel: 0, start: 9, span: 2 },
                    { channel: 1, start: 3, span: 3 }, { channel: 1, start: 8, span: 1 },
                    { channel: 2, start: 5, span: 1 }, { channel: 2, start: 7, span: 1 }
                ] } },
            { kind: 'chat', note: 'Check-in saatini soran misafire bot kapı şifresiyle birlikte anında yanıt veriyor.', cfg: { title: 'Misafir Botu · Airbnb', ask: 'Check-in saati kaçta?', reply: "14:00'ten sonra, kapı şifreniz 4521 🔑" } }
        ],
        services: ['ai-otomasyon', 'chatbot', 'sosyal-reklam']
    }
]

export const services = [
    {
        id: 'ai-otomasyon', num: '01', icon: 'cpu', title: 'AI Otomasyon',
        short: 'İş süreçlerinizi yapay zeka ile otomatikleştirin.',
        long: 'Tekrarlayan işleri ortadan kaldırın, ekibinizi stratejik görevlere yönlendirin.',
        tags: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'n8n', 'Make'],
        bullets: [
            'E-posta ve müşteri taleplerinin otomatik yönlendirilmesi',
            'Fatura, sözleşme ve form tanıma (OCR + NLP)',
            'İş akışı otomasyonu ve karar destek sistemleri',
            'RPA (Robotik Süreç Otomasyonu) entegrasyonu',
            'Tahminleme modelleri ile proaktif iş yönetimi'
        ],
        results: [["%70'e kadar", 'Zaman Tasarrufu'], ['%95', 'Hata Oranı Azalma'], ['%40', 'Maliyet Düşüşü']],
        personas: [
            ['Restoran & Kafe', 'Fatura ve stok takibini otomatikleştirin, masaya değil hesaba odaklanın.'],
            ['E-ticaret', 'Sipariş onayı ve kargo bildirimi tek tık, elle uğraşmayın.'],
            ['Klinik & Güzellik', 'Randevu hatırlatma ve faturalama kendi kendine işlesin.']
        ]
    },
    {
        id: 'ozel-yazilim', num: '02', icon: 'code', title: 'Özel Yazılım',
        short: 'İşletmenize özel, sıfırdan tasarlanan çözümler.',
        long: 'Web uygulamaları, mobil platformlar ve kurumsal sistemler — tam size göre.',
        tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
        bullets: [
            'Web uygulamaları ve kurumsal portallar',
            'iOS ve Android mobil uygulama geliştirme',
            'Mikroservis mimarisiyle ölçeklenebilir backend',
            'Mevcut sistemlerle API tabanlı entegrasyon',
            'CI/CD ile otomatik test ve dağıtım süreçleri'
        ],
        results: [['4-8 hafta', 'Ortalama Teslim'], ['%99.9', 'Uptime Garantisi'], ['%100', 'Kaynak Kod Sahipliği']],
        personas: [
            ['Restoran & Kafe', 'Rezervasyon ve sipariş sisteminizi sıfırdan, size özel kuralım.'],
            ['E-ticaret', 'Ürün kataloğundan ödemeye, markanıza özel bir mağaza kuralım.'],
            ['Klinik & Güzellik', 'Randevu ve hasta/müşteri takip sisteminizi size özel tasarlayalım.']
        ]
    },
    {
        id: 'veri-analitik', num: '03', icon: 'chart', title: 'Veri & Analitik',
        short: 'Verilerinizi anlamlı iç görülere dönüştürün.',
        long: "Dashboard'lar, raporlama sistemleri ve tahminleme modelleri.",
        tags: ['Python', 'Apache Spark', 'Snowflake', 'Metabase', 'dbt', 'Airflow'],
        bullets: [
            "Gerçek zamanlı satış ve operasyon dashboard'ları",
            'Müşteri davranışı segmentasyonu ve kohort analizi',
            'Talep tahminleme ve stok optimizasyon modelleri',
            'Çoklu veri kaynağı entegrasyonu ve ETL süreçleri',
            'Anomali tespiti ve otomatik uyarı sistemleri'
        ],
        results: [['%35', 'Daha Hızlı Karar Alma'], ['%25', 'Stok Fazlası Azalma'], ['Günlük', 'Güncel Veri']],
        personas: [
            ['Restoran & Kafe', 'En çok satan menüyü, boşa giden stoku ortaya çıkarın.'],
            ['E-ticaret', 'Hangi ürün ne zaman satılıyor, anlık görün.'],
            ['Klinik & Güzellik', 'Hangi hizmet en çok tercih ediliyor, doluluk oranınızı görün.']
        ]
    },
    {
        id: 'entegrasyon', num: '04', icon: 'link2', title: 'Entegrasyon',
        short: 'Mevcut sistemlerinizi birbirine bağlayın.',
        long: 'API geliştirme, üçüncü parti entegrasyonlar ve veri senkronizasyonu.',
        tags: ['Node.js', 'Kafka', 'RabbitMQ', 'Docker', 'Zapier', 'n8n'],
        bullets: [
            'REST ve GraphQL API geliştirme',
            'E-ticaret, kargo ve muhasebe sistemleri entegrasyonu',
            'Gerçek zamanlı veri senkronizasyonu',
            'Webhook tabanlı olay yönetimi',
            'Eski (legacy) sistemlerin modernizasyonu'
        ],
        results: [['%90', 'Manuel İşlem Azalması'], ['<1sn', 'Senkronizasyon Gecikmesi'], ['7/24', 'Kesintisiz Akış']],
        personas: [
            ['Restoran & Kafe', 'Yemek Sepeti, Getir ve kasa sisteminizi birbirine bağlayın.'],
            ['E-ticaret', "Shopify, kargo ve muhasebe sisteminizi birbirine bağlayın."],
            ['Klinik & Güzellik', 'Randevu sisteminizi SMS ve e-postayla otomatik konuştur.']
        ]
    },
    {
        id: 'chatbot', num: '05', icon: 'message', title: 'Chatbot & Asistan',
        short: 'Akıllı chatbot çözümleri ile 7/24 destek.',
        long: 'Müşteri hizmetleri ve iç iletişim için doğal dil işleme destekli asistanlar.',
        tags: ['GPT-4', 'Claude', 'Rasa', 'Dialogflow', 'Pinecone', 'LangChain'],
        bullets: [
            'Müşteri hizmetleri chatbotları (web, WhatsApp, Telegram)',
            'Şirket içi bilgi asistanı (HR, IT destek)',
            'Satış ve lead qualification botları',
            'Çoklu dil desteği ile global erişim',
            'Doğal dil anlama (NLU) ve duygu analizi'
        ],
        results: [['<3sn', 'Yanıt Süresi'], ['%85+', 'Çözüm Oranı'], ['%60', 'Maliyet Tasarrufu']],
        personas: [
            ['Restoran & Kafe', "Rezervasyonları WhatsApp'tan otomatik alın."],
            ['E-ticaret', 'Kargo durumu sorularını bota bırakın, ekibiniz asıl işe odaklansın.'],
            ['Klinik & Güzellik', 'Randevu almayı 7/24 kesintisiz hâle getirin.']
        ]
    },
    {
        id: 'danismanlik', num: '06', icon: 'compass', title: 'Danışmanlık',
        short: 'Dijital dönüşüm stratejinizi belirleyin.',
        long: 'Mevcut altyapı analizi, yol haritası oluşturma ve uygulama desteği.',
        tags: ['Agile', 'Design Thinking', 'OKR', 'TOGAF', 'Lean', 'Scrum'],
        bullets: [
            'Mevcut teknoloji altyapısının denetimi',
            'Dijital dönüşüm yol haritası oluşturma',
            'Süreç optimizasyonu ve verimlilik analizi',
            'Teknoloji seçimi ve mimari danışmanlığı',
            'Ekip eğitimi ve bilgi transferi'
        ],
        results: [['2 hafta', 'İlk Yol Haritası'], ['3x', 'Ortalama Verimlilik'], ['Sınırsız', 'Danışmanlık Desteği']],
        personas: [
            ['Restoran & Kafe', 'Şube büyümenize uygun teknoloji yol haritası çıkaralım.'],
            ['E-ticaret', 'Ölçeklenme için doğru teknolojiyi doğru zamanda seçelim.'],
            ['Klinik & Güzellik', 'Dijitalleşme sürecinizi baştan sona planlayalım.']
        ]
    },
    {
        id: 'sosyal-reklam', num: '07', icon: 'chart', title: 'Sosyal Medya & Reklam',
        short: 'İçerik ve reklamlarınızı yapay zekayla otomatik yönetin.',
        long: 'Meta ve Instagram reklamlarınızı otomatik optimize edin, içerik takvimini kendi kendine işleten bir sisteme devredin.',
        tags: ['Meta Ads', 'Instagram', 'TikTok', 'Google Ads', 'Zapier', 'Make'],
        bullets: [
            'Meta ve Instagram reklam kampanyası yönetimi',
            'Yapay zeka ile otomatik bütçe optimizasyonu',
            'Hedef kitle segmentasyonu ve A/B testleri',
            'İçerik takvimi ve otomatik paylaşım planlama',
            'Dönüşüm takibi ve ROAS raporlama'
        ],
        results: [['3.5x', 'Ortalama ROAS'], ['%45', 'Tıklama Maliyeti Düşüşü'], ['Haftalık', 'Performans Raporu']],
        personas: [
            ['Restoran & Kafe', 'Yerel çevrenizdeki müşteriye otomatik reklam gösterin.'],
            ['E-ticaret', 'Bütçenizi en çok satan ürüne otomatik kaydırın.'],
            ['Klinik & Güzellik', 'Randevu boşluklarına göre otomatik kampanya başlatın.']
        ]
    }
]

export const projects = [
    {
        slug: 'ssw', letter: 'S', tag: 'VERİ & OTOMASYON', year: '2026', title: 'SSW',
        short: 'Sahibinden.com için gelişmiş veri toplama ve analiz platformu (Sahibinden Scraper Web).',
        client: 'Kurumsal Müşteri', duration: '3 Ay',
        problem: 'Müşterinin Sahibinden.com üzerinden büyük ölçekli veri toplama ve analiz ihtiyacı vardı. Manuel süreçler zaman kaybına yol açıyor, veri tutarsızlıkları yaşanıyordu.',
        solution: 'Sahibinden.com platformundan otomatik veri toplama, filtreleme ve raporlama yapabilen web tabanlı bir scraping altyapısı geliştirdik. Kullanıcı dostu arayüz ile hedeflenen kategorilerde anlık veri çekimi ve analiz imkânı sağlandı.',
        metrics: [['Veri Doğruluğu', '%98'], ['İşlem Hızı', '10x'], ['Günlük Kayıt', '50K+']]
    },
    {
        slug: 'retrolokal', letter: 'R', tag: 'E-TİCARET & MARKETPLACE', year: '2026', title: 'RetroLokal',
        short: 'Vintage ve retro ürünler için tam kapsamlı online pazar yeri platformu.',
        client: 'Girişimci', duration: '4 Ay',
        problem: 'Vintage ve retro ürün satıcıları dağınık sosyal medya hesapları üzerinden satış yapıyor, güvenilir bir pazar yeri ve ödeme altyapısından mahrumdu.',
        solution: 'Satıcıların ürün listeleyebildiği, alıcıların güvenle alışveriş yapabildiği kategori bazlı bir pazar yeri platformu kurduk; ödeme, kargo takibi ve satıcı puanlama sistemleri entegre edildi.',
        metrics: [['Aktif İlan', '2K+'], ['Kayıtlı Üye', '1.5K+'], ['Kategori Sayısı', '30+']]
    },
    {
        slug: 'nest', letter: 'N', tag: 'AKADEMİK & ARAŞTIRMA', year: '2026', title: 'NEST',
        short: 'EEG veri analizi ve nörobilim araştırma platformu.',
        client: 'Akademik Kurum', duration: '5 Ay',
        problem: 'Araştırmacılar farklı formatlardaki EEG verilerini analiz etmek için birden fazla araç kullanmak zorunda kalıyor, gerçek zamanlı işbirliği yapamıyordu.',
        solution: 'Çoklu format desteği sunan, gerçek zamanlı veri işleme ve görselleştirme yapabilen web tabanlı bir araştırma platformu geliştirdik; araştırmacılar arası işbirliğini tek platformda topladık.',
        metrics: [['Desteklenen Format', '10+'], ['Araştırmacı Sayısı', '50+'], ['Veri İşleme', 'Gerçek Zamanlı']]
    },
    {
        slug: 'drv-e', letter: 'D', tag: 'ENERJİ & YÖNETİM', year: '2026', title: 'DRV-E',
        short: 'Elektrik işleri takip ve yönetim dashboard paneli.',
        client: 'Elektrik Firması', duration: '2 Ay',
        problem: 'Saha ekipleri iş emirlerini telefon ve kağıt üzerinden takip ediyor, yönetim ekip verimliliğini ve müşteri taleplerini gerçek zamanlı göremiyordu.',
        solution: 'Saha ekiplerinin iş emirlerini anlık güncelleyebildiği, yönetimin verimlilik ve talep metriklerini tek ekrandan izleyebildiği bir dashboard paneli kurduk.',
        metrics: [['İş Emri Takibi', 'Anlık'], ['Ekip Verimliliği', '%40 artış'], ['Müşteri Talebi', '<2 saat']]
    }
]

export const team = [
    { initials: 'MS', name: 'Musa Soylu', role: 'Yazılım Mühendisi' },
    { initials: 'NS', name: 'Nazlı Nehir Sertbaş', role: 'Proje Yöneticisi' },
    { initials: 'HT', name: 'Hasan Tatar', role: 'Kurucu & CEO' },
    { initials: 'UG', name: 'Umut Gökmen', role: 'Co-Founder & CTO' },
    { initials: 'FB', name: 'Furkan Bora', role: 'Yazılım Mühendisi' }
]

export const process = [
    { num: '01', title: 'Keşif & Analiz', text: 'İş süreçlerinizi derinlemesine anlıyoruz. Mevcut altyapınızı inceliyor, ihtiyaçlarınızı haritalıyoruz. Stakeholder görüşmeleri ve teknik audit yapıyoruz.' },
    { num: '02', title: 'Strateji & Tasarım', text: 'Bulgulara dayalı çözüm stratejisi belirliyoruz. Teknik mimari, UX tasarımı ve proje planını detaylıca hazırlıyoruz.' },
    { num: '03', title: 'Geliştirme', text: 'Agile sprintler ile iteratif geliştirme. Her hafta demo, sürekli geri bildirim ve şeffaf ilerleme raporları.' },
    { num: '04', title: 'Test & QA', text: 'Otomatik testler, yük testleri, güvenlik taramaları ve kullanıcı kabul testleri ile kalite güvencesi.' },
    { num: '05', title: 'Teslimat', text: 'Sorunsuz canlıya geçiş, veri migrasyonu, kullanıcı eğitimi ve detaylı dokümantasyon.' },
    { num: '06', title: 'Destek & Büyüme', text: 'Sürekli bakım, performans optimizasyonu, yeni özellik geliştirme ve ölçeklendirme desteği.' }
]

export const stack = [
    { title: 'Yapay Zeka', items: ['GPT-4 / Claude', 'TensorFlow', 'PyTorch', 'LangChain', 'Hugging Face', 'scikit-learn'] },
    { title: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'Go', 'PostgreSQL', 'Redis'] },
    { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'React Native', 'Flutter'] },
    { title: 'Altyapı', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Vercel'] }
]

export const contact = {
    email: 'info@yaptir.io',
    address: 'Cihangir, Oba Sk. No: 2 D:B, 34433 Beyoğlu/İstanbul',
    hours: 'Pazartesi — Cuma, 09:00 — 18:00'
}
