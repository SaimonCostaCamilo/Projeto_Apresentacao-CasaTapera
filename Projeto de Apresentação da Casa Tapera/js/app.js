document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'taperaSavedPlans';
  const form = document.querySelector('#experience-form');
  const resultSection = document.querySelector('#result-section');
  const resultContent = document.querySelector('#result-content');
  const savedList = document.querySelector('#saved-plans');
  const status = document.querySelector('#plan-status');
  let currentPlan = null;
  const loadPlans = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  };
  const renderPlans = () => {
    const plans = loadPlans();
    savedList.replaceChildren();
    if (!plans.length) {
      const empty = document.createElement('li');
      empty.className = 'empty-state';
      empty.textContent = 'Seus roteiros salvos aparecerão aqui.';
      savedList.append(empty);
      return;
    }
    plans.forEach(plan => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = plan.occasion;
      const small = document.createElement('small');
      small.textContent = `${plan.guests} · ${plan.date}`;
      div.append(strong, small);
      const note = document.createElement('span');
      note.textContent = plan.extras.length ? plan.extras.join(' · ') : 'Sem extras selecionados';
      li.append(div, note);
      savedList.append(li);
    });
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    currentPlan = {
      occasion: data.get('occasion'),
      extras: data.getAll('extras'),
      guests: data.get('guestCount'),
      note: document.querySelector('#note').value.trim(),
      date: new Intl.DateTimeFormat('pt-BR').format(new Date())
    };
    resultContent.replaceChildren();
    const p = document.createElement('p');
    p.textContent = `Você está planejando: ${currentPlan.occasion.toLowerCase()}, para ${currentPlan.guests.toLowerCase()}.`;
    const ul = document.createElement('ul');
    [['O clima', currentPlan.occasion], ['Pessoas', currentPlan.guests], ['Extras', currentPlan.extras.join(', ') || 'Deixar a experiência acontecer'], ['Lembrete', currentPlan.note || 'Aproveitar o momento']].forEach(([label, value]) => {
      const li = document.createElement('li');
      const strong = document.createElement('strong');
      strong.textContent = `${label}: `;
      li.append(strong, document.createTextNode(value));
      ul.append(li);
    });
    resultContent.append(p, ul);
    resultSection.hidden = false;
    status.textContent = '';
    resultSection.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
  });
  document.querySelector('#save-plan').addEventListener('click', () => {
    if (!currentPlan) return;
    try {
      const plans = loadPlans();
      plans.unshift(currentPlan);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans.slice(0, 10)));
      status.textContent = 'Roteiro salvo neste navegador.';
      renderPlans();
    } catch { status.textContent = 'Não foi possível salvar o roteiro neste navegador.'; }
  });
  document.querySelector('#print-plan').addEventListener('click', () => window.print());
  document.querySelector('#clear-plans').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    renderPlans();
    status.textContent = 'Histórico local apagado.';
  });
  renderPlans();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
});