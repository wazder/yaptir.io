import { renderHome, initHome } from './pages/home.js'
import { renderHizmetler } from './pages/hizmetler.js'
import { renderHizmetlerDetay } from './pages/hizmetlerDetay.js'
import { renderProjeler } from './pages/projeler.js'
import { renderProjelerDetay } from './pages/projelerDetay.js'
import { renderHakkimizda } from './pages/hakkimizda.js'
import { renderSektorler, renderSektorlerDetay } from './pages/sektorler.js'
import { renderIletisim } from './pages/iletisim.js'
import { initReveal } from './components/reveal.js'
import { initContactForm } from './components/contactForm.js'
import { initStatCounters } from './components/statCounter.js'
import { applyMeta } from './seo.js'

const routes = {
    '': { render: renderHome, init: initHome, key: 'home' },
    'hizmetler': { render: renderHizmetler, key: 'hizmetler' },
    'projeler': { render: renderProjeler, key: 'projeler' },
    'hakkimizda': { render: renderHakkimizda, key: 'hakkimizda' },
    'sektorler': { render: renderSektorler, key: 'sektorler' },
    'iletisim': { render: renderIletisim, init: initContactForm, key: 'iletisim' }
}

const detailRoutes = {
    hizmetler: renderHizmetlerDetay,
    projeler: renderProjelerDetay,
    sektorler: renderSektorlerDetay
}

function currentPath() {
    // Eski #/x bağlantıları hâlâ çalışsın: hash varsa path'e çevrilir.
    const hash = window.location.hash.replace(/^#\/?/, '')
    if (hash) {
        window.history.replaceState({}, '', '/' + hash)
    }
    return window.location.pathname.replace(/^\/+|\/+$/g, '')
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
        const [base, slug] = path.split('/')

        applyMeta(path)

        if (slug && detailRoutes[base]) {
            app.innerHTML = detailRoutes[base](slug)
            setActiveNav(base)
            closeMobileNav()
            window.scrollTo({ top: 0, behavior: 'instant' })
            initReveal(app)
            return
        }

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

    // Site içi <a href="/..."> tıklamalarını SPA geçişine çevir.
    document.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        const a = e.target.closest('a[href^="/"]')
        if (!a || a.target === '_blank' || a.hasAttribute('download')) return
        const href = a.getAttribute('href')
        if (href.startsWith('/projects/')) return // statik dosyalar
        e.preventDefault()
        if (href !== window.location.pathname) {
            window.history.pushState({}, '', href)
            render()
        }
    })

    window.addEventListener('popstate', () => render())
    // Eski #/x linkleriyle gelenler için de dinle.
    window.addEventListener('hashchange', () => render())
    render({ transition: false })
}
