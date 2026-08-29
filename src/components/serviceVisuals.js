/* Looping mockups framed as a real captured app screenshot —
   browser chrome + URL bar + sidebar shell — not a bare diagram. */

const DEFAULT_NAV = ['Panel', 'Modüller', 'Sohbet', 'Hesap']

const winOpts = (cfg) => ({ activeIndex: cfg.activeIndex, navLabels: cfg.navLabels, brand: cfg.brand, domain: cfg.domain })

const win = (title, accent, body, opts = {}) => {
    const domain = opts.domain || 'app.yaptir.io'
    const url = opts.url || `${domain}/${(opts.slug || title).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
    const nav = opts.navLabels || DEFAULT_NAV
    return `
    <div class="svc-window" aria-hidden="true">
        <div class="svc-window-bar">
            <span class="svc-window-dot" style="background:#ff5f57"></span>
            <span class="svc-window-dot" style="background:#febc2e"></span>
            <span class="svc-window-dot" style="background:#28c840"></span>
            <span class="svc-window-url">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                ${url}
            </span>
        </div>
        <div class="svc-window-shell">
            <div class="svc-window-sidebar">
                ${nav.map((label, i) => `
                    <span class="svc-sidebar-item ${i === (opts.activeIndex ?? 0) ? 'is-active' : ''}" style="${i === (opts.activeIndex ?? 0) ? `--accent:${accent}` : ''}">${label}</span>
                `).join('')}
            </div>
            <div class="svc-window-main">
                <div class="svc-window-toolbar">
                    <span class="svc-window-title">${title}</span>
                    ${opts.brand
                        ? `<span class="svc-window-avatar" style="background:${accent}">${opts.brand[0]}</span>`
                        : `<span class="svc-window-avatar"></span>`}
                </div>
                <div class="svc-window-body">${body}</div>
            </div>
        </div>
    </div>`
}

function docIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`
}
function checkIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`
}
function coinIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1 1-2 3-2s3 1 3 2-1 1.5-3 2-3 1-3 2 1 2 3 2 3-1 3-2"/></svg>`
}
function bellIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`
}
function calIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`
}
function truckIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3z"/><path d="M14 11h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>`
}
function starIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.8 1.4 6.8L12 17.3 5.9 20.7l1.4-6.8-5.1-4.8 6.9-.8Z"/></svg>`
}
function homeIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>`
}
function bookIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3Z"/><path d="M8 4v16"/></svg>`
}
export const icons = { docIcon, checkIcon, coinIcon, bellIcon, calIcon, truckIcon, starIcon, homeIcon, bookIcon }

/* ── raw renderers: take a fully-resolved config, no persona/index lookup ── */

export function renderChat(cfg) {
    return win(cfg.title, cfg.dot || '#28c840', `
        <div class="svc-demo svc-demo--chat">
            <div class="svc-chat-bubble svc-chat-bubble--user">${cfg.ask}</div>
            <div class="svc-chat-bubble svc-chat-bubble--bot">
                <span class="svc-chat-typing"><span class="typing-dots"><span></span><span></span><span></span></span></span>
                <span class="svc-chat-reply">${cfg.reply}</span>
            </div>
        </div>`, winOpts(cfg))
}

export function renderFlow(cfg) {
    return win(cfg.title, cfg.dot || '#f4551f', `
        <div class="svc-demo svc-demo--flow">
            <div class="svc-flow-track">
                <span class="svc-flow-node" style="--i:0">${cfg.icons[0]}</span>
                <span class="svc-flow-node" style="--i:1">${cfg.icons[1]}</span>
                <span class="svc-flow-node" style="--i:2">${cfg.icons[2]}</span>
                <span class="svc-flow-packet"></span>
            </div>
            <div class="svc-flow-labels">
                <span>${cfg.labels[0]}</span><span>${cfg.labels[1]}</span><span>${cfg.labels[2]}</span>
            </div>
        </div>`, winOpts(cfg))
}

