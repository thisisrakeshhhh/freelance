const PAGES = {
    dashboard: '',
    'all-students': 'pages/studentmanagement.html',
    'add-student': 'pages/addstudent.html',
    remove: 'pages/remove.html',
    teachers: 'pages/teachers.html',
    fees: 'pages/fees.html',
    timetable: 'pages/timetable.html',
    examinations: 'pages/examinations.html',
    notifications: 'pages/notifications.html',
    settings: 'pages/settings.html'
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
    settings: "System Settings"
};

async function loadPage(page) {
    const pageTitleElement = document.querySelector('.dash-header h1');
    const dynamicContentArea = document.getElementById('dynamic-content');
    const dashboardOnly = document.getElementById('dashboard-only-content');

    if (!pageTitleElement || !dynamicContentArea) return;

    pageTitleElement.textContent = TITLES[page] || "Admin Panel";

    if (page === 'dashboard') {
        if (dashboardOnly) dashboardOnly.style.display = 'block';
        dynamicContentArea.innerHTML = '';
        return;
    }

    if (dashboardOnly) dashboardOnly.style.display = 'none';
    dynamicContentArea.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Loading...</div>';

    try {
        const filePath = PAGES[page];
        if (!filePath) throw new Error("Page not found in PAGES object");

        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const html = await response.text();
        dynamicContentArea.innerHTML = html;

        // Re-run scripts
        dynamicContentArea.querySelectorAll('script').forEach(old => {
            const script = document.createElement('script');
            script.text = old.textContent;
            old.parentNode.replaceChild(script, old);
        });

    } catch (err) {
        dynamicContentArea.innerHTML = `
            <div style="text-align:center;padding:40px;color:#ef4444;">
                <h3>Failed to Load Page</h3>
                <p>${err.message}</p>
                <small>Check: <code>${PAGES[page] || 'missing'}</code></small>
            </div>`;
    }

    updateSidebarActiveState(page);
}

function updateSidebarActiveState(page) {
    document.querySelectorAll('.sidebar-nav li').forEach(li => {
        li.classList.remove('active', 'open');
    });
    const item = document.querySelector(`[data-page="${page}"]`);
    if (item) {
        item.classList.add('active');
        const parent = item.closest('.has-sub');
        if (parent) parent.classList.add('open', 'active');
    }
}

function router() {
    const page = new URLSearchParams(location.search).get('page') || 'dashboard';
    loadPage(page);
}

// Sidebar clicks
document.querySelectorAll('.sidebar-nav li[data-page]').forEach(item => {
    item.addEventListener('click', e => {
        e.stopPropagation();
        const page = item.getAttribute('data-page');
        history.pushState({page}, '', `?page=${page}`);
        loadPage(page);
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar')?.classList.remove('open');
            document.getElementById('sidebarOverlay')?.classList.remove('open');
        }
    });
});

// Dropdown toggle
document.querySelectorAll('.has-sub').forEach(menu => {
    menu.addEventListener('click', e => {
        if (e.target.closest('[data-page]')) return;
        menu.classList.toggle('open');
    });
});

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
    setupNavigationAndEvents?.();
    router();
});

function setupNavigationAndEvents() {
// ———————— ULTIMATE SIDEBAR CLICK HANDLER (Works Everywhere!) ————————
document.querySelectorAll('.sidebar-nav li[data-page]').forEach(item => {
    item.addEventListener('click', function(e) {
        // Prevent parent "has-sub" from interfering when clicking arrow/text
        e.stopPropagation();

        const page = this.getAttribute('data-page');
        if (!page) return;

        // Update URL
        history.pushState({ page }, '', `?page=${page}`);

        // Update active state for ALL sidebar items
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.classList.remove('active');
        });
        this.classList.add('active');

        // Special: also mark parent "Students" as active when submenu clicked
        const parent = this.closest('.has-sub');
        if (parent) {
            parent.classList.add('active');
        }

        // Load the page
        loadPage(page);

        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar')?.classList.remove('open');
            document.getElementById('sidebarOverlay')?.classList.remove('open');
        }
    });
});

// ———————— Dropdown Toggle for "Students" Menu ————————
document.querySelectorAll('.has-sub').forEach(menu => {
    menu.addEventListener('click', function(e) {
        // Only toggle if clicking the main label (not a submenu item)
        if (e.target.closest('[data-page]') && e.target.closest('[data-page]').hasAttribute('data-page')) {
            return; // Let the data-page handler do its job
        }
        this.classList.toggle('open');
    });
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