import { services } from '../data.js'
import { serviceVisualHTML } from './serviceVisuals.js'
import { icon } from '../utils/icons.js'

function bodyHTML(s) {
    return `
        ${serviceVisualHTML(s.id) || ''}
        <span class="svc-modal-num">${s.num}</span>
        <h3>${s.title}</h3>
        <p class="svc-modal-lede">${s.long}</p>

        <div class="svc-modal-personas">
            ${s.personas.map(([who, text]) => `
                <div class="svc-persona">
                    <strong>${who}</strong>
                    <span>${text}</span>
                </div>
            `).join('')}
        </div>

        <div class="service-tags">
            ${s.tags.map(t => `<span>${t}</span>`).join('')}
        </div>

        <a href="/iletisim" class="btn btn--primary" data-svc-modal-cta>Teklif Al ${icon('arrow')}</a>
    `
}

export function initServiceModal() {
    const modal = document.querySelector('[data-svc-modal]')
    const body = document.querySelector('[data-svc-modal-body]')
    const closeBtn = document.querySelector('[data-svc-modal-close]')
    if (!modal || !body) return

    function open(id) {
        const s = services.find(s => s.id === id)
        if (!s) return
        body.innerHTML = bodyHTML(s)
        modal.classList.add('is-open')
        document.body.style.overflow = 'hidden'
    }

    function close() {
        modal.classList.remove('is-open')
        document.body.style.overflow = ''
    }

    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-service-card]')
        if (card) {
            open(card.dataset.serviceCard)
            return
        }
        if (e.target === modal || e.target.closest('[data-svc-modal-close]')) {
            close()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const card = document.activeElement?.closest?.('[data-service-card]')
            if (card && document.activeElement === card) {
                e.preventDefault()
                open(card.dataset.serviceCard)
            }
        }
        if (e.key === 'Escape' && modal.classList.contains('is-open')) close()
    })

    closeBtn?.addEventListener('click', close)

    body.addEventListener('click', (e) => {
        if (e.target.closest('[data-svc-modal-cta]')) close()
    })
}
