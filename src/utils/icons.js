/* Minimal inline icon set (lucide-style paths), avoids external CDN lookups. */

const wrap = (paths, extra = '') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${paths}</svg>`

export const icons = {
    menu: wrap('<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>'),
    close: wrap('<path d="M18 6 6 18"/><path d="M6 6l12 12"/>'),
    send: wrap('<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>'),
    mail: wrap('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    pin: wrap('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    clock: wrap('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    linkedin: wrap('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
    twitter: wrap('<path d="M4 4l16 16"/><path d="M20 4 4 20"/>', 'style="display:none"'),
    x: wrap('<path d="M4 4l7.5 8L4 20"/><path d="M20 4l-7.5 8L20 20"/><path d="M4 4h4l12 16h-4z"/>'),
    github: wrap('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.3-.4-4.1 1.6a13.8 13.8 0 0 0-7 0C4.9 1.7 3.6 2.1 3.6 2.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 2.2 8.5c0 4.5 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V20"/>'),
    instagram: wrap('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>'),
    arrow: wrap('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    arrowUp: wrap('<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>'),
    bot: wrap('<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>'),
    cpu: wrap('<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>'),
    code: wrap('<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>'),
    chart: wrap('<path d="M3 3v18h18"/><path d="M7 15l4-6 4 3 5-7"/>'),
    link2: wrap('<path d="M9 17H7a5 5 0 0 1 0-10h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>'),
    message: wrap('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    compass: wrap('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'),
    sparkle: wrap('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5"/>'),
}

export function icon(name, cls = '') {
    return (icons[name] || '').replace('<svg ', `<svg class="icon ${cls}" `)
}
