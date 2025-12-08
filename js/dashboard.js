const PAGES = {
    dashboard: ``, // Content handled by #dashboard-only-content
    'all-students': `
        <div class="page-module-container">
            <section class="module-header"><h2>All Students</h2><button class="btn btn-primary">+ Add Student</button></section>
            <div class="table-placeholder content-block" style="height: 400px; background: #fff; border-radius: 8px; border: 1px solid #ddd; padding: 20px;">Student table coming soon...</div>
        </div>`,
    'add-student': `
        <div class="page-module-container">
            <h2>Add New Student</h2>
            <form class="form content-block" style="background: #fff; border-radius: 8px; border: 1px solid #ddd; padding: 20px;">
                <input type="text" placeholder="Name" style="padding: 8px; margin-bottom: 10px; display: block; width: 100%;"><br>
                <input type="email" placeholder="Email" style="padding: 8px; margin-bottom: 10px; display: block; width: 100%;"><br>
                <button class="btn btn-primary" type="submit">Save Student</button>
            </form>
        </div>`,
    attendance: `
        <div class="page-module-container">
            <h2>Attendance Management</h2>
            <p class="content-block" style="background: #fff; border-radius: 8px; border: 1px solid #ddd; padding: 20px;">Mark attendance sheet and view reports here...</p>
        </div>`,
    teachers: `<h2>Teachers Management</h2><p class="content-block">All faculty members list...</p>`,
    fees: `<h2>Fee Management</h2><p class="content-block">Payment records & receipts...</p>`,
    timetable: `<h2>Class Timetable</h2><p class="content-block">Schedule editor...</p>`,
    examinations: `<h2>Examinations</h2><p class="content-block">Exam schedules & results...</p>`,
    notifications: `<h2>Notifications</h2><p class="content-block">Send announcements...</p>`,
    settings: `<h2>System Settings</h2><p class="content-block">Configuration panel...</p>`
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
    notifications: "Notifications",
    settings: "System Settings"
};

/**
 * Loads content for the specified page into the main content area.
 * It manages the display toggle between static dashboard content and dynamic page content.
 * @param {string} page The key from the PAGES object to load.
 */
function loadPage(page) {
    const pageTitleElement = document.getElementById('pageTitle') || document.querySelector('.dash-header h1');
    const dynamicContentArea = document.getElementById('dynamic-content') || document.getElementById('dynamic-content-area');
    const dashboardOnly = document.getElementById('dashboard-only-content');

    if (!pageTitleElement || !dynamicContentArea) return;

    pageTitleElement.textContent = TITLES[page] || "Admin Panel";

    if (page === 'dashboard') {
        // Show static dashboard content (#dashboard-only-content) and clear dynamic area
        if (dashboardOnly) dashboardOnly.style.display = 'block';
        dynamicContentArea.innerHTML = '';
    } else {
        // Hide static dashboard content, and inject content into the dynamic area
        if (dashboardOnly) dashboardOnly.style.display = 'none';
        dynamicContentArea.innerHTML = PAGES[page] || "<h2>Page Not Found</h2>";
    }

    updateSidebarActiveState(page);

    if (typeof Toast !== "undefined" && Toast.info) {
        Toast.info(TITLES[page] + " loaded");
    }
}

/**
 * Updates the 'active' class on the sidebar navigation items.
 * @param {string} currentPage The key of the currently loaded page.
 */
function updateSidebarActiveState(currentPage) {
    document.querySelectorAll('.sidebar-nav li').forEach(item => {
        item.classList.remove('active', 'open');
    });

    const activeItem = document.querySelector(`.sidebar-nav li[data-page="${currentPage}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        // Handle submenu opening if the active item is inside one
        const parentSub = activeItem.closest('.has-sub');
        if (parentSub) {
            parentSub.classList.add('open', 'active');
        }
    }
}

/**
 * Reads the current URL parameters and loads the corresponding page.
 */
function router() {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page') || 'dashboard';
    loadPage(currentPage);
}

// Sidebar element references (cached for performance)
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('sidebarOverlay');

/** Toggles the sidebar open/closed state on mobile screens. */
function toggleSidebar() {
    if (!sidebar || !overlay || !menuToggle) return;
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
}

/** Explicitly closes the sidebar. */
function closeSidebar() {
    if (!sidebar || !overlay || !menuToggle) return;
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.textContent = '☰';
}

/** Sets up all event listeners for navigation, sidebar control, and logout. */
function setupNavigationAndEvents() {
    // Navigation click handler (Sidebar items)
    document.querySelectorAll('.sidebar-nav li[data-page]').forEach(li => {
        li.addEventListener('click', (event) => {
            const page = event.currentTarget.getAttribute('data-page');
            // Update URL using History API for SPA navigation
            history.pushState({page}, TITLES[page] || 'Dashboard', `?page=${page}`);
            router();
            if (window.innerWidth <= 768) closeSidebar(); // Close sidebar on mobile after navigation
        });
    });

    // Submenu toggle handler (For items with class .has-sub)
    document.querySelectorAll('.sidebar-nav li.has-sub').forEach(li => {
        li.addEventListener('click', (event) => {
            // Only toggle if the click is directly on the list item or its immediate wrapper
            if (event.target === li || event.target.parentNode === li) {
                li.classList.toggle('open');
            }
        });
    });
    
    // Mobile sidebar controls
    if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Logout button handler
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

    // Browser back/forward button support
    window.addEventListener('popstate', router);
    
    // Close sidebar if window is resized above mobile threshold
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeSidebar();
    });
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Authentication and User Display Logic
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

    // Setup all event listeners
    setupNavigationAndEvents();
    
    // Force correct view on first load by ensuring 'dashboard-only-content' is visible if it's the dashboard page
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page') || 'dashboard';
    
    if (currentPage === 'dashboard') {
        const dashboardOnly = document.getElementById('dashboard-only-content');
        if (dashboardOnly) dashboardOnly.style.display = 'block';
    }
    
    // Load the initial page defined in the URL or default to dashboard
    router();
});