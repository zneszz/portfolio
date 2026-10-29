(function () {
      var r = document.documentElement, b = document.body;
      document.getElementById('theme').addEventListener('click', function () {
        var n = r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        b.classList.add('th'); r.setAttribute('data-theme', n); try {localStorage.setItem('theme', n)} catch (e) { } setTimeout(function () {b.classList.remove('th')}, 450)
      });
      var nav = document.getElementById('nav'), mb = document.getElementById('menu');
      function close() {nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false')}
      mb.addEventListener('click', function () {mb.setAttribute('aria-expanded', nav.classList.toggle('open'))});
      nav.addEventListener('click', function (e) {if (e.target.tagName === 'A') close()});
      document.addEventListener('keydown', function (e) {if (e.key === 'Escape') close()});
      var ls = [].slice.call(nav.querySelectorAll('a'));
      if ('IntersectionObserver' in window) {
        var so = new IntersectionObserver(function (es) {es.forEach(function (e) {if (e.isIntersecting) ls.forEach(function (a) {a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id)})})}, {rootMargin: '-45% 0px -50% 0px'});
        document.querySelectorAll('section[id]').forEach(function (s) {so.observe(s)});
        var ro = new IntersectionObserver(function (es) {es.forEach(function (e) {if (e.isIntersecting) {e.target.classList.add('in'); ro.unobserve(e.target)} })}, {threshold: .1});
        document.querySelectorAll('.rv').forEach(function (el) {ro.observe(el)});
      } else document.querySelectorAll('.rv').forEach(function (el) {el.classList.add('in')});
    })();
    (function () {
      var d = document, dlg = d.getElementById('cmd'), q = d.getElementById('q'), ul = d.getElementById('cmdlist');
      var secs = ['sobre', 'projetos', 'stack', 'trajetoria', 'contato'], L = ['Sobre', 'Projetos', 'Stack', 'Trajetória', 'Contato'];
      d.querySelectorAll('#nav a').forEach(function (a, i) {var k = d.createElement('kbd'); k.textContent = i + 1; k.setAttribute('aria-hidden', 'true'); a.appendChild(k)});
      function go(id) {var el = d.getElementById(id); if (!el) return; el.setAttribute('tabindex', '-1'); el.scrollIntoView(); el.focus({preventScroll: true}); try {history.replaceState(null, '', '#' + id)} catch (e) { } }
      function step(n) {var c = -1; secs.forEach(function (s, i) {if (d.getElementById(s).getBoundingClientRect().top <= innerHeight * .4) c = i}); var x = Math.min(Math.max(c + n, -1), secs.length - 1); go(x < 0 ? 'topo' : secs[x])}
      var cmds = [{k: '0', t: 'Início', f: function () {go('topo')}}];
      secs.forEach(function (s, i) {cmds.push({k: String(i + 1), t: L[i], f: function () {go(s)}})});
      cmds.push({k: 'J', t: 'Próxima seção', f: function () {step(1)}}, {k: 'K', t: 'Seção anterior', f: function () {step(-1)}}, {k: 'P', t: 'Baixar currículo (PDF)', f: function () {window.print()}}, {k: 'T', t: 'Alternar tema claro/escuro', f: function () {d.getElementById('theme').click()}});
      function nz(s) {return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
      function render(f) {ul.innerHTML = ''; cmds.filter(function (c) {return nz(c.t).indexOf(nz(f)) > -1}).forEach(function (c) {var li = d.createElement('li'), b = d.createElement('button'), k = d.createElement('kbd'); b.type = 'button'; b.textContent = c.t; k.textContent = c.k; b.appendChild(k); b.onclick = function () {dlg.close(); c.f()}; li.appendChild(b); ul.appendChild(li)})}
      function open() {dlg.showModal(); q.value = ''; render(''); q.focus()}
      dlg.addEventListener('click', function (e) {if (e.target === dlg) dlg.close()});
      q.addEventListener('input', function () {render(q.value)});
      q.addEventListener('keydown', function (e) {var b = ul.querySelector('button'); if (e.key === 'ArrowDown' && b) {e.preventDefault(); b.focus()} if (e.key === 'Enter' && b) {e.preventDefault(); b.click()} });
      ul.addEventListener('keydown', function (e) {var bs = [].slice.call(ul.querySelectorAll('button')), i = bs.indexOf(d.activeElement); if (e.key === 'ArrowDown') {e.preventDefault(); (bs[i + 1] || bs[i]).focus()} if (e.key === 'ArrowUp') {e.preventDefault(); i > 0 ? bs[i - 1].focus() : q.focus()} });
      d.addEventListener('keydown', function (e) {
        if (dlg.open) return; var t = e.target; if (t.closest && t.closest('input,textarea,select,[contenteditable]')) return;
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {e.preventDefault(); open(); return }
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === '/' || e.key === '?') {e.preventDefault(); open(); return }
        var c = cmds.filter(function (x) {return x.k.toLowerCase() === e.key.toLowerCase()})[0]; if (c) {e.preventDefault(); c.f()}
      });
    })();
    (function () {var e = document.querySelectorAll('.clk'); function t() {var s = new Date().toLocaleTimeString('pt-BR', {hour12: false}); e.forEach(function (n) {n.textContent = s})} t(); setInterval(t, 1000)})();
    (function () {
      var f = document.querySelector('.col'); if (!f) return;
      function on(p) {f.querySelectorAll('g[data-p]').forEach(function (g) {g.classList.toggle('on', g.getAttribute('data-p') === p)})}
      f.querySelectorAll('.leg li').forEach(function (li) {var p = li.getAttribute('data-p');['mouseenter', 'focus'].forEach(function (ev) {li.addEventListener(ev, function () {on(p)})});['mouseleave', 'blur'].forEach(function (ev) {li.addEventListener(ev, function () {on('')})})})
    })();
    (function () {document.querySelectorAll('[data-cv]').forEach(function (b) {b.addEventListener('click', function () {window.print()})})})();
