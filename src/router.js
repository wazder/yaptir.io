import { renderHome, initHome } from './pages/home.js'
import { renderHizmetler } from './pages/hizmetler.js'
import { renderProjeler } from './pages/projeler.js'
import { renderHakkimizda } from './pages/hakkimizda.js'
import { renderIletisim } from './pages/iletisim.js'
import { initReveal } from './components/reveal.js'
import { initContactForm } from './components/contactForm.js'
import { initStatCounters } from './components/statCounter.js'

const routes = {
    '': { render: renderHome, init: initHome, key: 'home' },
    'hizmetler': { render: renderHizmetler, key: 'hizmetler' },
    'projeler': { render: renderProjeler, key: 'projeler' },
    'hakkimizda': { render: renderHakkimizda, key: 'hakkimizda' },
    'iletisim': { render: renderIletisim, init: initContactForm, key: 'iletisim' }
}

function currentPath() {
    return window.location.hash.replace(/^#\/?/, '')
}

function setActiveNav(key) {
    document.querySelectorAll('[data-nav] a, [data-mobile-nav] a').forEach(a => {
        a.classList.toggle('is-active', a.dataset.route === key)
    })
}

function closeMobileNav() {
    document.querySelector('[data-mobile-nav]')?.classList.remove('is-open')
}

export function initRouter() {
    const app = document.getElementById('app')

    function paint() {
        const path = currentPath()
        const route = routes[path] || routes['']
        app.innerHTML = route.render()
        setActiveNav(route.key)
        closeMobileNav()
        window.scrollTo({ top: 0, behavior: 'instant' })
        initReveal(app)
        initStatCounters(app)
        route.init?.(app)
    }

    function render({ transition = true } = {}) {
        if (!transition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            paint()
            return
        }
        app.classList.add('is-leaving')
        window.setTimeout(() => {
            paint()
            app.classList.remove('is-leaving')
        }, 180)
    }

    window.addEventListener('hashchange', () => render())
    render({ transition: false })
}
