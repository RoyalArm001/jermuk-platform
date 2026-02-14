export function getRoute(){
  const hash = location.hash || '#/';
  const cleaned = hash.replace(/^#/, '');
  const parts = cleaned.split('/').filter(Boolean);
  return {
    path: '/' + (parts[0] || ''),
    parts
  };
}

export function onRouteChange(cb){
  window.addEventListener('hashchange', cb);
  window.addEventListener('load', cb);
}

export function navTo(path){
  location.hash = '#' + path;
}
