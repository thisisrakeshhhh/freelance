/* ================================================
   ADMIN DASHBOARD WITH COMPONENT ROUTING
   ================================================ */

// ================================================
// AUTHENTICATION CHECK
// ================================================
// (function checkAuth() {
//     const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
//     if (!isLoggedIn || isLoggedIn !== 'true') {
//         // alert('Please login as Admin to access this page.');
//         // window.location.href = '../index.html';
//     }
// })();

// ================================================
// ROUTING CONFIGURATION
// ================================================
const CONFIG = {
    pages: {
        dashboard: 'admin/dashboard.html',
        students: 'admin/students.html',
        faculty: 'admin/faculty.html',
        departments: 'admin/departments.html',
        'early leave': 'admin/earlyleave.html',
        settings: 'admin/settings.html'
    },
    titles: {
        dashboard: 'Dashboard',
        students: 'Manage Students',
        faculty: 'Manage Faculty',
        departments: 'Departments / Courses',
        'early leave': 'Early Leave Requests',
        settings: 'Settings'
    }
};

// ================================================
// ROUTING FUNCTIONS
// ================================================
function loadPage(pageName) {
    const pageUrl = CONFIG.pages[pageName];
    const appView = document.getElementById('app-view');
    const pageTitle = document.getElementById('pageTitle');

    if (!pageUrl) {
        appView.innerHTML = '<p>Page not found</p>';
        return;
    }

    // Update page title
    pageTitle.textContent = CONFIG.titles[pageName] || 'Dashboard';

    // Load component
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => {
            appView.innerHTML = html;

            // Initialize page-specific functionality
            initPageFunctionality(pageName);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            appView.innerHTML = '<p>Error loading page. Please try again.</p>';
        });
}

// ================================================
// PAGE-SPECIFIC INITIALIZATION
// ================================================
function initPageFunctionality(pageName) {
    switch (pageName) {
        case 'dashboard':
            initDashboard();
            break;
        case 'students':
            initStudents();
            break;
        case 'faculty':
            initFaculty();
            break;
        case 'departments':
            initDepartments();
            break;
        case 'early leave':
            initEarlyLeave();
            break;
        case 'settings':
            initSettings();
            break;
    }
}

// ================================================
// NAVIGATION HANDLER
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item:not(.logout)');
    const logoutBtn = document.getElementById('logoutBtn');

    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const page = this.getAttribute('data-page');

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Load page
            loadPage(page);
        });
    });

    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('adminLoggedIn');
                window.location.href = '../index.html';
            }
        });
    }

    // Load default page (dashboard)
    loadPage('dashboard');

    // Initialize Notifications
    initNotifications();
});

// ================================================
// NOTIFICATION FUNCTIONS
// ================================================
function initNotifications() {
    const bellIcon = document.getElementById('notificationBell');
    const dropdown = document.getElementById('notificationDropdown');
    const badge = document.getElementById('notificationBadge');
    const markReadBtn = document.querySelector('.mark-all-read');
    const unreadItems = document.querySelectorAll('.notification-item.unread');

    if (bellIcon && dropdown) {
        // Toggle dropdown
        bellIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            bellIcon.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !bellIcon.contains(e.target)) {
                dropdown.classList.remove('active');
                bellIcon.classList.remove('active');
            }
        });

        // Mark all as read
        if (markReadBtn) {
            markReadBtn.addEventListener('click', () => {
                const unread = document.querySelectorAll('.notification-item.unread');
                unread.forEach(item => {
                    item.classList.remove('unread');
                });

                if (badge) {
                    badge.style.display = 'none';
                }
            });
        }
    }
}

// ================================================
// DASHBOARD FUNCTIONS
// ================================================
function initDashboard() {
    // Update statistics dynamically
    setTimeout(() => {
        document.getElementById('totalStudents').textContent = '1,245';
        document.getElementById('totalFaculty').textContent = '87';
        document.getElementById('totalDepartments').textContent = '12';
        document.getElementById('totalCourses').textContent = '45';
    }, 100);
}

// ================================================
// STUDENTS FUNCTIONS
// ================================================
let students = [
    { id: 'S001', name: 'Rahul Sharma', dept: 'BCA', year: '1', email: 'rahul.sharma@student.edu' },
    { id: 'S002', name: 'Priya Singh', dept: 'MCA', year: '2', email: 'priya.singh@student.edu' },
    { id: 'S003', name: 'Amit Kumar', dept: 'MBA', year: '1', email: 'amit.kumar@student.edu' },
    { id: 'S004', name: 'Sneha Patel', dept: 'BTech', year: '3', email: 'sneha.patel@student.edu' }
];

function initStudents() {
    renderStudentsTable();

    const addBtn = document.getElementById('addStudentBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => openStudentModal());
    }
}

