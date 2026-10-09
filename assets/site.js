document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const modal = document.getElementById('contact-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const firstField = modal.querySelector('input[name="name"]');
  let previousFocus = null;

  function openModal(e) {
    if (e) e.preventDefault();
    previousFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => firstField && firstField.focus(), 30);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }

  document.querySelectorAll('[data-contact-trigger],a[href="/contact/"],a[href="#contact-modal"]').forEach(el => {
    el.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  const form = document.getElementById('cmgl-contact-form');
  if (!form) return;

  // Honeypot field to deter simple automated submissions.
  if (!form.querySelector('[name="website"]')) {
    const trap = document.createElement('div');
    trap.setAttribute('aria-hidden', 'true');
    trap.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
    trap.innerHTML = '<label>Leave this field empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label>';
    form.appendChild(trap);
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const privacyNote = form.querySelector('.privacy-note');
  submitButton.textContent = 'Send enquiry ↗';
  if (privacyNote) privacyNote.textContent = 'Your enquiry will be sent to info@cmgl-x.com.';

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = 'Sending your enquiry securely…';

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Your enquiry could not be sent. Please try again.');
      }

      status.textContent = 'Thank you. Your enquiry has been submitted to CMGL.';
      form.reset();
    } catch (error) {
      status.textContent = error.message || 'We could not send your enquiry. Please try again or email info@cmgl-x.com directly.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});