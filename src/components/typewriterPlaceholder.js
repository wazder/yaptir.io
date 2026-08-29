const PROMPTS = [
    'Restoranım için sipariş chatbotu istiyorum...',
    'E-ticaret sitem yavaş, hızlandırın...',
    'Muhasebe süreçlerimi otomatikleştirin...',
    'Kafem için bir kasa/stok sistemi yaptırmak istiyorum...'
]

export function initTypewriterPlaceholder(input) {
    if (!input) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        input.placeholder = PROMPTS[0]
        return
    }

    let promptIndex = 0
    let charIndex = 0
    let deleting = false
    let timer = null

    function tick() {
        const text = PROMPTS[promptIndex]

        if (!deleting) {
            charIndex++
            input.placeholder = text.slice(0, charIndex)
            if (charIndex === text.length) {
                deleting = true
                timer = window.setTimeout(tick, 2200)
                return
            }
        } else {
            charIndex--
            input.placeholder = text.slice(0, charIndex)
            if (charIndex === 0) {
                deleting = false
                promptIndex = (promptIndex + 1) % PROMPTS.length
            }
        }

        timer = window.setTimeout(tick, deleting ? 28 : 45)
    }

    input.addEventListener('input', () => window.clearTimeout(timer))

    tick()
}
