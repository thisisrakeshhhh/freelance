document.addEventListener('DOMContentLoaded', function() {
  
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  var loginBtn = document.getElementById('loginBtn');
  var loginOverlay = document.querySelector('.login-overlay');
  var closeLogin = document.getElementById('closeLogin');

  if (loginBtn && loginOverlay) {
    loginBtn.addEventListener('click', function() {
      loginOverlay.style.display = 'flex';
      setTimeout(function() {
        var firstInput = loginOverlay.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    });
  }

  if (closeLogin && loginOverlay) {
    closeLogin.addEventListener('click', function() {
      loginOverlay.style.display = 'none';
      clearFormErrors();
    });
  }

  if (loginOverlay) {
    loginOverlay.addEventListener('click', function(e) {
      if (e.target === loginOverlay) {
        loginOverlay.style.display = 'none';
        clearFormErrors();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && loginOverlay && loginOverlay.style.display === 'flex') {
      loginOverlay.style.display = 'none';
      clearFormErrors();
    }
  });
  
  var tabButtons = document.querySelectorAll('.tab-btn');
  var loginSections = document.querySelectorAll('.login-section');
  
  tabButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      tabButtons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      
      var target = btn.getAttribute('data-target');
      
      loginSections.forEach(function(section) {
        section.style.display = section.id === target ? 'block' : 'none';
      });
      
      clearFormErrors();
    });
  });
  
  var studentForm = document.getElementById('studentLoginForm');
  var adminForm = document.getElementById('adminLoginForm');
  
  if (studentForm) {
    studentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleLogin('student', 'studentId', 'studentPass', studentForm);
    });
  }
  
  if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleLogin('admin', 'adminId', 'adminPass', adminForm);
    });
  }
  
  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      link.classList.add('active');

      // Close mobile menu when link is clicked
      var navLinksEl = document.getElementById('navLinks');
      if (navLinksEl.classList.contains('active')) {
        navLinksEl.classList.remove('active');
      }
    });
  });

  // Hamburger menu toggle
  var hamburgerMenu = document.getElementById('hamburgerMenu');
  var navLinksEl = document.getElementById('navLinks');

  if (hamburgerMenu && navLinksEl) {
    hamburgerMenu.addEventListener('click', function() {
      navLinksEl.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburgerMenu.contains(e.target) && !navLinksEl.contains(e.target)) {
      navLinksEl.classList.remove('active');
    }
  });
  
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      
      setTimeout(function() {
        Toast.success('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
  
  setupPasswordToggles();
});

function handleLogin(role, idField, passField, form) {
  var idInput = document.getElementById(idField);
  var passInput = document.getElementById(passField);
  var submitBtn = form.querySelector('button[type="submit"]');
  
  clearFieldError(idInput);
  clearFieldError(passInput);
  
  var username = idInput.value.trim();
  var password = passInput.value;
  
  var hasError = false;
  
  if (!username) {
    showFieldError(idInput, 'Please enter your ID');
    hasError = true;
  }
  
  if (!password) {
    showFieldError(passInput, 'Please enter your password');
    hasError = true;
  }
  
  if (hasError) return;
  
  var originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Logging in...';
  
  setTimeout(function() {
    var result = Auth.validate(role, username, password);
    
    if (result.success) {
      Auth.login(result.role, result.username);
      Toast.success('Login successful! Redirecting...');
      
      setTimeout(function() {
        if (role === 'admin') {
          window.location.href = 'dashboard/admin-dashboard.html';
        } else {
          window.location.href = 'dashboard/student-dashboard.html';
        }
      }, 500);
    } else {
      Toast.error('Invalid credentials. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      form.classList.add('shake');
      setTimeout(function() { form.classList.remove('shake'); }, 500);
    }
  }, 800);
}

function showFieldError(input, message) {
  var label = input.closest('label');
  input.classList.add('input-error');
  
  var existingError = label.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  var errorEl = document.createElement('span');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  label.appendChild(errorEl);
}

function clearFieldError(input) {
  if (!input) return;
  input.classList.remove('input-error');
  var label = input.closest('label');
  if (label) {
    var error = label.querySelector('.error-message');
    if (error) error.remove();
  }
}

function clearFormErrors() {
  document.querySelectorAll('.input-error').forEach(function(el) { 
    el.classList.remove('input-error'); 
  });
  document.querySelectorAll('.error-message').forEach(function(el) { 
    el.remove(); 
  });
}

function setupPasswordToggles() {
  document.querySelectorAll('input[type="password"]').forEach(function(input) {
    var wrapper = document.createElement('div');
    wrapper.className = 'password-wrapper';
    wrapper.style.cssText = 'position:relative;';
    
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'password-toggle';
    toggle.innerHTML = '👁';
    toggle.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;opacity:0.6;padding:4px;';
    
    toggle.addEventListener('click', function() {
      if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '🙈';
      } else {
        input.type = 'password';
        toggle.innerHTML = '👁';
      }
    });
    
    wrapper.appendChild(toggle);
  });
}
