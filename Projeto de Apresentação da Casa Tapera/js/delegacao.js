// Demonstração de delegação de eventos para elementos criados dinamicamente.
document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('#delegation-list');
  const add = document.querySelector('#delegation-add');
  const input = document.querySelector('#delegation-input');
  if (!list || !add || !input) return;
  add.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) { input.focus(); return; }
    const li = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = value;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'button button-outline';
    remove.dataset.action = 'remove';
    remove.textContent = 'Remover';
    li.append(text, remove);
    list.append(li);
    input.value = '';
    input.focus();
  });
  list.addEventListener('click', event => {
    const button = event.target.closest('button[data-action="remove"]');
    if (button) button.closest('li').remove();
  });
});