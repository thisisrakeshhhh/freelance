document.addEventListener('DOMContentLoaded', function () {

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var loginBtn = document.getElementById('loginBtn');
  var loginOverlay = document.getElementById('loginOverlay');
  var closeLogin = document.getElementById('closeLogin');

  if (loginBtn && loginOverlay) {
    loginBtn.addEventListener('click', function () {
      loginOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        var firstInput = loginOverlay.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    });
  }

  if (closeLogin && loginOverlay) {
    closeLogin.addEventListener('click', function () {
      loginOverlay.classList.remove('active');
      document.body.style.overflow = '';
      clearFormErrors();
    });
  }

  if (loginOverlay) {
    loginOverlay.addEventListener('click', function (e) {
      if (e.target === loginOverlay) {
        loginOverlay.classList.remove('active');
        document.body.style.overflow = '';
        clearFormErrors();
      }
    });
  }


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && loginOverlay && loginOverlay.classList.contains('active')) {
      loginOverlay.classList.remove('active');
      document.body.style.overflow = '';
      clearFormErrors();
    }
  });


  var tabButtons = document.querySelectorAll('.tab-btn');
  var loginSections = document.querySelectorAll('.login-section');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var target = btn.getAttribute('data-target');

      loginSections.forEach(function (section) {
        section.style.display = section.id === target ? 'block' : 'none';
      });

      clearFormErrors();
    });
  });


  var toggleButtons = document.querySelectorAll('.toggle-password');

  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var input = document.getElementById(targetId);
      var icon = btn.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });


  var studentForm = document.getElementById('studentLoginForm');
  var adminForm = document.getElementById('adminLoginForm');
  var facultyForm = document.getElementById('facultyLoginForm');

  if (studentForm) {
    studentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin('student', 'studentId', 'studentPass', studentForm);
    });
  }

  if (adminForm) {
    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin('admin', 'adminId', 'adminPass', adminForm);
    });
  }

  if (facultyForm) {
    facultyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin('faculty', 'facultyId', 'facultyPass', facultyForm);
    });
  }


  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');


      var navLinksEl = document.getElementById('navLinks');
      if (navLinksEl.classList.contains('active')) {
        navLinksEl.classList.remove('active');
      }
    });
  });


  var hamburgerMenu = document.getElementById('hamburgerMenu');
  var navLinksEl = document.getElementById('navLinks');

  if (hamburgerMenu && navLinksEl) {
    hamburgerMenu.addEventListener('click', function () {
      navLinksEl.classList.toggle('active');
      hamburgerMenu.setAttribute('aria-expanded',
        navLinksEl.classList.contains('active')
      );
    });
  }


  document.addEventListener('click', function (e) {
    if (hamburgerMenu && navLinksEl &&
      !hamburgerMenu.contains(e.target) &&
      !navLinksEl.contains(e.target)) {
      navLinksEl.classList.remove('active');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
  });


  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(function () {
        Toast.success('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }


  // Scroll Reveal Animation using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Stats Counter Animation
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const counters = document.querySelectorAll('.count');
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps

          let current = 0;
          const updateCount = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + (counter.getAttribute('data-target') === '87' ? '%' : '');
            }
          };
          updateCount();
        });
        counterObserver.unobserve(statsSection);
      }
    }, { threshold: 0.5 });
    counterObserver.observe(statsSection);
  }


  function updateActiveNavOnScroll() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    function setActiveLink() {
      var scrollY = window.pageYOffset;
      var windowHeight = window.innerHeight;

      sections.forEach(function (section) {
        var sectionTop = section.offsetTop - 100;
        var sectionBottom = sectionTop + section.offsetHeight;
        var sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });


      if (scrollY < 100) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
          }
        });
      }
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
  }

  updateActiveNavOnScroll();
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
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

  setTimeout(function () {

    var isValid = false;
    var userRole = '';

    if (role === 'student' && username === 'student' && password === '123') {
      isValid = true;
      userRole = 'student';
    } else if (role === 'admin' && username === 'admin' && password === 'admin123') {
      isValid = true;
      userRole = 'admin';
    } else if (role === 'faculty' && username === 'faculty' && password === '123') {
      isValid = true;
      userRole = 'faculty';
    }

    if (isValid) {
      Toast.success('Login successful!');

      setTimeout(function () {
        Auth.login(userRole, username);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;


        if (userRole === 'admin') {
          sessionStorage.setItem('adminLoggedIn', 'true');
          window.location.href = './admin/admin.html';
        } else if (userRole === 'faculty') {
          window.location.href = './dashboard/faculty-dashboard.html';
        } else {
          window.location.href = './dashboard/student-dashboard.html';
        }
      }, 500);
    } else {
      Toast.error('Invalid credentials. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      form.classList.add('shake');
      setTimeout(function () { form.classList.remove('shake'); }, 50);
    }
  }, 50);
}

function showFieldError(input, message) {
  var wrapper = input.closest('.input-group') || input.parentElement;
  input.classList.add('input-error');

  var existingError = wrapper.querySelector('.error-message');
  if (existingError) existingError.remove();

  var errorEl = document.createElement('span');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  errorEl.style.cssText = 'color: #dc2626; font-size: 14px; margin-top: 5px; display: block;';
  wrapper.appendChild(errorEl);
}

function clearFieldError(input) {
  if (!input) return;
  input.classList.remove('input-error');
  var wrapper = input.closest('.input-group') || input.parentElement;
  if (wrapper) {
    var error = wrapper.querySelector('.error-message');
    if (error) error.remove();
  }
}

function clearFormErrors() {
  document.querySelectorAll('.input-error').forEach(function (el) {
    el.classList.remove('input-error');
  });
  document.querySelectorAll('.error-message').forEach(function (el) {
    el.remove();
  });
}





document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  /* 
     IMPORTANT: Replace the URL below with your actual Google Apps Script Web App URL.
     It should look like: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
     Make sure you have deployed the script as a "Web App" and set access to "Anyone".
  */
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuQKO0n6-RPVU5U5JwJfCVu7eYMaKhYsVRlIKTZjY3GHLks4DtsJX_TgxITNhBE4DGWg/exec";

  fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch(error => {
      alert("Error! Please try again.");
      console.log(error);
    });
});