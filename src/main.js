import './styles/main.css'
import { initRouter } from './router.js'
import { initChat } from './components/chat.js'
import { initThemeToggle } from './components/themeToggle.js'
import { initServiceModal } from './components/serviceModal.js'

document.querySelector('[data-nav-toggle]')?.addEventListener('click', () => {
    document.querySelector('[data-mobile-nav]')?.classList.toggle('is-open')
})

const header = document.querySelector('.site-header')
let headerTicking = false
let lastScrollY = window.scrollY
function syncHeaderScrollState() {
    headerTicking = false
    if (!header) return
    const y = window.scrollY

    // hysteresis: different enter/exit thresholds so hovering near the
    // boundary (e.g. rubber-band scroll at the top) can't flip the class rapidly
    const scrolled = header.classList.contains('is-scrolled')
    if (!scrolled && y > 48) header.classList.add('is-scrolled')
    else if (scrolled && y < 24) header.classList.remove('is-scrolled')

    // hide while scrolling down, reveal on any upward scroll (or near the top)
    const goingDown = y > lastScrollY
    if (y < 80) header.classList.remove('is-hidden')
    else if (goingDown) header.classList.add('is-hidden')
    else header.classList.remove('is-hidden')
    lastScrollY = y
}
window.addEventListener('scroll', () => {
    if (headerTicking) return
    headerTicking = true
    requestAnimationFrame(syncHeaderScrollState)
}, { passive: true })
syncHeaderScrollState()

// The hero already has its own AI input — don't show the floating chat
// bubble on top of it too. It fades in once the hero scrolls out of view
// (or immediately on pages that have no hero).
let fabTicking = false
function syncChatFabVisibility() {
    fabTicking = false
    const hero = document.querySelector('.hero')
    const pastHero = !hero || hero.getBoundingClientRect().bottom < 80
    document.body.classList.toggle('hide-chat-fab', !pastHero)
}
window.addEventListener('scroll', () => {
    if (fabTicking) return
    fabTicking = true
    requestAnimationFrame(syncChatFabVisibility)
}, { passive: true })
window.addEventListener('hashchange', () => window.setTimeout(syncChatFabVisibility, 0))

initThemeToggle()
initServiceModal()
initChat()
initRouter()

// runs after the router has rendered the page's DOM (hero included, if any)
syncChatFabVisibility()
