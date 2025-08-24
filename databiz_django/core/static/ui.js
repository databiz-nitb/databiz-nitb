(function(){
  const qs = (s,el=document)=>el.querySelector(s);
  function renderList(container, items, renderer){
    const el = typeof container==='string'?qs(container):container; if(!el) return;
    el.innerHTML=''; items.forEach(i=>el.appendChild(renderer(i)));
  }
  function makeCard(title, body, link){
    const d=document.createElement('div'); d.className='card';
    const h=document.createElement('h3'); h.textContent=title; d.appendChild(h);
    const p=document.createElement('p'); p.textContent=body||''; d.appendChild(p);
    if(link){ const a=document.createElement('a'); a.href=link; a.textContent='Open'; a.className='btn ghost'; a.style.marginTop='8px'; a.target='_blank'; d.appendChild(a); }
    return d;
  }
  async function fetchJSON(u){ const r=await fetch(u); if(!r.ok) throw new Error('fail'); return r.json(); }

  fetchJSON('/api/magazines').then(list=>{
    renderList('#magazines-grid', list, m=>makeCard(m.title, new Date(m.date).toDateString(), m.url||'/magazine/'));
  }).catch(()=>{});
  fetchJSON('/api/podcasts').then(list=>{
    renderList('#podcasts-grid', list, p=>makeCard(p.title, new Date(p.date).toDateString(), p.url||'/podcast/'));
  }).catch(()=>{});
  fetchJSON('/api/events').then(list=>{
    renderList('#events-list', list, e=>makeCard(e.title, `${e.location} • ${e.date}`));
  }).catch(()=>{});
  fetchJSON('/api/testimonials').then(list=>{
    renderList('#testimonials-grid', list, t=>{ const d=document.createElement('div'); d.className='card'; const q=document.createElement('blockquote'); q.textContent=`“${t.quote}”`; const by=document.createElement('p'); by.textContent=`— ${t.name}`; by.className='muted'; by.style.marginTop='8px'; d.appendChild(q); d.appendChild(by); return d; });
  }).catch(()=>{});

  const slidesEl = qs('#live-slides');
  if (slidesEl && window.EventSource){
    const es = new EventSource('/api/slides/stream');
    es.onmessage = (ev)=>{
      try{ const payload=JSON.parse(ev.data); const slides=payload.slides||[]; slidesEl.innerHTML=''; const rail=document.createElement('div'); rail.style.display='grid'; rail.style.gridAutoFlow='column'; rail.style.gap='12px'; rail.style.overflowX='auto'; slides.forEach(s=>{ const a=document.createElement('a'); a.href=s.link||'#'; a.className='card'; a.textContent=s.title; a.style.minWidth='240px'; a.target='_blank'; rail.appendChild(a); }); slidesEl.appendChild(rail); }catch{}
    };
  }

  function handleForm(formSel, url, statusSel){
    const form=qs(formSel); const status=qs(statusSel); if(!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault(); status.textContent='Submitting...';
      const data=Object.fromEntries(new FormData(form).entries());
      try{ const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const j=await r.json(); if(!r.ok) throw new Error(j.error||''); status.textContent='Thank you!'; form.reset(); }catch{ status.textContent='Submission failed.' }
    })
  }
  handleForm('#join-form','/api/join','#join-status');
  handleForm('#contact-form','/api/contact','#contact-status');
})();
