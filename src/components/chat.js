import { services, industries, projects, team, contact } from '../data.js'

/* Real Groq-backed assistant (matches the VITE_GROQ_API_KEY secret already
   wired into .github/workflows/deploy.yml — no key here means local dev
   without a .env.local, in which case we fall back to the old rule matcher
   below so the widget still degrades gracefully instead of breaking). */
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_MODEL = 'openai/gpt-oss-120b'

const SYSTEM_PROMPT = `Sen yaptir.io'nun yapay zeka asistanısın. yaptir.io, KOBİ'lere yapay zeka otomasyonu ve özel yazılım çözümleri üreten bir stüdyo.

Hizmetlerimiz:
${services.map(s => `- ${s.title}: ${s.short}`).join('\n')}

Sektöre özel örnekler (her biri gerçek entegrasyon/senaryo içerir, gerektiğinde anlat):
${industries.map(i => `- ${i.name}: ${i.headline}`).join('\n')}

Tamamladığımız projeler: ${projects.map(p => p.title).join(', ')}.
Ekip: ${team.map(m => `${m.name} (${m.role})`).join(', ')}.
İletişim: ${contact.email}, çalışma saatleri ${contact.hours}.

Kurallar:
- Bu bir SOHBET, sunum değil. Her mesajda TEK bir fikir/soru ver, 1-2 kısa cümle. Asla madde listesi, asla birden fazla öneriyi tek mesaja sığdırma.
- Her şeyi bir mesajda anlatmaya çalışma — bir şey söyle, karşındakinin tepkisini bekle, ona göre devam et. Gerçek bir insan gibi sırayla konuş.
- Türkçe konuş, samimi ve somut ol; genel geçme, gerektiğinde yukarıdaki örneklerden gerçek bir detay (entegrasyon adı, sektör) kullan.
- Ziyaretçinin sektörünü/ihtiyacını öğrenmeden çözüm yağdırma — önce kısa bir soru sor.
- Fiyat sorulursa net rakam verme, "işletmenize özel teklif için iletişim formunu doldurun" de.
- yaptir.io dışı konularda kibarca "bu konuda yardımcı olamam ama işletmeniz için ne yapabileceğimizi konuşalım" de.`

const conversationHistory = []

async function callGroq(userText) {
    conversationHistory.push({ role: 'user', content: userText })
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...conversationHistory],
            max_tokens: 180,
            temperature: 0.7
        })
    })
    if (!res.ok) throw new Error(`Groq API ${res.status}`)
    const data = await res.json()
    const reply = data.choices[0].message.content
    conversationHistory.push({ role: 'assistant', content: reply })
    return reply
}

const RULES = [
    { test: /hizmet|otomasyon|yazılım|chatbot|entegrasyon|analitik/i,
      reply: 'AI Otomasyon, Özel Yazılım, Veri & Analitik, Entegrasyon, Chatbot & Asistan, Danışmanlık ve Sosyal Medya & Reklam olmak üzere 7 ana hizmet başlığımız var.',
      route: '#/hizmetler', label: 'Hizmetleri incele' },
    { test: /proje|portf|örnek|iş\s?birliği/i,
      reply: 'SSW, RetroLokal, NEST ve DRV-E gibi farklı sektörlerden tamamladığımız projelerimizi inceleyebilirsiniz.',
      route: '#/projeler', label: 'Projeleri incele' },
    { test: /teklif|fiyat|bütçe|ücret|maliyet|iletişim|görüş|demo/i,
      reply: 'Elbette! İhtiyacınızı dinleyip 24 saat içinde dönüş yapıyoruz. Teklif formunu doldurmanız yeterli.',
      route: '#/iletisim', label: 'Teklif formuna git' },
    { test: /hakk|ekip|kim|kuru|şirket/i,
      reply: 'Yapay zeka mühendisleri, full-stack geliştiriciler ve proje yöneticilerinden oluşan bir ekibiz.',
      route: '#/hakkimizda', label: 'Ekibimizi tanıyın' }
]

const FALLBACK = {
    reply: 'Bu konuda size en doğru yanıtı ekibimiz verebilir. Teklif formu üzerinden bize ulaşır mısınız?',
    route: '#/iletisim', label: 'İletişime geç'
}

function matchRule(text) {
    return RULES.find(r => r.test.test(text)) || FALLBACK
}

// The assistant is AI-powered, not a human on shift — so it's always "online",
// unlike the human contact hours shown on the İletişim page/footer.
function syncStatus() {
    const statusEl = document.querySelector('[data-chat-status]')
    if (!statusEl) return
    statusEl.textContent = 'Çevrimiçi'
    statusEl.classList.remove('is-offline')
}