export function renderBars(cfg) {
    return win(cfg.title, cfg.dot || '#f4bf00', `
        <div class="svc-demo svc-demo--bars">
            ${cfg.vals.map((v, idx) => `
                <span class="svc-bar-col"><span class="svc-bar-val">${v}</span><span class="svc-bar" style="--i:${idx};--h:${Math.round(v / 2.6)}%"></span></span>
            `).join('')}
        </div>`, winOpts(cfg))
}

export function renderLink(cfg) {
    return win(cfg.title, cfg.dot || '#3b6fe0', `
        <div class="svc-demo svc-demo--link">
            <span class="svc-link-node svc-link-node--a">${cfg.a}</span>
            <span class="svc-link-line"></span>
            <span class="svc-link-node svc-link-node--mid">AI</span>
            <span class="svc-link-line"></span>
            <span class="svc-link-node svc-link-node--b">${cfg.b}</span>
        </div>`, winOpts(cfg))
}

export function renderCode(cfg) {
    return win(cfg.title, cfg.dot || '#28c840', `
        <div class="svc-demo svc-demo--code">
            <span class="svc-code-line"><b style="--c:1;--i:0;--w:22%"></b><b style="--c:2;--i:0;--w:34%;--d:.35s"></b></span>
            <span class="svc-code-line"><b style="--c:3;--i:1;--w:16%"></b><b style="--c:1;--i:1;--w:40%;--d:.35s"></b></span>
            <span class="svc-code-line"><b style="--c:2;--i:2;--w:28%"></b><b style="--c:3;--i:2;--w:22%;--d:.35s"></b></span>
            <span class="svc-code-line"><b style="--c:1;--i:3;--w:18%"></b></span>
        </div>`, winOpts(cfg))
}

export function renderChecklist(cfg) {
    return win(cfg.title, cfg.dot || '#f4551f', `
        <div class="svc-demo svc-demo--checklist">
            ${cfg.items.map((t, idx) => `<span class="svc-check" style="--i:${idx}">${t}</span>`).join('')}
        </div>`, winOpts(cfg))
}

export function renderFunnel(cfg) {
    return win(cfg.title, cfg.dot || '#3b6fe0', `
        <div class="svc-demo svc-demo--funnel">
            ${cfg.rows.map(([label, val, pct], idx) => `
                <div class="svc-funnel-row">
                    <span class="svc-funnel-label">${label}</span>
                    <span class="svc-funnel-track"><span class="svc-funnel-bar" style="--i:${idx};--w:${pct}%"></span></span>
                    <span class="svc-funnel-val">${val}</span>
                </div>
            `).join('')}
            <div class="svc-funnel-roas">${cfg.roasLabel || 'ROAS'} <strong>${cfg.roas}</strong></div>
        </div>`, winOpts(cfg))
}

export function renderRows(cfg) {
    return win(cfg.title, cfg.dot || '#f4551f', `
        <div class="svc-demo svc-demo--rows">
            ${cfg.rows.map((r, idx) => `
                <div class="svc-datarow" style="--i:${idx}">
                    <span class="svc-datarow-icon">${r.icon}</span>
                    <div class="svc-datarow-main">
                        <strong>${r.title}</strong>
                        <span>${r.meta}</span>
                    </div>
                    <span class="svc-datarow-val">${r.val}</span>
                    <span class="svc-pill svc-pill--${r.status}">${r.label}</span>
                </div>
            `).join('')}
        </div>`, winOpts(cfg))
}

export function renderSync(cfg) {
    return win(cfg.title, cfg.dot || '#3b6fe0', `
        <div class="svc-demo svc-demo--sync">
            <div class="svc-sync-row">
                ${cfg.brands.map((b, idx) => `<span class="svc-sync-chip" style="--i:${idx}">${b}</span>`).join('')}
            </div>
            <div class="svc-sync-status"><span class="svc-sync-pulse"></span>${cfg.status}</div>
        </div>`, winOpts(cfg))
}

