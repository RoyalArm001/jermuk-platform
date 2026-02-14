export async function loadJSON(url){
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.json();
}

export function formatAMD(n){
  try{
    return new Intl.NumberFormat('hy-AM').format(n);
  }catch{
    return String(n);
  }
}

export function esc(str){
  return String(str ?? '').replace(/[&<>"]/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'
  }[c]));
}
