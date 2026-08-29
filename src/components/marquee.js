export function marqueeHTML(items, extraClass = '') {
    const track = items.join('</span><span>')
    return `
    <div class="marquee ${extraClass}">
        <span>${track}</span><span>${track}</span>
    </div>`
}
