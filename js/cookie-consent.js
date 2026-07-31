(function() {
function loadMetrika() {
  var id = window.YM_COUNTER_ID;
  if (!id || window.ym) return;
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(id, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
}

var consent = localStorage.getItem('cookie_consent');
if (consent === 'all') { loadMetrika(); return; }
if (consent === 'necessary') { return; }

var style = document.createElement('style');
style.textContent = [
'#ck-bar{position:fixed;bottom:0;left:0;right:0;z-index:9990;background:#111;border-top:1px solid #2a2a2a;padding:14px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-family:Inter,sans-serif;}',
'#ck-bar p{margin:0;font-size:13px;color:#aaa;flex:1;min-width:200px;line-height:1.5;}',
'#ck-bar a{color:#C9A84C;text-decoration:underline;}',
'#ck-ok{background:#C9A84C;color:#000;border:none;padding:10px 22px;font:700 13px/1 Inter,sans-serif;cursor:pointer;white-space:nowrap;flex-shrink:0;}',
'#ck-ok:hover{background:#e0b05a;}',
'#ck-no{background:none;border:1px solid #333;color:#777;padding:10px 18px;font:13px/1 Inter,sans-serif;cursor:pointer;white-space:nowrap;flex-shrink:0;}',
'#ck-no:hover{border-color:#555;color:#aaa;}'
].join('');
document.head.appendChild(style);
var bar = document.createElement('div');
bar.id = 'ck-bar';
bar.innerHTML = '<p>Мы используем файлы cookie и сервисы аналитики (Яндекс.Метрика) для корректной работы сайта. Продолжая использовать сайт, вы соглашаетесь с <a href="/privacy.html">политикой конфиденциальности</a> и обработкой cookie в соответствии с ФЗ-152.</p><button id="ck-ok">Принять</button><button id="ck-no">Только необходимые</button>';
document.body.appendChild(bar);
document.getElementById('ck-ok').addEventListener('click', function() {
  localStorage.setItem('cookie_consent', 'all');
  loadMetrika();
  bar.remove();
});
document.getElementById('ck-no').addEventListener('click', function() {
  localStorage.setItem('cookie_consent', 'necessary');
  bar.remove();
});
})();
