# yaptir.io

Bu repo, https://yaptir.io canlı sitesinin yapısını/içeriğini yansıtan yerel kod tabanıdır (29 Ağu 2026'da canlı siteye göre sıfırdan kuruldu — önceki "uzay temalı" three.js tasarımı kaldırıldı, scroll bug'lıydı ve içerik canlıdan farklıydı).

## Stack
- Vite, Vanilla JS (ES modules), no framework
- Hash-based SPA router (`#/`, `#/hizmetler`, `#/projeler`, `#/hakkimizda`, `#/iletisim`)

## Komutlar
- `npm run dev` — dev server (port 3001)
- `npm run build` — production build
- `npm run preview` — build önizleme

## Yapı
- `src/router.js` — hash route → sayfa render eşlemesi
- `src/pages/*.js` — her sayfa için HTML template üreten fonksiyonlar
- `src/components/*.js` — header/footer davranışı, marquee, reveal-on-scroll, chat widget, iletişim formu
- `src/data.js` — hizmetler/projeler/ekip/süreç/teknoloji içerik verisi (canlı siteden alındı)
- `src/utils/icons.js` — inline SVG ikon seti (lucide tarzı, CDN'e bağımlı değil)

## Notlar
- Sohbet asistanı (`chat.js`) gerçek Groq API'ye (Llama 3.3 70B) bağlı — sistem promptu `data.js`'teki gerçek hizmet/sektör/proje içeriğinden üretiliyor. Key `VITE_GROQ_API_KEY` build-time env değişkeni; yerel `.env.local` dosyasından gelir (git'e girmez). NOT: Vite build-time değişkeni olduğu için anahtar istemci paketine gömülür ve tarayıcıdan okunabilir. Local dev'de bu değişken yoksa eski kural-tabanlı motor devreye girer (bozuk deneyim yerine zarif geri düşüş).
- İletişim formu backend'i yok; submit'te `mailto:info@yaptir.io` linkiyle kullanıcının mail istemcisini açar.
- Harita gömme gerçek değil (API key gerektirir), statik bir yer tutucu.
- **Yayın: `npm run deploy`** — build alır ve **Cloudflare Pages**'e (`yaptir-io` projesi) yükler. Site 5 aydır burada duruyor.
  - **`git push` YAYINLAMAZ.** Cloudflare Pages projesi GitHub'a bağlı değil (`Git Provider: No`); dağıtım her zaman elle `wrangler pages deploy` ile yapılır.
  - Eskiden repoda GitHub Pages'e yayınlayan bir Actions workflow'u vardı; kimsenin bakmadığı `wazder.github.io/yaptir.io` adresini güncelleyip sahte "başarılı" tiki verdiği için 1 Eyl 2026'da kaldırıldı.
  - Alt sayfalar 308 ile sonuna `/` ekliyor — `curl` ile kontrolde `-L` şart, yoksa boş görünür.
