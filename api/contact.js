/* Vercel serverless function — sends contact-form submissions via Resend.
   Deployed separately from the GitHub Pages static site (which has no
   server runtime); the frontend calls this function's URL directly. */
export default async function handler(req, res) {
    const origin = req.headers.origin || '*'
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') return res.status(204).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const { name, company, email, phone, service, budget, message } = req.body || {}
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Zorunlu alanlar eksik.' })
    }

    const lines = [
        `Ad Soyad: ${name}`,
        company ? `Şirket: ${company}` : null,
        `E-posta: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        service ? `İlgilendiği Hizmet: ${service}` : null,
        budget ? `Tahmini Bütçe: ${budget}` : null,
        '',
        message
    ].filter(Boolean).join('\n')

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY missing')
        return res.status(500).json({ error: 'E-posta servisi yapılandırılmamış.' })
    }

    try {
        const r = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: process.env.RESEND_FROM || 'yaptir.io <onboarding@resend.dev>',
                to: process.env.CONTACT_TO_EMAIL || 'info@yaptir.io',
                reply_to: email,
                subject: `Teklif Talebi — ${name}`,
                text: lines
            })
        })

        if (!r.ok) {
            console.error('Resend error:', r.status, await r.text().catch(() => ''))
            return res.status(502).json({ error: 'E-posta gönderilemedi.' })
        }

        return res.status(200).json({ ok: true })
    } catch (err) {
        console.error('Contact form error:', err)
        return res.status(500).json({ error: 'Sunucu hatası.' })
    }
}
