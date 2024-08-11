import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

const resources = [
    'https://*.googletagmanager.com',
    'plausible.io',
    'static.cloudflareinsights.com',
    '*.ens-app-v3.pages.dev',
    'https://app.intercom.io',
    'https://widget.intercom.io',
    'https://js.intercomcdn.com',
].join(' ');

const frameAncestors = `frame-ancestors 'self' https://app.safe.global;`;

function cspMiddleware(req: NextRequest) {
    const res = NextResponse.next();
    const userAgent = req.headers.get('user-agent')?.toLowerCase() ?? '';

    const isFirefox =
        userAgent.includes('gecko/20100101') && userAgent.includes('firefox/');

    res.headers.set(
        'Content-Security-Policy',
        isFirefox
            ? frameAncestors
            : `worker-src 'self'; script-src 'self' 'sha256-UyYcl+sKCF/ROFZPHBlozJrndwfNiC5KT5ZZfup/pPc=' ${resources} 'wasm-unsafe-eval'; ${frameAncestors}`
    );

    return res;
}

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) {
        return;
    }

    return cspMiddleware(req);
}
