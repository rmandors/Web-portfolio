// Contact form submission handler.

(function () {
  var contactFormEndpoint = 'https://formspree.io/f/xkoqgbzk';

  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('.contact-btn');
    var originalText = btn ? btn.textContent : 'Send';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    var formData = new FormData(form);
    var body = {};
    formData.forEach(function (value, key) {
      body[key] = value;
    });

    fetch(contactFormEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (res.ok) {
          if (btn) {
            btn.textContent = 'Sent!';
            btn.style.background = 'var(--green-dark)';
            setTimeout(function () {
              btn.disabled = false;
              btn.textContent = originalText;
              btn.style.background = '';
            }, 3000);
          }
          form.reset();
          showMessage(form, 'Thanks! I\'ll get back to you soon.', true);
        } else {
          throw new Error('Send failed');
        }
      })
      .catch(function () {
        showMessage(form, 'Something went wrong. Please try again.', false);
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      });
  });

  function showMessage(formEl, text, isSuccess) {
    var existing = formEl.querySelector('.contact-form-message');
    if (existing) existing.remove();

    var msg = document.createElement('p');
    msg.className = 'contact-form-message ' + (isSuccess ? 'contact-form-message--success' : 'contact-form-message--error');
    msg.textContent = text;
    msg.setAttribute('role', 'alert');
    formEl.appendChild(msg);

    setTimeout(function () {
      if (msg.parentNode) msg.remove();
    }, 5000);
  }
})();
