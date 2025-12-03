// main.js: open / close modal, tabs
document.addEventListener('DOMContentLoaded', ()=> {
  // year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // elements
  const modal = document.getElementById('login-modal');
  const openBtn = document.getElementById('open-login');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  const tabs = document.querySelectorAll('.login-tabs .tab');
  const roleInput = document.getElementById('login-role');

  function openModal(){ if(modal) { modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false'); } }
  function closeModal(){ if(modal) { modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); } }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  tabs.forEach(t=>{
    t.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      if (roleInput) roleInput.value = t.dataset.tab; // "student" or "admin"
    });
  });
});
