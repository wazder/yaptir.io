let observer = null

function getObserver() {
    if (observer) return observer
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    return observer
}

export function initReveal(root = document) {
    const obs = getObserver()
    root.querySelectorAll('.reveal').forEach(el => obs.observe(el))
}
