export function projectRowHTML(p) {
    return `
    <a class="project-card reveal" href="/projeler/${p.slug}">
        <div class="project-card-head">
            <span class="project-tag">${p.tag}</span>
            <span class="project-year">${p.year}</span>
        </div>
        <div class="project-thumb">${p.image
            ? `<img src="${p.image}" alt="${p.title} ekran görüntüsü" loading="lazy" width="1600" height="800" />`
            : `<span>${p.letter}</span>`}</div>
        <h3>${p.title}</h3>
        <p>${p.short}</p>
        <div class="project-metrics">
            ${p.metrics.map(([label, value]) => `
                <div><strong>${value}</strong>${label}</div>
            `).join('')}
        </div>
    </a>`
}
