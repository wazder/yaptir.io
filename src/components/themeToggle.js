const STORAGE_KEY = 'yaptir-theme'

export function initThemeToggle() {
    const btn = document.querySelector('[data-theme-toggle]')
    if (!btn) return

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) document.documentElement.setAttribute('data-theme', stored)

    function currentIsDark() {
        const attr = document.documentElement.getAttribute('data-theme')
        if (attr === 'dark') return true
        if (attr === 'light') return false
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    btn.addEventListener('click', () => {
        const next = currentIsDark() ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem(STORAGE_KEY, next)
    })
}
