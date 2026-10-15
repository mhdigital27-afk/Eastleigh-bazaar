export default function middleware(request) {
  const url = new URL(request.url);

  // 1. ALLOW ASSETS (Don't block CSS, Images, or internal scripts)
  if (
    url.pathname.includes('.') || 
    url.pathname.startsWith('/_') || 
    url.pathname.startsWith('/api')
  ) {
    return; 
  }

  // 2. CHECK FOR SECRET ACCESS
  // If you visit: yoursite.com/?admin=true, it unlocks the site for you.
  const cookie = request.headers.get('cookie') || '';
  const hasAccess = url.searchParams.get('admin') === 'true' || cookie.includes('eb_access=true');

  if (hasAccess) {
    // If you just typed the secret link, we set a cookie so you don't have to type it again
    if (url.searchParams.get('admin') === 'true') {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': 'eb_access=true; Path=/; Max-Age=86400; SameSite=Lax',
        },
      });
    }
    return; // Show the real website
  }

  // 3. SHOW "COMING SOON" TO EVERYONE ELSE
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Coming Soon | Eastleigh Bazaar</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { background-color: #020617; color: white; font-family: system-ui, sans-serif; }
            .gold-glow { color: #f59e0b; text-shadow: 0 0 30px rgba(245, 158, 11, 0.4); }
        </style>
    </head>
    <body class="min-h-screen flex items-center justify-center p-8 text-center">
        <div class="max-w-2xl">
            <div class="inline-block w-20 h-20 bg-[#f59e0b] rounded-[1.5rem] mb-10 flex items-center justify-center font-black text-[#020617] text-4xl italic shadow-2xl">EB</div>
            
            <h1 class="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
              EASTLEIGH <br/> <span class="gold-glow">BAZAAR</span>
            </h1>

            <p class="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px] mb-10">
                Official Digital Gateway • System Update in Progress
            </p>

            <div class="h-px w-24 bg-white/10 mx-auto mb-10"></div>

            <p class="text-xl md:text-2xl text-white/60 font-medium italic leading-relaxed">
                We are fine-tuning the trade excellence experience. <br/> 
                The marketplace will open for trading shortly.
            </p>

            <div class="mt-32">
                <p class="text-[9px] font-black uppercase text-white/10 tracking-[0.5em]">
                    © 2026 EASTLEIGH BAZAAR CONNECT
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  });
}
