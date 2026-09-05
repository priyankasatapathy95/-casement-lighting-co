// ============================================================
// Casement Lighting Co. — script.js
// Shared across all pages. Each init function checks that its
// elements exist before wiring up, so pages without a given
// element (e.g. no form on non-contact pages) are unaffected.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
});

// ------------------------------------------------------------
// Mobile navigation toggle
// ------------------------------------------------------------
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  // Close the mobile menu once a link is chosen
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

// ------------------------------------------------------------
// Contact form validation (real-time + on submit)
// ------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const projectSelect = document.getElementById('project-type');
  const messageInput = document.getElementById('message');
  const statusEl = document.getElementById('form-status');

  const requiredFields = [nameInput, emailInput, projectSelect, messageInput];

  requiredFields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearFieldError(field));
  });

  // Phone is optional, but if filled in, loosely validate it
  if (phoneInput) {
    phoneInput.addEventListener('blur', () => validatePhone(phoneInput));
    phoneInput.addEventListener('input', () => clearFieldError(phoneInput));
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = requiredFields.map(validateField);
    const phoneValid = phoneInput ? validatePhone(phoneInput) : true;

    if (results.every(Boolean) && phoneValid) {
      showFormStatus(statusEl, 'Thanks — your message has been sent. We\'ll reply within 1 business day.', true);
      form.reset();
      [...requiredFields, phoneInput].forEach(field => field && clearFieldError(field));
    } else {
      showFormStatus(statusEl, 'Please fix the highlighted fields before submitting.', false);
    }
  });
}

// Reusable: dispatches to the right rule based on field type
function validateField(field) {
  if (field.id === 'name') return validateRequired(field, 'Please enter your name.');
  if (field.id === 'email') return validateEmail(field);
  if (field.id === 'project-type') return validateRequired(field, 'Please select a project type.');
  if (field.id === 'message') return validateMinLength(field, 10, 'Message must be at least 10 characters.');
  return true;
}

function validateRequired(field, message) {
  const value = field.value.trim();
  if (value.length === 0) {
    setFieldError(field, message);
    return false;
  }
  setFieldValid(field);
  return true;
}

function validateEmail(field) {
  const value = field.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    setFieldError(field, 'Please enter a valid email address.');
    return false;
  }
  setFieldValid(field);
  return true;
}

function validateMinLength(field, min, message) {
  const value = field.value.trim();
  if (value.length < min) {
    setFieldError(field, message);
    return false;
  }
  setFieldValid(field);
  return true;
}

function validatePhone(field) {
  const value = field.value.trim();
  if (value.length === 0) {
    clearFieldError(field);
    return true; // optional field
  }
  const phonePattern = /^[0-9+\-\s()]{7,}$/;
  if (!phonePattern.test(value)) {
    setFieldError(field, 'Please enter a valid phone number, or leave this blank.');
    return false;
  }
  setFieldValid(field);
  return true;
}

// Reusable UI helpers, shared by every validator above
function setFieldError(field, message) {
  field.classList.add('invalid');
  field.classList.remove('valid');
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) errorEl.textContent = message;
}

function setFieldValid(field) {
  field.classList.remove('invalid');
  field.classList.add('valid');
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) errorEl.textContent = '';
}

function clearFieldError(field) {
  field.classList.remove('invalid');
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) errorEl.textContent = '';
}

function showFormStatus(statusEl, message, isSuccess) {
  statusEl.textContent = message;
  statusEl.classList.toggle('success', isSuccess);
  statusEl.classList.toggle('error', !isSuccess);
}
