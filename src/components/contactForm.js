import { contact } from '../data.js'

export function initContactForm(root = document) {
    const form = root.querySelector('[data-contact-form]')
    if (!form) return

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const msg = form.querySelector('[data-form-msg]')
        const data = new FormData(form)

        const name = data.get('name')?.trim()
        const email = data.get('email')?.trim()
        const message = data.get('message')?.trim()

        if (!name || !email || !message) {
            msg.textContent = 'Lütfen zorunlu alanları (*) doldurun.'
            msg.className = 'form-msg is-visible is-error'
            return
        }

        const lines = [
            `Ad Soyad: ${name}`,
            data.get('company') ? `Şirket: ${data.get('company')}` : null,
            `E-posta: ${email}`,
            data.get('phone') ? `Telefon: ${data.get('phone')}` : null,
            data.get('service') ? `İlgilendiği Hizmet: ${data.get('service')}` : null,
            data.get('budget') ? `Tahmini Bütçe: ${data.get('budget')}` : null,
            '',
            message
        ].filter(Boolean).join('\n')

        const subject = encodeURIComponent(`Teklif Talebi — ${name}`)
        const body = encodeURIComponent(lines)
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`

        msg.textContent = 'E-posta uygulamanız açılıyor — göndermeden önce mesajınızı kontrol edebilirsiniz.'
        msg.className = 'form-msg is-visible is-success'
    })
}
