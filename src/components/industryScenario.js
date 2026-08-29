import { industries, services } from '../data.js'
import { renderDemo, icons } from './serviceVisuals.js'
import { icon } from '../utils/icons.js'

const ICON_MAP = {
    doc: icons.docIcon, check: icons.checkIcon, coin: icons.coinIcon,
    bell: icons.bellIcon, cal: icons.calIcon, truck: icons.truckIcon,
    star: icons.starIcon, home: icons.homeIcon, book: icons.bookIcon
}

function resolveScreenHTML(screen, activeIndex, ind) {
    const cfg = { ...screen.cfg, activeIndex, navLabels: ind.app?.navLabels, brand: ind.app?.brand, domain: ind.app?.domain }
    if (cfg.icons) cfg.icons = cfg.icons.map(key => ICON_MAP[key] ? ICON_MAP[key]() : '')
    return renderDemo(screen.kind, cfg)
}

function scenarioBodyHTML(ind) {
    const relatedNames = ind.services
        .map(id => services.find(s => s.id === id)?.title)
        .filter(Boolean)

    return `
        <div class="industry-scenario-visual" data-industry-visual>${resolveScreenHTML(ind.screens[0], 0, ind)}</div>
        <div class="industry-scenario-copy">
            <span class="industry-scenario-emoji">${ind.emoji}</span>
            <span class="eyebrow">${ind.name}</span>
            <h3 class="industry-scenario-caption" data-scenario-caption>${ind.screens[0].note || ind.headline}</h3>
            <div class="industry-scenario-services">
                ${relatedNames.map(n => `<span>${n}</span>`).join('')}
            </div>
            <a href="#/iletisim" class="link-arrow">Bize yazın ${icon('arrow')}</a>
        </div>
    `
}

let cycleTimer = null

function stopCycle() {
    window.clearInterval(cycleTimer)
    cycleTimer = null
}

function startCycle(container, ind) {
    stopCycle()
    let step = 0
    cycleTimer = window.setInterval(() => {
        if (!container.isConnected) return stopCycle()
        step = (step + 1) % ind.screens.length
        const visual = container.querySelector('[data-industry-visual]')
        const caption = container.querySelector('[data-scenario-caption]')
        if (!visual) return stopCycle()
        visual.classList.add('is-swapping')
        caption?.classList.add('is-swapping')
        window.setTimeout(() => {
            visual.innerHTML = resolveScreenHTML(ind.screens[step], step, ind)
            visual.classList.remove('is-swapping')
            if (caption) {
                caption.textContent = ind.screens[step].note || ind.headline
                caption.classList.remove('is-swapping')
            }
        }, 220)
    }, 3400)
}

export function industryPickerHTML() {
    return `
        <div class="industry-picker" data-industry-picker>
            ${industries.map((ind, i) => `
                <button type="button" class="industry-chip ${i === 0 ? 'is-active' : ''}" data-industry-index="${i}">
                    <span>${ind.emoji}</span> ${ind.name}
                </button>
            `).join('')}
        </div>
        <div class="industry-scenario" data-industry-scenario>
            ${scenarioBodyHTML(industries[0])}
        </div>
    `
}

export function initIndustryPicker(root = document) {
    const picker = root.querySelector('[data-industry-picker]')
    const scenario = root.querySelector('[data-industry-scenario]')
    if (!picker || !scenario) return

    startCycle(scenario, industries[0])

    picker.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-industry-index]')
        if (!btn) return
        const index = Number(btn.dataset.industryIndex)
        const ind = industries[index]

        picker.querySelectorAll('[data-industry-index]').forEach(b => b.classList.toggle('is-active', b === btn))

        scenario.classList.add('is-swapping')
        window.setTimeout(() => {
            scenario.innerHTML = scenarioBodyHTML(ind)
            scenario.classList.remove('is-swapping')
            startCycle(scenario, ind)
        }, 180)
    })
}
