document.addEventListener('DOMContentLoaded',()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('main > section, main > .panel, .admin-heading, .admin-layout > .panel, .visit-card').forEach(el=>{if(!el.classList.contains('reveal')&&!el.classList.contains('bs-reveal'))el.classList.add('reveal')});
 const items=document.querySelectorAll('.reveal,.bs-reveal,.app-photo-story');
 if(!reduce && 'IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{e.target.classList.toggle('is-visible', e.isIntersecting)}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});items.forEach(el=>io.observe(el));}
 else items.forEach(el=>el.classList.add('is-visible'));
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
 const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?scrollY/max*100:0)+'%'};update();addEventListener('scroll',update,{passive:true});
});
