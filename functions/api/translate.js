
export async function onRequestPost({ request }) {
  const { text, from, to } = await request.json();
  if (!text || !to) {
    return new Response(JSON.stringify({ error: 'bad_request' }), { status: 400 });
  }

  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: from || 'hy',
      target: to,
      format: 'text'
    })
  });

  const data = await res.json();
  return new Response(JSON.stringify({ translated: data.translatedText || '' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
