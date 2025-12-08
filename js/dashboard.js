const PAGES = {
    dashboard: '',
    'all-students': 'pages/studentmanagement.html',
    'add-student': 'pages/addstudent.html',        
    attendance: 'pages/attendance.html',
    teachers: 'pages/teachers.html',
    fees: 'pages/fees.html',
    timetable: 'pages/timetable.html',
    examinations: 'pages/examinations.html',
    notifications: 'pages/notifications.html',
    settings: 'pages/settings.html',
    staff: 'pages/staffmanagement.html'
};

const TITLES = {
    dashboard: "Dashboard Overview",
    'all-students': "All Students",
    'add-student': "Add New Student",
    attendance: "Attendance Management",
    teachers: "Teachers Management",
    fees: "Fee Management",
    timetable: "Class Timetable",
    examinations: "Examinations",
    notifications: "Notifications & Announcements",
    settings: "System Settings",
    staff: "Staff Management"
};

async function loadPage(page) {
    const pageTitleElement = document.querySelector('.dash-header h1');
    const dynamicContentArea = document.getElementById('dynamic-content');
    const dashboardOnly = document.getElementById('dashboard-only-content');

    if (!pageTitleElement || !dynamicContentArea) {
        console.error("Required elements not found!");
        return;
    }

    pageTitleElement.textContent = TITLES[page] || "Admin Panel";

    if (page === 'dashboard') {
        if (dashboardOnly) dashboardOnly.style.display = 'block';
        dynamicContentArea.innerHTML = '';
        return;
    }

    if (dashboardOnly) dashboardOnly.style.display = 'none';
    dynamicContentArea.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">Loading...</div>';

    try {
        const filePath = PAGES[page];
        if (!filePath) {
            dynamicContentArea.innerHTML = "<h2 style='text-align:center; color:#ef4444;'>Page Not Found</h2>";
            return;
        }

        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const html = await response.text();
        dynamicContentArea.innerHTML = html;

        const scripts = dynamicContentArea.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.text = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

    } catch (err) {
        console.error("Failed to load page:", err);
        dynamicContentArea.innerHTML = `
            <div style="text-align:center; padding:40px; color:#ef4444;">
                <h3>Failed to Load Page</h3>
                <p>${err.message}</p>
                <small>Check file path: <code>${PAGES[page]}</code></small>
            </div>`;
    }

    updateSidebarActiveState(page);

    if (typeof Toast !== "undefined" && Toast.info) {
        Toast.info(TITLES[page] + " loaded");
    }
}

function updateSidebarActiveState(currentPage) {
    document.querySelectorAll('.sidebar-nav li').forEach(item => {
        item.classList.remove('active', 'open');
    });

    const activeItem = document.querySelector(`.sidebar-nav li[data-page="${currentPage}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        const parentSub = activeItem.closest('.has-sub');
        if (parentSub) parentSub.classList.add('open', 'active');
    }
}

function router() {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page') || 'dashboard';
    loadPage(currentPage);
}


document.addEventListener('DOMContentLoaded', function () {
    setupNavigationAndEvents();
    router(); 
});

const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    if (!sidebar || !overlay || !menuToggle) return;
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
}

function closeSidebar() {
    if (!sidebar || !overlay || !menuToggle) return;
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.textContent = '☰';
}

function setupNavigationAndEvents() {
    document.querySelectorAll('.sidebar-nav li[data-page]').forEach(li => {
        li.addEventListener('click', (event) => {
            const page = event.currentTarget.getAttribute('data-page');
            history.pushState({page}, TITLES[page] || 'Dashboard', `?page=${page}`);
            router();
            if (window.innerWidth <= 768) closeSidebar(); 
        });
    });

    document.querySelectorAll('.sidebar-nav li.has-sub').forEach(li => {
        li.addEventListener('click', (event) => {
            if (event.target === li || event.target.parentNode === li) {
                li.classList.toggle('open');
            }
        });
    });
    
    if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (typeof Toast !== "undefined" && Toast.warning) {
                Toast.warning('Logging out...');
            }

            setTimeout(function () {
                if (typeof Auth !== "undefined" && Auth.logout) {
                    Auth.logout();
                }
            }, 800);
        });
    }

    
    window.addEventListener('popstate', router);
    
    
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeSidebar();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    
    setTimeout(function() {
        var currentPath = window.location.pathname;
        var requiredRole = currentPath.includes('admin-dashboard') ? 'admin' : 'student';

        if (typeof Auth !== "undefined" && Auth.requireAuth) {
            if (!Auth.requireAuth(requiredRole)) {
                return;
            }
                            
            var userDisplay = document.getElementById('userName');
            if (userDisplay) {
                var defaultName = requiredRole === 'admin' ? 'Admin' : 'Student';
                userDisplay.textContent = (Auth.getUsername && Auth.getUsername()) || defaultName;
            }
            
            if (typeof Toast !== "undefined" && Toast.success) {
                Toast.success('Welcome to Admin Dashboard!');
            }
        } else {
            console.warn("Auth object not found. Skipping auth check.");
        }
    }, 100);

    
    setupNavigationAndEvents();
    
    
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page') || 'dashboard';
    
    if (currentPage === 'dashboard') {
        const dashboardOnly = document.getElementById('dashboard-only-content');
        if (dashboardOnly) dashboardOnly.style.display = 'block';
    }
    
    
    router();
});