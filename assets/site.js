document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const modal=document.getElementById('contact-modal');
  if(!modal)return;
  const closeBtn=modal.querySelector('.modal-close');
  const firstField=modal.querySelector('input[name="name"]');
  let previousFocus=null;
  function openModal(e){if(e)e.preventDefault();previousFocus=document.activeElement;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>firstField&&firstField.focus(),30)}
  function closeModal(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(previousFocus&&previousFocus.focus)previousFocus.focus()}
  document.querySelectorAll('[data-contact-trigger],a[href="/contact/"],a[href="#contact-modal"]').forEach(el=>el.addEventListener('click',openModal));
  closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('is-open'))closeModal()});
  const form=document.getElementById('cmgl-contact-form');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const subject=encodeURIComponent('CMGL website enquiry — '+data.get('division'));
    const body=encodeURIComponent('Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\nPhone: '+(data.get('phone')||'Not provided')+'\nArea of interest: '+data.get('division')+'\n\nMessage:\n'+data.get('message'));
    const status=form.querySelector('.form-status');
    status.textContent='Opening your email application with the enquiry prepared. Please send the email to complete submission.';
    window.location.href='mailto:info@cmgl-x.com?subject='+subject+'&body='+body;
  });
});