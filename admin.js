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
        'early-leave': 'admin/earlyleave.html',
        settings: 'admin/settings.html'
    },
    titles: {
        dashboard: 'Dashboard',
        students: 'Manage Students',
        faculty: 'Manage Faculty',
        departments: 'Departments / Courses',
        'early-leave': 'Early Leave Requests',
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
        case 'early-leave':
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

// Demo Student Database
const demoStudents = [
    {
        rollNo: "1011",
        name: "Palak",
        class: "BCA",
        year: "2nd Year",
        photo: "./assets/images/images.jpeg",
        parent: {
            name: "Suresh Kumar",
            relation: "Father",
            photo: "./assets/images/image3.jpg",
            phone: "+91 98765 43210",
            address: "123 Main Street, Cityname"
        }
    },
    {
        rollNo: "1012",
        name: "Rahul Sharma",
        class: "MCA",
        year: "1st Year",
        photo: "./assets/images/images.jpeg",
        parent: {
            name: "Vikram Sharma",
            relation: "Father",
            photo: "./assets/images/image3.jpg",
            phone: "+91 98765 12345",
            address: "456 Park Avenue, Cityname"
        }
    },
    {
        rollNo: "1013",
        name: "Priya Singh",
        class: "BCA",
        year: "3rd Year",
        photo: "./assets/images/images.jpeg",
        parent: {
            name: "Anjali Singh",
            relation: "Mother",
            photo: "./assets/images/image3.jpg",
            phone: "+91 98765 67890",
            address: "789 Garden Road, Cityname"
        }
    },
    {
        rollNo: "1014",
        name: "Amit Kumar",
        class: "MBA",
        year: "2nd Year",
        photo: "./assets/images/images.jpeg",
        parent: {
            name: "Rajesh Kumar",
            relation: "Father",
            photo: "./assets/images/image3.jpg",
            phone: "+91 98765 54321",
            address: "321 Lake View, Cityname"
        }
    }
];

// Time slots for dropdown
const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

// Reason types for dropdown
const reasonTypes = [
    "Medical Emergency",
    "Doctor Appointment",
    "Family Emergency",
    "Personal Work",
    "Illness",
    "Other"
];

function initEarlyLeave() {
    // Populate time dropdown
    populateTimeDropdown();

    // Populate reason dropdown
    populateReasonDropdown();

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('leaveDate');
    if (dateInput) {
        dateInput.value = today;
    }
}

function populateTimeDropdown() {
    const timeSelect = document.getElementById('leaveTime');
    if (!timeSelect) return;

    timeSelect.innerHTML = '<option value="">Select Time</option>';
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

function populateReasonDropdown() {
    const reasonSelect = document.getElementById('reasonType');
    if (!reasonSelect) return;

    reasonSelect.innerHTML = '<option value="">Select Reason</option>';
    reasonTypes.forEach(reason => {
        const option = document.createElement('option');
        option.value = reason;
        option.textContent = reason;
        reasonSelect.appendChild(option);
    });
}

// Search Student Function
window.searchStudent = function () {
    const rollInput = document.getElementById('rollInput');
    const errorMsg = document.getElementById('errorMsg');
    const leaveSection = document.getElementById('leaveSection');
    const searchCard = document.getElementById('searchCard');

    if (!rollInput) return;

    const rollNo = rollInput.value.trim();

    // Search for student in demo database
    const student = demoStudents.find(s => s.rollNo === rollNo);

    if (student) {
        // Store current student globally
        window.currentStudent = student;

        // Student found - display information
        errorMsg.classList.remove('show');
        searchCard.classList.add('hidden');
        leaveSection.classList.add('active');

        // Populate student information
        document.getElementById('studentPhoto').src = student.photo;
        document.getElementById('studentName').textContent = student.name;
        document.getElementById('studentClass').textContent = `${student.class} – ${student.year}`;
        document.getElementById('studentRoll').textContent = student.rollNo;

        // Populate parent information (default to father)
        updateParentInfo('Father');

        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('leaveDate').value = today;

        // Smooth scroll to form
        setTimeout(() => {
            leaveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);

    } else {
        // Student not found
        errorMsg.classList.add('show');
        leaveSection.classList.remove('active');
    }
};

// Update parent information based on selected relation
function updateParentInfo(relation) {
    if (!window.currentStudent) return;

    const parent = relation === 'Father' ? window.currentStudent.parent : window.currentStudent.parent;

    document.getElementById('parentPhoto').src = parent.photo;
    document.getElementById('parentName').textContent = parent.name;
    document.getElementById('parentPhone').textContent = parent.phone;
    document.getElementById('parentAddress').textContent = parent.address;
    document.getElementById('contactNumber').value = parent.phone;
}

// Update contact when radio button changes
window.updateContact = function () {
    const selectedRelation = document.querySelector('input[name="guardianRelation"]:checked').value;
    updateParentInfo(selectedRelation);
};

// Submit Leave Request
window.submitLeaveRequest = function () {
    // Get form values
    const leaveDate = document.getElementById('leaveDate').value;
    const leaveTime = document.getElementById('leaveTime').value;
    const reasonType = document.getElementById('reasonType').value;
    const guardianRelation = document.querySelector('input[name="guardianRelation"]:checked')?.value;
    const contactNumber = document.getElementById('contactNumber').value;
    const adminRemarks = document.getElementById('adminRemarks').value;

    // Validation
    if (!leaveDate || !leaveTime || !reasonType) {
        alert('Please fill in all required fields (Date, Time, and Reason)');
        return;
    }

    // Get student info
    const studentName = document.getElementById('studentName').textContent;
    const studentRoll = document.getElementById('studentRoll').textContent;
    const studentClass = document.getElementById('studentClass').textContent;

    // Create leave request object
    const leaveRequest = {
        student: {
            name: studentName,
            rollNo: studentRoll,
            class: studentClass
        },
        leaveDetails: {
            date: leaveDate,
            time: leaveTime,
            reason: reasonType,
            guardian: guardianRelation,
            contact: contactNumber,
            remarks: adminRemarks
        },
        timestamp: new Date().toISOString()
    };

    // Log the request (in real app, this would be sent to server)
    console.log('Early Leave Request Submitted:', leaveRequest);

    // Show success message
    alert(`Early Leave Request Created Successfully!\n\nStudent: ${studentName}\nRoll No: ${studentRoll}\nDate: ${leaveDate}\nTime: ${leaveTime}\n\nPrint dialog will open...`);

    // Open print dialog
    window.print();
};

// Reset Form
window.resetForm = function () {
    if (confirm('Are you sure you want to reset the form?')) {
        document.getElementById('leaveDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('leaveTime').value = '';
        document.getElementById('reasonType').value = '';
        document.querySelector('input[name="guardianRelation"][value="Father"]').checked = true;
        document.getElementById('adminRemarks').value = '';
    }
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