function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    tbody.innerHTML = students.map((student, index) => `
    <tr>
      <td>${student.id}</td>
      <td><strong>${student.name}</strong></td>
      <td><span class="dept-badge">${student.dept}</span></td>
      <td>${student.year} Year</td>
      <td>${student.email}</td>
      <td>
        <button class="btn btn-edit" onclick="editStudent(${index})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-delete" onclick="deleteStudent(${index})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function openStudentModal() {
    // This would open a modal (simplified for now)
    const name = prompt('Enter student name:');
    if (name) {
        students.push({
            id: `S${String(students.length + 1).padStart(3, '0')}`,
            name: name,
            dept: 'BCA',
            year: '1',
            email: `${name.toLowerCase().replace(' ', '.')}@student.edu`
        });
        renderStudentsTable();
    }
}

window.editStudent = function (index) {
    const student = students[index];
    const newName = prompt('Edit student name:', student.name);
    if (newName) {
        students[index].name = newName;
        renderStudentsTable();
    }
};

window.deleteStudent = function (index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        renderStudentsTable();
    }
};

// ================================================
// FACULTY FUNCTIONS
// ================================================
let faculty = [
    { id: 'F001', name: 'Prof. Rajesh Kumar', dept: 'BCA', position: 'Professor', email: 'rajesh.kumar@college.edu' },
    { id: 'F002', name: 'Dr. Meena Sharma', dept: 'MCA', position: 'Associate Professor', email: 'meena.sharma@college.edu' },
    { id: 'F003', name: 'Mr. Suresh Patel', dept: 'MBA', position: 'Assistant Professor', email: 'suresh.patel@college.edu' }
];

function initFaculty() {
    renderFacultyTable();

    const addBtn = document.getElementById('addFacultyBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => openFacultyModal());
    }
}

function renderFacultyTable() {
    const tbody = document.getElementById('facultyTableBody');
    if (!tbody) return;

    tbody.innerHTML = faculty.map((fac, index) => `
    <tr>
      <td>${fac.id}</td>
      <td><strong>${fac.name}</strong></td>
      <td><span class="dept-badge">${fac.dept}</span></td>
      <td>${fac.position}</td>
      <td>${fac.email}</td>
      <td>
        <button class="btn btn-edit" onclick="editFaculty(${index})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-delete" onclick="deleteFaculty(${index})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function openFacultyModal() {
    const name = prompt('Enter faculty name:');
    if (name) {
        faculty.push({
            id: `F${String(faculty.length + 1).padStart(3, '0')}`,
            name: name,
            dept: 'BCA',
            position: 'Assistant Professor',
            email: `${name.toLowerCase().replace(' ', '.')}@college.edu`
        });
        renderFacultyTable();
    }
}

window.editFaculty = function (index) {
    const fac = faculty[index];
    const newName = prompt('Edit faculty name:', fac.name);
    if (newName) {
        faculty[index].name = newName;
        renderFacultyTable();
    }
};

window.deleteFaculty = function (index) {
    if (confirm('Are you sure you want to delete this faculty member?')) {
        faculty.splice(index, 1);
        renderFacultyTable();
    }
};

// ================================================
// DEPARTMENTS FUNCTIONS
// ================================================
let departments = [
    { name: 'BCA', fullName: 'Bachelor of Computer Applications', students: 245, faculty: 18 },
    { name: 'MCA', fullName: 'Master of Computer Applications', students: 156, faculty: 12 },
    { name: 'MBA', fullName: 'Master of Business Administration', students: 423, faculty: 28 },
    { name: 'BTech', fullName: 'Bachelor of Technology', students: 421, faculty: 29 }
];

function initDepartments() {
    renderDepartments();
}

function renderDepartments() {
    const grid = document.getElementById('departmentsGrid');
    if (!grid) return;

    grid.innerHTML = departments.map(dept => `
    <div class="dept-card">
      <h4>${dept.name}</h4>
      <p><strong>${dept.fullName}</strong></p>
      <p>Students: <strong>${dept.students}</strong></p>
      <p>Faculty: <strong>${dept.faculty}</strong></p>
    </div>
  `).join('');
}

// ================================================
// EARLY LEAVE FUNCTIONS
// ================================================
function initEarlyLeave() {
    renderLeaveRequests();
}

function renderLeaveRequests() {
    const tbody = document.getElementById('leaveRequestsBody');
    if (!tbody) return;

    const leaveRequests = [
        { id: 'L001', student: 'Rahul Sharma', date: '2024-12-23', reason: 'Medical', status: 'pending' },
        { id: 'L002', student: 'Priya Singh', date: '2024-12-23', reason: 'Personal', status: 'approved' },
        { id: 'L003', student: 'Amit Kumar', date: '2024-12-24', reason: 'Family Emergency', status: 'pending' }
    ];

    tbody.innerHTML = leaveRequests.map((req, index) => `
    <tr>
      <td>${req.id}</td>
      <td><strong>${req.student}</strong></td>
      <td>${req.date}</td>
      <td>${req.reason}</td>
      <td>
        <span class="status-badge status-${req.status}">${req.status.toUpperCase()}</span>
      </td>
      <td>
        ${req.status === 'pending' ? `
          <button class="btn btn-edit" onclick="approveLeave(${index})">
            <i class="fas fa-check"></i> Approve
          </button>
          <button class="btn btn-delete" onclick="rejectLeave(${index})">
            <i class="fas fa-times"></i> Reject
          </button>
        ` : '<span>-</span>'}
      </td>
    </tr>
  `).join('');
}

window.approveLeave = function (index) {
    alert('Leave request approved!');
    renderLeaveRequests();
};

window.rejectLeave = function (index) {
    alert('Leave request rejected!');
    renderLeaveRequests();
};

// ================================================
// SETTINGS FUNCTIONS
// ================================================
function initSettings() {
    const saveBtn = document.querySelector('.save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Settings saved successfully!');
        });
    }
}

function loadStudent() {
    const roll = document.getElementById("rollInput").value;
    const section = document.getElementById("leaveSection");
    const error = document.getElementById("errorMsg");

    // Dummy roll number (for now)
    if (roll === "101") {
        section.style.display = "block";
        error.style.display = "none";

        // Optional: change details dynamically
        document.getElementById("studentName").innerText = "Palak";
        document.getElementById("studentClass").innerText = "BCA – 2nd Year";
        document.getElementById("parentName").innerText = "Mr. Suresh Kumar";

    } else {
        section.style.display = "none";
        error.style.display = "block";
    }
}
