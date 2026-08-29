import { contact } from '../data.js'

// Vercel-hosted serverless function (separate from the GitHub Pages static
// site, which has no server runtime of its own) — see api/contact.js.
const CONTACT_ENDPOINT = 'https://yaptirio.vercel.app/api/contact'

export function initContactForm(root = document) {
    const form = root.querySelector('[data-contact-form]')
    if (!form) return

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const msg = form.querySelector('[data-form-msg]')
        const submitBtn = form.querySelector('button[type="submit"]')
        const data = new FormData(form)

        const payload = {
            name: data.get('name')?.trim(),
            company: data.get('company')?.trim(),
            email: data.get('email')?.trim(),
            phone: data.get('phone')?.trim(),
            service: data.get('service')?.trim(),
            budget: data.get('budget')?.trim(),
            message: data.get('message')?.trim()
        }

        if (!payload.name || !payload.email || !payload.message) {
            msg.textContent = 'Lütfen zorunlu alanları (*) doldurun.'
            msg.className = 'form-msg is-visible is-error'
            return
        }

        submitBtn.disabled = true
        msg.textContent = 'Gönderiliyor...'
        msg.className = 'form-msg is-visible'

        try {
            const res = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            if (!res.ok) throw new Error('request failed')

            msg.textContent = 'Teşekkürler! Talebiniz iletildi, 24 saat içinde dönüş yapacağız.'
            msg.className = 'form-msg is-visible is-success'
            form.reset()
        } catch (err) {
            console.error('Contact form error:', err)
            // Fall back to opening the visitor's own mail client so the lead
            // isn't lost if the API call fails (network hiccup, endpoint down).
            const lines = [
                `Ad Soyad: ${payload.name}`,
                payload.company ? `Şirket: ${payload.company}` : null,
                `E-posta: ${payload.email}`,
                payload.phone ? `Telefon: ${payload.phone}` : null,
                payload.service ? `İlgilendiği Hizmet: ${payload.service}` : null,
                payload.budget ? `Tahmini Bütçe: ${payload.budget}` : null,
                '',
                payload.message
            ].filter(Boolean).join('\n')
            const subject = encodeURIComponent(`Teklif Talebi — ${payload.name}`)
            const body = encodeURIComponent(lines)
            window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`

            msg.textContent = 'Otomatik gönderim başarısız oldu, e-posta uygulamanız açılıyor — mesajınızı orada gönderebilirsiniz.'
            msg.className = 'form-msg is-visible is-error'
        } finally {
            submitBtn.disabled = false
        }
    })
}
