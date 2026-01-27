export async function onRequest() {
  return new Response(JSON.stringify({ now: Date.now() }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}