/* Counts .stat-num elements up from 0 the first time they scroll into view. */

let observer = null

function getObserver() {
    if (observer) return observer
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target)
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.4 })
    return observer
}

function animate(el) {
    const match = el.textContent.trim().match(/^([\d.]+)(.*)$/)
    if (!match) return
    const target = parseFloat(match[1])
    const suffix = match[2]
    const duration = 900
    const start = performance.now()

    function tick(now) {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        const value = target * eased
        el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix
        if (p < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
}

export function initStatCounters(root = document) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const obs = getObserver()
    root.querySelectorAll('.stat-num').forEach(el => obs.observe(el))
}
