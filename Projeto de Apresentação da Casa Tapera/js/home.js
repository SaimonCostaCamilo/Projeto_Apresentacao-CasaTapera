document.addEventListener('DOMContentLoaded', () => {
  // A prévia administrativa usa rascunhos temporários da mesma aba, sem publicar no site.
  const isAdminPreview = window.self !== window.top && new URLSearchParams(window.location.search).get('preview') === 'admin';
  const normalizeSectionHeadings = content => {
    if (!content || typeof content !== 'object') return content;
    content.pageTexts = content.pageTexts || {};
    const first = String(content.pageTexts['experience-heading'] || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR');
    const third = String(content.pageTexts['about-heading'] || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR');
    // Corrige configurações antigas que gravaram o mesmo título nas seções 1 e 3.
    if (first && third && first === third) content.pageTexts['about-heading'] = 'UM LUGAR\nPARA ESTAR\nJUNTO.';
    const aboutEdit = content.sectionEdits && content.sectionEdits.sobre;
    if (aboutEdit && aboutEdit.text && /mais que uma mesa|um encontro/i.test(aboutEdit.text)) aboutEdit.text = 'Mais do que matar a fome, queremos fazer parte dos momentos que merecem ser lembrados. Chegue com fome, traga sua gente e sinta-se em casa.';
    return content;
  };
  const readContent = () => {
    if (isAdminPreview) { try { const draft = sessionStorage.getItem('taperaAdminDraftContent'); if (draft) return normalizeSectionHeadings(JSON.parse(draft)); } catch {} }
    try { return normalizeSectionHeadings(JSON.parse(localStorage.getItem('taperaHomeContent') || 'null')); } catch { return null; }
  };
  const readGallery = () => {
    if (isAdminPreview) { try { const draft = sessionStorage.getItem('taperaAdminDraftGallery'); if (draft) return JSON.parse(draft); } catch {} }
    try { return JSON.parse(localStorage.getItem('taperaGalleryImages') || 'null'); } catch { return null; }
  };

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav-principal');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }

  // Scrolltelling progressivo: revela os blocos quando entram na área visível.
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const updateProgress = () => { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`; };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Reinicia a página ao retornar ao topo depois de percorrer o conteúdo.
  // Não recarrega no primeiro carregamento, evitando um ciclo infinito.
  let hasScrolledDown = window.scrollY > 120;
  let previousScrollY = window.scrollY;
  let topReloadInProgress = false;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > 120) hasScrolledDown = true;
    if (hasScrolledDown && previousScrollY > 30 && currentY <= 2 && !topReloadInProgress) {
      topReloadInProgress = true;
      window.location.reload();
      return;
    }
    previousScrollY = currentY;
  }, { passive: true });
  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    const scenes = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-story-active', entry.isIntersecting)), { threshold: .35 });
    document.querySelectorAll('.story-section').forEach(section => scenes.observe(section));
  }

  const saved = readContent();
  if (saved) {
    const title = document.querySelector('#hero-title');
    const description = document.querySelector('#hero-description');
    if (title && saved.heroTitle) {
      const parts = saved.heroTitle.split('|');
      title.replaceChildren(document.createTextNode(parts[0] || 'SABOR QUE'));
      title.append(document.createElement('br'));
      const span = document.createElement('span');
      span.textContent = parts[1] || 'REÚNE.';
      title.append(span);
    }
    if (description && saved.heroDescription) description.textContent = saved.heroDescription;
    if (saved.heroImage) document.querySelector('.hero-backdrop').style.backgroundImage =
      `linear-gradient(90deg,rgba(0,0,0,.92),rgba(0,0,0,.5)),linear-gradient(0deg,#000,transparent 35%),url("${saved.heroImage.replace(/["\\\\]/g, '')}")`;
    if (saved.footerTagline) {
      const tagline = document.querySelector('.site-footer > p');
      if (tagline) tagline.textContent = saved.footerTagline;
    }
  }
  // O painel administra imagens da capa e de cada seção, incluindo recortes.
  try {
    const gallery = readGallery();
    if (Array.isArray(gallery) && gallery.length) {
      const bySection = key => gallery.filter(item => item && item.src && item.section === key);
      const cover = bySection('cover')[0];
      const hero = document.querySelector('.hero-backdrop');
      if (hero && cover) hero.style.backgroundImage = `linear-gradient(90deg,rgba(0,0,0,.92),rgba(0,0,0,.38)),linear-gradient(0deg,#000,transparent 35%),url("${String(cover.src).replace(/["\\]/g,'')}")`;
      const introImages = [bySection('section1a')[0], bySection('section1b')[0]];
      const addResponsiveGallery = (host, items, className) => { if (!host || !items.length) return; let galleryNode=host.querySelector('.'+className); if(!galleryNode){galleryNode=document.createElement('div');galleryNode.className=className+' responsive-section-gallery';host.append(galleryNode);} galleryNode.replaceChildren(); items.forEach((item,index)=>{const img=document.createElement('img');img.src=item.src;img.alt=item.name||`Imagem adicional ${index+1} Casa Tapera`;img.loading='lazy';img.style.objectPosition=`${item.cropX??50}% ${item.cropY??50}%`;img.style.transformOrigin=`${item.cropX??50}% ${item.cropY??50}%`;img.style.transform=`scale(${item.zoom||1})`;galleryNode.append(img)}); };
      const experienceHost=document.querySelector('#experiencia');
      addResponsiveGallery(experienceHost, [...bySection('section1a').slice(1), ...bySection('section1b').slice(1)], 'extra-experience-images');
      const introMedia = document.querySelectorAll('.intro-visual img, .intro-images img, .intro-gallery img');
      introMedia.forEach((img,i)=>{const item=introImages[i];if(item){img.src=item.src;img.style.objectPosition=`${item.cropX??50}% ${item.cropY??50}%`;img.style.transformOrigin=`${item.cropX??50}% ${item.cropY??50}%`;img.style.transform=`scale(${item.zoom||1})`;img.alt=item.name||'Casa Tapera'}});
      const stripImages=document.querySelectorAll('#experiencia .experience-photo');
      stripImages.forEach((el,i)=>{const item=introImages[i];if(item){el.style.backgroundImage=`url("${String(item.src).replace(/["\\]/g,'')}")`;el.style.backgroundPosition=`${item.cropX??50}% ${item.cropY??50}%`;el.style.backgroundSize=(item.zoom||1)>1?`${(item.zoom||1)*100}% auto`:'cover';el.style.setProperty('--image-zoom',String(item.zoom||1));el.setAttribute('aria-label',item.name||'Imagem Casa Tapera')}});
      const grid=document.querySelector('.dish-grid');
      if(grid){const items=bySection('section2');grid.replaceChildren();items.forEach((item,index)=>{let card=grid.querySelectorAll('.dish-card')[index];if(!card){card=document.createElement('article');card.className='dish-card reveal is-visible';const media=document.createElement('div');media.className='dish-image';const img=document.createElement('img');img.className='dish-image-photo';media.append(img);const number=document.createElement('span');number.className='dish-number';number.textContent=String(index+1).padStart(2,'0');media.append(number);const tag=document.createElement('span');tag.className='dish-tag';media.append(tag);const meta=document.createElement('div');meta.className='dish-meta';const copy=document.createElement('div');copy.innerHTML='<h3></h3><p></p>';meta.append(copy);card.append(media,meta);grid.append(card)}let img=card.querySelector('.dish-image-photo');if(!img){img=document.createElement('img');img.className='dish-image-photo';card.querySelector('.dish-image').prepend(img)}img.src=item.src;img.alt=item.name||`Imagem Casa Tapera ${index+1}`;const defaults=[['Hambúrguer da Casa','Um clássico caprichado, cheio de sabor e preparado para matar a fome.','CLÁSSICO DA CASA'],['Pastel crocante','Massa dourada e recheio saboroso para deixar qualquer pausa melhor.','CROCANTE A CADA MORDIDA'],['Suco natural, fresquinho','Uma pausa leve e refrescante para acompanhar seu pedido.','REFRESCÂNCIA DA CASA'],['Bolinho de batata','Douradinho por fora, macio por dentro e perfeito para petiscar.','PETISCO IRRESISTÍVEL']][index]||[item.name||`Destaque ${index+1}`,'Conheça um dos sabores da Casa Tapera.','DESTAQUE DA CASA'];const heading=card.querySelector('.dish-meta h3');const paragraph=card.querySelector('.dish-meta p');const badge=card.querySelector('.dish-tag');if(heading)heading.textContent=defaults[0];if(paragraph)paragraph.textContent=defaults[1];if(badge)badge.textContent=defaults[2];const number=card.querySelector('.dish-number');if(number)number.textContent=String(index+1).padStart(2,'0');img.style.objectPosition=`${item.cropX??50}% ${item.cropY??50}%`;img.style.transformOrigin=`${item.cropX??50}% ${item.cropY??50}%`;img.style.transform=`scale(${item.zoom||1})`;});}
      const section3Items=bySection('section3');const section3=section3Items[0];const manifesto=document.querySelector('#sobre');if(manifesto&&section3){manifesto.style.setProperty('--section3-image',`url("${String(section3.src).replace(/["\\]/g,'')}")`);const manifestoImage=manifesto.querySelector('.manifesto-image');if(manifestoImage){manifestoImage.style.backgroundImage=`url("${String(section3.src).replace(/["\\]/g,'')}")`;manifestoImage.style.backgroundPosition=`${section3.cropX??50}% ${section3.cropY??50}%`;manifestoImage.style.backgroundSize=(section3.zoom||1)>1?`${(section3.zoom||1)*100}% auto`:'cover'}manifesto.querySelectorAll('.admin-section3-image').forEach(img=>{img.src=section3.src;img.style.objectPosition=`${section3.cropX??50}% ${section3.cropY??50}%`});addResponsiveGallery(manifesto,section3Items.slice(1),'extra-about-images')}
      const section4Items=bySection('section4');const section4=section4Items[0];const visit=document.querySelector('#visite');if(visit&&section4){visit.style.setProperty('--visit-image',`url("${String(section4.src).replace(/["\\]/g,'')}")`);visit.style.setProperty('--visit-position',`${section4.cropX??50}% ${section4.cropY??50}%`);visit.style.setProperty('--visit-zoom',String(section4.zoom||1));visit.style.setProperty('--visit-size',`${(section4.zoom||1)*100}% ${(section4.zoom||1)*100}%`);addResponsiveGallery(visit,section4Items.slice(1),'extra-visit-images')}
    }
  } catch (error) { console.warn('Não foi possível carregar a galeria personalizada da Casa Tapera.',error); }

  // Conteúdo das seções existentes e seções extras criadas pelo administrador.
  try {
    const content = readContent();
    if (content) {
      const edits = content.sectionEdits || {};
      Object.entries(edits).forEach(([id, edit]) => {
        const section = document.getElementById(id);
        if (!section || !edit) return;
        const kicker = section.querySelector('.section-kicker > span:first-child');
        if (kicker && edit.title) kicker.textContent = edit.title;
        if (edit.text) {
          if (id === 'experiencia') { const lead = section.querySelector('.intro-copy .lead'); if (lead) lead.textContent = edit.text; }
          else if (id === 'destaques') { const paragraph = section.querySelector('.highlights-heading > p'); if (paragraph) paragraph.textContent = edit.text; }
          else if (id === 'sobre') { const heading = section.querySelector('.manifesto-content .display-title'); if (heading) heading.textContent = edit.text; }
          else if (id === 'visite') { const heading = section.querySelector('.visit-grid .display-title'); if (heading) heading.textContent = edit.text; }
        }
      });
      const pageTextTargets = {
        'experience-heading':'#experiencia .intro-grid > .display-title',
        'experience-paragraph':'#experiencia .intro-copy p:not(.lead)',
        'experience-link':'#experiencia .underlined-link',
        'highlights-heading':'#destaques .highlights-heading h2',
        'dish1-title':'#destaques .dish-card:nth-child(1) .dish-meta h3',
        'dish1-text':'#destaques .dish-card:nth-child(1) .dish-meta p',
        'dish1-tag':'#destaques .dish-card:nth-child(1) .dish-tag',
        'dish2-title':'#destaques .dish-card:nth-child(2) .dish-meta h3',
        'dish2-text':'#destaques .dish-card:nth-child(2) .dish-meta p',
        'dish2-tag':'#destaques .dish-card:nth-child(2) .dish-tag',
        'dish3-title':'#destaques .dish-card:nth-child(3) .dish-meta h3',
        'dish3-text':'#destaques .dish-card:nth-child(3) .dish-meta p',
        'dish3-tag':'#destaques .dish-card:nth-child(3) .dish-tag',
        'dish4-title':'#destaques .dish-card:nth-child(4) .dish-meta h3',
        'dish4-text':'#destaques .dish-card:nth-child(4) .dish-meta p',
        'dish4-tag':'#destaques .dish-card:nth-child(4) .dish-tag',
        'about-heading':'#sobre .manifesto-content > .display-title',
        'about-eyebrow':'#sobre .manifesto-content > .eyebrow',
        'about-paragraph':'#sobre .manifesto-content > p:not(.eyebrow)',
        'about-button':'#sobre .manifesto-content .button',
        'visit-title':'#visite .visit-grid > div:first-child h2',
        'visit-description':'#visite .visit-copy',
        'visit-location':'#visite .visit-card h3',
        'visit-note':'#visite .visit-card > p:not(.eyebrow)',
        'visit-button':'#visite .visit-card .button',
        'footer-tagline':'.site-footer > p'
      };
      Object.entries(content.pageTexts || {}).forEach(([key, value]) => {
        if (key === 'experience-heading' && /Mais do que matar a fome/i.test(value)) return;
        const target = pageTextTargets[key] && document.querySelector(pageTextTargets[key]);
        if (!target || typeof value !== 'string') return;
        target.replaceChildren();
        const lines = value.split('\n');
        const orangeHeadingKeys = new Set(['experience-heading', 'highlights-heading', 'about-heading', 'visit-title']);
        lines.forEach((line, index) => {
          if (index) target.append(document.createElement('br'));
          // Keep the highlighted final line orange even after the admin editor replaces the original markup.
          if (orangeHeadingKeys.has(key) && index === lines.length - 1) {
            const highlight = document.createElement('em');
            highlight.textContent = line;
            target.append(highlight);
          } else {
            target.append(document.createTextNode(line));
          }
        });
      });
      const textColors = content.pageTextColors || {};
      const colorTargets = {
        'heroTitle':'#hero-title','heroDescription':'#hero-description',
        'section-experiencia':'#experiencia .intro-grid > .display-title, #experiencia .intro-copy',
        'section-destaques':'#destaques .highlights-heading, #destaques .dish-meta',
        'section-sobre':'#sobre .manifesto-content .display-title, #sobre .manifesto-content > p:not(.eyebrow)',
        'section-visite':'#visite .visit-grid .display-title, #visite .visit-copy, #visite .visit-card h3, #visite .visit-card > p:not(.eyebrow)'
      };
      Object.entries(textColors).forEach(([key, color]) => {
        if (!/^#[0-9a-f]{6}$/i.test(color)) return;
        if (colorTargets[key]) document.querySelectorAll(colorTargets[key]).forEach(el => { el.style.color = color; el.querySelectorAll('em,span').forEach(child => child.style.color = color); });
        else if (pageTextTargets[key]) { const el = document.querySelector(pageTextTargets[key]); if (el) { el.style.color = color; el.querySelectorAll('em,span').forEach(child => child.style.color = color); } }
      });
      // Aplica cores a palavras/trechos escolhidos no editor administrativo, tanto na prévia quanto na página publicada.
      Object.entries(content.pageTextHighlights || {}).forEach(([key, highlights]) => {
        const target = pageTextTargets[key] && document.querySelector(pageTextTargets[key]);
        if (!target || !Array.isArray(highlights) || !highlights.length) return;
        // Trabalha apenas em nós de texto. Substituir em innerHTML podia alterar tags/atributos
        // quando a palavra escolhida aparecia dentro do próprio HTML e fazia o texto sumir.
        highlights.forEach(({ text, color }) => {
          if (!text || !/^#[0-9a-f]{6}$/i.test(color || '')) return;
          const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
          const nodes = [];
          while (walker.nextNode()) nodes.push(walker.currentNode);
          nodes.forEach(node => {
            if (!node.parentNode || node.parentElement.closest('[data-admin-colored-fragment]')) return;
            const value = node.nodeValue || '';
            const phrase = String(text);
            let from = 0;
            let at = value.indexOf(phrase, from);
            if (at < 0) return;
            const fragment = document.createDocumentFragment();
            while (at >= 0) {
              if (at > from) fragment.append(document.createTextNode(value.slice(from, at)));
              const span = document.createElement('span');
              span.dataset.adminColoredFragment = 'true';
              span.style.setProperty('color', color, 'important');
              span.textContent = phrase;
              fragment.append(span);
              from = at + phrase.length;
              at = value.indexOf(phrase, from);
            }
            if (from < value.length) fragment.append(document.createTextNode(value.slice(from)));
            node.parentNode.replaceChild(fragment, node);
          });
        });
      });
      const hiddenSections = Array.isArray(content.hiddenSections) ? content.hiddenSections : [];
      const sectionIdsToHide = { experiencia: 'experiencia', destaques: 'destaques', sobre: 'sobre', visite: 'visite' };
      hiddenSections.forEach(id => { const targetId = sectionIdsToHide[id] || id; const section = document.getElementById(targetId); if (section && targetId !== id || section && ['experiencia','destaques','sobre','visite'].includes(id)) section.hidden = true; });
      const customs = Array.isArray(content.customSections) ? content.customSections : [];
      const galleryItems = (readGallery() || []);
      const main = document.querySelector('main');
      const footer = document.querySelector('.site-footer');
      customs.forEach((item, index) => {
        if (!main || !item || !item.id) return;
        const section = document.createElement('section');
        section.id = item.id; section.className = 'custom-story-section story-section section-pad';
        section.dataset.customSection = 'true';
        const kicker = document.createElement('div'); kicker.className = 'section-kicker reveal';
        const kickerText = document.createElement('span'); kickerText.textContent = item.tag || `${String(index + 5).padStart(2, '0')} / ${item.title || 'NOVA SEÇÃO'}`;
        const line = document.createElement('span'); line.className = 'kicker-line'; kicker.append(kickerText, line);
        const layout = document.createElement('div'); layout.className = 'custom-story-layout reveal';
        const copy = document.createElement('div'); copy.className = 'custom-story-copy';
        const heading = document.createElement('h2'); heading.className = 'display-title'; heading.textContent = item.title || 'Nova seção';
        const paragraph = document.createElement('p'); paragraph.textContent = item.text || '';
        copy.append(heading, paragraph); layout.append(copy);
        const selected = Number.isInteger(item.imageIndex) ? galleryItems[item.imageIndex] : null;
        if (selected && selected.src) {
          const media = document.createElement('div'); media.className = 'custom-story-media';
          const img = document.createElement('img'); img.src = selected.src; img.alt = selected.name || item.title || 'Imagem da Casa Tapera';
          img.style.objectPosition = `${selected.cropX ?? 50}% ${selected.cropY ?? 50}%`;
          img.style.transform = `scale(${selected.zoom || 1})`; img.style.transformOrigin = `${selected.cropX ?? 50}% ${selected.cropY ?? 50}%`;
          media.append(img); layout.append(media);
        }
        section.append(kicker, layout);
        if (hiddenSections.includes(item.id)) section.hidden = true;
        main.insertBefore(section, footer && footer.parentElement === main ? footer : null);
        if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const customReveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); customReveal.unobserve(entry.target); } }), { threshold: .12 }); section.querySelectorAll('.reveal').forEach(el => customReveal.observe(el)); } else { section.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible')); }
      });
      // Aplica a ordem definida no painel administrativo à estrutura real da home.
      const order = Array.isArray(content.sectionOrder) ? content.sectionOrder : [];
      const mainElement = document.querySelector('main');
      const footerElement = document.querySelector('.site-footer');
      const idsByAdminOrder = order.map(id => ({
        cover: null,
        experiencia: 'experiencia',
        destaques: 'destaques',
        sobre: 'sobre',
        visite: 'visite'
      }[id] || id)).filter(Boolean);
      if (mainElement && idsByAdminOrder.length) {
        const known = new Set(['experiencia','destaques','sobre','visite', ...((Array.isArray(content.customSections) ? content.customSections : []).map(item => item.id))]);
        idsByAdminOrder.filter(id => known.has(id)).forEach(id => {
          const section = document.getElementById(id);
          if (section && section.parentElement === mainElement) mainElement.insertBefore(section, footerElement && footerElement.parentElement === mainElement ? footerElement : null);
        });
      }
    }
  } catch (error) { console.warn('Não foi possível aplicar as seções personalizadas.', error); }

  // Sincroniza a página principal quando o painel salva alterações em outra aba.
  window.addEventListener('storage', event => { if (event.key === 'taperaContentUpdatedAt') window.location.reload(); });
  try { const channel = new BroadcastChannel('tapera-content'); channel.addEventListener('message', event => { if (event.data && event.data.updated) window.location.reload(); }); } catch {}

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
});