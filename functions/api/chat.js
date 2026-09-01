import { SYSTEM_PROMPT } from '../../src/chat-prompt.js'

/* Sohbet asistanının sunucu tarafı geçidi.
   Groq anahtarı yalnız burada; istemci paketine hiç girmez.
   Anahtar Cloudflare Pages secret'ı olarak durur: GROQ_API_KEY */

const MODEL = 'openai/gpt-oss-120b'
const MAX_TURNS = 20
const MAX_CHARS = 1000

const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    })

export async function onRequestPost({ request, env }) {
    if (!env.GROQ_API_KEY) return json({ error: 'unconfigured' }, 503)

    let govde
    try {
        govde = await request.json()
    } catch {
        return json({ error: 'bad json' }, 400)
    }

    const gelen = Array.isArray(govde?.messages) ? govde.messages : null
    if (!gelen || gelen.length === 0) return json({ error: 'messages required' }, 400)

    /* Ziyaretçiden yalnız konuşma sırası alınır; rol ve uzunluk sınırlanır ki
       uç nokta genel amaçlı bir LLM olarak kullanılamasın. */
    const mesajlar = gelen
        .slice(-MAX_TURNS)
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))

    if (mesajlar.length === 0) return json({ error: 'messages required' }, 400)

    let yanit
    try {
        yanit = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...mesajlar],
                max_tokens: 180,
                temperature: 0.7
            })
        })
    } catch {
        return json({ error: 'upstream unreachable' }, 502)
    }

    if (!yanit.ok) return json({ error: `groq ${yanit.status}` }, 502)

    const veri = await yanit.json()
    const reply = veri?.choices?.[0]?.message?.content
    if (!reply) return json({ error: 'empty reply' }, 502)

    return json({ reply })
}