export function renderCalendar(cfg) {
    return win(cfg.title, cfg.dot || '#3b6fe0', `
        <div class="svc-demo svc-demo--calendar">
            ${cfg.label ? `<div class="svc-cal-label">${cfg.label}</div>` : ''}
            <div class="svc-tl">
                <div class="svc-tl-header">
                    <span class="svc-tl-spacer"></span>
                    <div class="svc-tl-daylabels" style="--cols:${cfg.days.length}">${cfg.days.map(d => `<span>${d}</span>`).join('')}</div>
                </div>
                ${cfg.channels.map((c, ci) => `
                    <div class="svc-tl-row">
                        <span class="svc-tl-label">${c.label}</span>
                        <div class="svc-tl-track" style="--cols:${cfg.days.length}">
                            ${cfg.bookings.filter(b => b.channel === ci).map(b => `<span class="svc-tl-bar" style="--start:${b.start};--span:${b.span};--i:${ci};background:${c.color}"></span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`, winOpts(cfg))
}

const RENDERERS = { chat: renderChat, flow: renderFlow, bars: renderBars, link: renderLink, code: renderCode, checklist: renderChecklist, funnel: renderFunnel, rows: renderRows, sync: renderSync, calendar: renderCalendar }

export function renderDemo(kind, cfg) {
    return RENDERERS[kind] ? RENDERERS[kind](cfg) : ''
}

/* ── one representative demo per service, for the services grid (static, not persona-swapped) ── */

const SERVICE_DEMOS = {
    'ai-otomasyon': () => renderRows({
        title: 'Masa Takip · Canlı', brand: 'Otomasyon', navLabels: ['Kurallar', 'Süreçler', 'Tetikler', 'Raporlar'], rows: [
            { icon: '🧾', title: 'Masa 4', meta: '2 kişi · 19dk', val: '190 ₺', label: 'Ödenmemiş', status: 'warn' },
            { icon: '☕', title: 'Masa 7', meta: 'Yeni sipariş', val: '64 ₺', label: 'Hazırlanıyor', status: 'info' },
            { icon: '✅', title: 'Masa 2', meta: '1 kişi · 8dk', val: '112 ₺', label: 'Ödendi', status: 'ok' }
        ]
    }),
    'ozel-yazilim': () => renderCode({ title: 'app.tsx · Özel Panel', brand: 'Yazılım', navLabels: ['Kod', 'Dağıtım', 'Testler', 'Versiyon'] }),
    'veri-analitik': () => renderBars({ title: 'Satış Paneli', brand: 'Analitik', navLabels: ['Raporlar', 'Kaynaklar', 'Panolar', 'Uyarılar'], vals: [128, 212, 96, 254, 171] }),
    entegrasyon: () => renderSync({ title: 'Entegrasyon · Sipariş Kanalları', brand: 'Entegrasyon', navLabels: ['Kanallar', 'Eşleme', 'Günlükler', 'Ayarlar'], brands: ['Adisyo', 'Yemeksepeti', 'Getir Yemek', 'Trendyol Yemek'], status: 'Menü & stok senkronize · 8sn önce' }),
    chatbot: () => renderChat({ title: 'Sipariş Botu · Instagram', brand: 'Chatbot', navLabels: ['Sohbetler', 'Senaryo', 'Bildirim', 'Eğitim'], ask: 'Kargom nerede?', reply: 'Kargonuz yarın 14:00 civarı elinizde olur 📦' }),
    danismanlik: () => renderChecklist({ title: 'Yol Haritası', brand: 'Danışmanlık', navLabels: ['Strateji', 'Takvim', 'Raporlar', 'Belgeler'], items: ['Süreç analizi', 'Teknoloji seçimi', 'Uygulama desteği'] }),
    'sosyal-reklam': () => renderFunnel({
        title: 'Meta Reklam Paneli', brand: 'Reklam', navLabels: ['Kampanya', 'Kitleler', 'Bütçe', 'Raporlar'],
        rows: [['Gösterim', '12.4K', 100], ['Tıklama', '840', 62], ['Satış', '96', 24]],
        roas: '4.2x'
    })
}

export function serviceVisualHTML(serviceId) {
    return SERVICE_DEMOS[serviceId] ? SERVICE_DEMOS[serviceId]() : null
}