export function initChat() {
    const toggle = document.querySelector('[data-chat-toggle]')
    const panel = document.querySelector('[data-chat-panel]')
    const closeBtn = document.querySelector('[data-chat-close]')
    const body = document.querySelector('[data-chat-body]')
    const input = document.querySelector('[data-chat-input]')
    const sendBtn = document.querySelector('[data-chat-send]')
    const nudge = document.querySelector('[data-chat-nudge]')
    if (!toggle || !panel) return

    syncStatus()

    let greeted = false
    let dancer = null
    let greetTimer = null
    let suppressNextOutsideClose = false

    function dismissNudge() {
        nudge?.classList.remove('is-visible')
    }

    function dismissDancer() {
        if (!dancer) return
        window.clearTimeout(greetTimer)
        const d = dancer
        dancer = null
        d.classList.add('is-leaving')
        window.setTimeout(() => d.remove(), 350)
    }

    function playDancingBot() {
        dancer = document.createElement('div')
        dancer.className = 'chat-dance-bot'
        dancer.innerHTML = `<svg viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1.5" x2="12" y2="4.5"/>
            <circle cx="12" cy="1" r=".9" fill="currentColor"/>
            <rect x="7" y="4.5" width="10" height="8" rx="2.4"/>
            <circle cx="9.8" cy="8.5" r=".9" fill="currentColor" stroke="none"/>
            <circle cx="14.2" cy="8.5" r=".9" fill="currentColor" stroke="none"/>
            <rect x="4.5" y="15" width="15" height="12.5" rx="3.5"/>
            <circle cx="12" cy="21" r="1.6"/>
            <line x1="4.5" y1="18.5" x2="1" y2="22.5"/>
            <line x1="19.5" y1="18.5" x2="23" y2="22.5"/>
            <line x1="9" y1="27.5" x2="9" y2="30.5"/>
            <line x1="15" y1="27.5" x2="15" y2="30.5"/>
        </svg>`
        body.appendChild(dancer)
        // two full dance cycles (0.55s each), then hand off to the greeting
        greetTimer = window.setTimeout(dismissDancer, 1100)
    }

    function open() {
        suppressNextOutsideClose = true
        panel.classList.add('is-open')
        dismissNudge()
        if (!greeted) {
            greeted = true
            playDancingBot()
        }
        window.setTimeout(() => input.focus(), 200)
    }

    function close() {
        panel.classList.remove('is-open')
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('is-open')) close()
    })

    document.addEventListener('click', (e) => {
        if (suppressNextOutsideClose) { suppressNextOutsideClose = false; return }
        if (!panel.classList.contains('is-open')) return
        if (panel.contains(e.target) || toggle.contains(e.target)) return
        close()
    })

    function addMessage(text, who) {
        const el = document.createElement('div')
        el.className = `chat-msg ${who}`
        el.textContent = text
        body.appendChild(el)
        body.scrollTop = body.scrollHeight
        return el
    }

    function addTyping() {
        const el = document.createElement('div')
        el.className = 'chat-msg bot typing-dots'
        el.innerHTML = '<span></span><span></span><span></span>'
        body.appendChild(el)
        body.scrollTop = body.scrollHeight
        return el
    }

    function addLink(route, label) {
        const el = document.createElement('a')
        el.href = route
        el.className = 'chat-msg bot'
        el.style.textDecoration = 'underline'
        el.style.cursor = 'pointer'
        el.textContent = `→ ${label}`
        body.appendChild(el)
        body.scrollTop = body.scrollHeight
    }

    // Only worth a link when the visitor is actually asking to move forward
    // (pricing/contact/demo) — tacking one onto every single reply is what
    // made the widget feel like a form instead of a conversation.
    const CONTACT_INTENT = /teklif|fiyat|bütçe|ücret|maliyet|iletişim|görüş|demo/i

    async function respond(userText) {
        dismissDancer()
        addMessage(userText, 'user')
        const rule = matchRule(userText)
        const wantsContact = CONTACT_INTENT.test(userText)
        const typing = addTyping()

        if (!GROQ_API_KEY) {
            window.setTimeout(() => {
                typing.remove()
                addMessage(rule.reply, 'bot')
                if (wantsContact) addLink('#/iletisim', 'Teklif formuna git')
            }, 700)
            return
        }

        try {
            const reply = await callGroq(userText)
            typing.remove()
            addMessage(reply, 'bot')
            if (wantsContact) addLink('#/iletisim', 'Teklif formuna git')
        } catch (err) {
            console.error('Groq API error:', err)
            typing.remove()
            addMessage(rule.reply, 'bot')
            if (wantsContact) addLink('#/iletisim', 'Teklif formuna git')
        }
    }

    toggle.addEventListener('click', () => {
        panel.classList.contains('is-open') ? close() : open()
    })
    closeBtn.addEventListener('click', close)
    nudge?.addEventListener('click', open)

    if (nudge) {
        window.setTimeout(() => {
            if (!panel.classList.contains('is-open')) nudge.classList.add('is-visible')
        }, 4000)
        window.setTimeout(dismissNudge, 12000)
    }

    sendBtn.addEventListener('click', () => submitInput())
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitInput()
    })
    input.addEventListener('input', dismissDancer)

    function submitInput() {
        const text = input.value.trim()
        if (!text) return
        input.value = ''
        open()
        respond(text)
    }

    // Hooks used by hero widget on the home page
    window.__yaptirChat = {
        open,
        ask(text) {
            open()
            respond(text)
        }
    }
}
