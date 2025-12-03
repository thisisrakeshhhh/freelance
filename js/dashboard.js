document.addEventListener('DOMContentLoaded', function() {
  
  var sidebarItems = document.querySelectorAll('.sidebar-nav > ul > li:not(.logout):not(.has-sub)');
  
  sidebarItems.forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.sidebar-nav > ul > li').forEach(function(x) { 
        x.classList.remove('active'); 
      });
      item.classList.add('active');
      Toast.info(item.textContent.trim() + ' - Coming soon!');
    });
    
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  var subMenuItems = document.querySelectorAll('.sidebar-nav li.has-sub');
  
  subMenuItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      if (e.target.closest('.sub')) return;
      item.classList.toggle('open');
    });
    
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!e.target.closest('.sub')) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      }
    });
  });

  var subItems = document.querySelectorAll('.sidebar-nav .sub li');
  
  subItems.forEach(function(subItem) {
    subItem.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelectorAll('.sidebar-nav .sub li').forEach(function(x) { 
        x.classList.remove('active'); 
      });
      subItem.classList.add('active');
      Toast.info(subItem.textContent.trim() + ' - Coming soon!');
    });
    
    subItem.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        subItem.click();
      }
    });
  });

  var menuToggle = document.getElementById('menuToggle');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', toggleSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  function toggleSidebar() {
    var isOpen = sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    menuToggle.textContent = '☰';
  }

  if (window.innerWidth <= 768) {
    sidebarItems.forEach(function(item) {
      item.addEventListener('click', closeSidebar);
    });
  }

  var cards = document.querySelectorAll('.card[data-module]');
  
  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      var module = card.getAttribute('data-module');
      Toast.info(module.charAt(0).toUpperCase() + module.slice(1) + ' module - Coming soon!');
    });
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  var logoutBtn = document.getElementById('logoutBtn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      Toast.success('Logging out...');
      setTimeout(function() {
        Auth.logout();
      }, 500);
    });
    
    logoutBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        logoutBtn.click();
      }
    });
  }

  var resizeTimer;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    }, 250);
  });
});
