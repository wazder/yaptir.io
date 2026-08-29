/* Hero backdrop — two soft glowing blobs drifting slowly on their own,
   an ambient wash of color rather than a mouse-reactive effect. */

export function initHeroField(root) {
    if (!root) return
    const blobs = [...root.querySelectorAll('.hero-blob')]
    if (!blobs.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let w = 0, h = 0
    const state = blobs.map((el, i) => ({ el, x: 0.5, y: 0.45, seed: i * 4.2 }))

    function measure() {
        const rect = root.getBoundingClientRect()
        w = rect.width
        h = rect.height
    }

    let raf = null
    let t = 0

    function frame() {
        if (!root.isConnected) { raf = null; return }
        t += 0.011

        state.forEach(s => {
            s.x = 0.5 + Math.cos(t + s.seed) * 0.24
            s.y = 0.45 + Math.sin(t * 0.8 + s.seed) * 0.18
            s.el.style.left = `${s.x * w}px`
            s.el.style.top = `${s.y * h}px`
        })

        raf = requestAnimationFrame(frame)
    }

    measure()
    window.addEventListener('resize', measure)
    raf = requestAnimationFrame(frame)
}
