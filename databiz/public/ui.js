(function() {
  const qs = (sel, el=document) => el.querySelector(sel);
  const qsa = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  function renderList(container, items, renderer) {
    const el = typeof container === 'string' ? qs(container) : container;
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => el.appendChild(renderer(item)));
  }

  function makeCard(title, body, link) {
    const div = document.createElement('div');
    div.className = 'card';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    const p = document.createElement('p');
    p.textContent = body || '';
    div.appendChild(h3);
    div.appendChild(p);
    if (link) {
      const a = document.createElement('a');
      a.href = link;
      a.textContent = 'Open';
      a.className = 'btn ghost';
      a.style.marginTop = '8px';
      a.target = '_blank';
      div.appendChild(a);
    }
    return div;
  }

  async function fetchJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Failed ' + url);
    return r.json();
  }

  // Load content grids
  fetchJSON('/api/magazines').then(list => {
    renderList('#magazines-grid', list, m => {
      const link = m.url && m.url !== '#' ? m.url : '/magazine.html';
      return makeCard(m.title, new Date(m.date).toDateString(), link);
    });
  }).catch(() => {});

  fetchJSON('/api/podcasts').then(list => {
    renderList('#podcasts-grid', list, p => {
      const link = p.url && p.url !== '#' ? p.url : '/podcast.html';
      return makeCard(p.title, new Date(p.date).toDateString(), link);
    });
  }).catch(() => {});

  fetchJSON('/api/events').then(list => {
    renderList('#events-list', list, e => makeCard(e.title, `${e.location} • ${e.date}`));
  }).catch(() => {});

  fetchJSON('/api/testimonials').then(list => {
    renderList('#testimonials-grid', list, t => {
      const d = document.createElement('div');
      d.className = 'card';
      const q = document.createElement('blockquote');
      q.textContent = `“${t.quote}”`;
      const by = document.createElement('p');
      by.textContent = `— ${t.name}`;
      by.style.color = 'var(--muted)';
      by.style.marginTop = '8px';
      d.appendChild(q);
      d.appendChild(by);
      return d;
    });
  }).catch(() => {});

  // Forms
  function handleForm(formId, url, statusId) {
    const form = qs(formId);
    const status = qs(statusId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Submitting...';
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Error');
        status.textContent = 'Thank you! We will reach out soon.';
        form.reset();
      } catch (err) {
        status.textContent = 'Submission failed. Please try again.';
      }
    });
  }
  handleForm('#join-form', '/api/join', '#join-status');
  handleForm('#contact-form', '/api/contact', '#contact-status');

  // Live slides via SSE
  const slidesEl = qs('#live-slides');
  if (slidesEl && window.EventSource) {
    const es = new EventSource('/api/slides/stream');
    es.onmessage = (ev) => {
      try {
        const payload = JSON.parse(ev.data);
        const slides = payload.slides || [];
        slidesEl.innerHTML = '';
        const rail = document.createElement('div');
        rail.style.display = 'grid';
        rail.style.gridAutoFlow = 'column';
        rail.style.gap = '12px';
        rail.style.overflowX = 'auto';
        slides.forEach(s => {
          const c = document.createElement('a');
          c.href = s.link || '#';
          c.className = 'card';
          c.textContent = s.title;
          c.style.minWidth = '240px';
          c.target = '_blank';
          rail.appendChild(c);
        });
        slidesEl.appendChild(rail);
      } catch {}
    };
  }
})();