/**
 * cable.folia.app as a Worker.
 *
 *   /api/*  -> /.netlify/functions/:splat   (only tokenimg exists)
 *   /*      -> /index.html (200)
 *   Permissions-Policy: interest-cohort=() on this site's own assets
 *
 * The function is imported rather than reimplemented. An earlier port of this
 * site rewrote it by hand and, among other things, returned Content-Type
 * "image/svg+xml" where the original returns "image/svg" -- the kind of
 * difference that is invisible until something downstream cares about it.
 */
import { handler as tokenimg } from '../../functions/tokenimg'
import { runNetlifyFunction } from './netlify'

const FUNCTIONS = { tokenimg }
const HEADERS = { 'Permissions-Policy': 'interest-cohort=()' }

export default {
  async fetch (request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/')) {
      const rest = url.pathname.slice('/api/'.length)
      const fn = FUNCTIONS[rest.split('/')[0]]
      if (!fn) return new Response('Not Found', { status: 404 })
      // The function reads the token id off the tail of event.path.
      return runNetlifyFunction(fn, request, { path: '/.netlify/functions/' + rest })
    }

    let res = await asset(env, request, url.pathname)
    if (res.status === 404 && url.pathname.endsWith('/')) {
      const idx = await asset(env, request, url.pathname + 'index.html')
      if (idx.status !== 404) res = idx
    }
    if (res.status === 404) {
      const index = await asset(env, request, '/index.html')
      if (index.status !== 404) res = new Response(index.body, { status: 200, headers: index.headers })
    }
    const out = new Response(res.body, res)
    for (const [k, v] of Object.entries(HEADERS)) out.headers.set(k, v)
    return out
  }
}

function asset (env, request, pathname) {
  const u = new URL(request.url)
  u.pathname = pathname
  u.search = ''
  return env.ASSETS.fetch(new Request(u, { method: request.method, headers: request.headers }))
}
