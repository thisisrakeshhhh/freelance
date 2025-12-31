















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




function loadPage(pageName) {
    const pageUrl = CONFIG.pages[pageName];
    const appView = document.getElementById('app-view');
    const pageTitle = document.getElementById('pageTitle');

    if (!pageUrl) {
        appView.innerHTML = '<p>Page not found</p>';
        return;
    }


    pageTitle.textContent = CONFIG.titles[pageName] || 'Dashboard';


    fetch(pageUrl)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => {
            appView.innerHTML = html;


            initPageFunctionality(pageName);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            appView.innerHTML = '<p>Error loading page. Please try again.</p>';
        });
}




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




document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item:not(.logout)');
    const logoutBtn = document.getElementById('logoutBtn');


    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const page = this.getAttribute('data-page');


            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');


            loadPage(page);
        });
    });


    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('adminLoggedIn');
                window.location.reload();
            }
        });
    }


    loadPage('dashboard');


    initNotifications();
});




function initNotifications() {
    const bellIcon = document.getElementById('notificationBell');
    const dropdown = document.getElementById('notificationDropdown');
    const badge = document.getElementById('notificationBadge');
    const markReadBtn = document.querySelector('.mark-all-read');
    const unreadItems = document.querySelectorAll('.notification-item.unread');

    if (bellIcon && dropdown) {

        bellIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            bellIcon.classList.toggle('active');
        });


        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !bellIcon.contains(e.target)) {
                dropdown.classList.remove('active');
                bellIcon.classList.remove('active');
            }
        });


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




function initDashboard() {

    setTimeout(() => {
        document.getElementById('totalStudents').textContent = '1,245';
        document.getElementById('totalFaculty').textContent = '87';
        document.getElementById('totalDepartments').textContent = '12';
        document.getElementById('totalCourses').textContent = '45';
    }, 100);
}




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


const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];


const reasonTypes = [
    "Medical Emergency",
    "Doctor Appointment",
    "Family Emergency",
    "Personal Work",
    "Illness",
    "Other"
];

function initEarlyLeave() {

    populateReasonDropdown();


    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('leaveDate');
    if (dateInput) {
        dateInput.value = today;
    }


    const reasonSelect = document.getElementById('reasonType');
    const remarksSection = document.getElementById('remarksSection');
    if (reasonSelect && remarksSection) {
        reasonSelect.addEventListener('change', function () {
            if (this.value === 'Other') {
                remarksSection.style.display = 'block';
            } else {
                remarksSection.style.display = 'none';
                document.getElementById('adminRemarks').value = '';
            }
        });
    }
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


window.searchStudent = function () {
    const rollInput = document.getElementById('rollInput');
    const errorMsg = document.getElementById('errorMsg');
    const leaveSection = document.getElementById('leaveSection');
    const searchCard = document.getElementById('searchCard');

    if (!rollInput) return;

    const rollNo = rollInput.value.trim();


    const student = demoStudents.find(s => s.rollNo === rollNo);

    if (student) {

        window.currentStudent = student;


        errorMsg.classList.remove('show');
        searchCard.classList.add('hidden');
        leaveSection.classList.add('active');


        document.getElementById('studentPhoto').src = student.photo;
        document.getElementById('studentName').textContent = student.name;
        document.getElementById('studentClass').textContent = `${student.class} – ${student.year}`;
        document.getElementById('studentRoll').textContent = student.rollNo;


        const today = new Date().toISOString().split('T')[0];
        document.getElementById('leaveDate').value = today;


        setTimeout(() => {
            leaveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);

    } else {

        errorMsg.classList.add('show');
        leaveSection.classList.remove('active');
    }
};





function populatePrintSection(leaveRequest) {

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('printDate').textContent = currentDate;


    const studentPhoto = document.getElementById('studentPhoto').src;
    const parentPhoto = document.getElementById('parentPhoto').src;
    document.getElementById('printStudentPhoto').src = studentPhoto;
    document.getElementById('printParentPhoto').src = parentPhoto;


    document.getElementById('printStudentName').textContent = leaveRequest.student.name;
    document.getElementById('printStudentRoll').textContent = leaveRequest.student.rollNo;
    document.getElementById('printStudentClass').textContent = leaveRequest.student.class;


    const leaveDate = new Date(leaveRequest.leaveDetails.date);
    document.getElementById('printLeaveDate').textContent = leaveDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('printLeaveTime').textContent = leaveRequest.leaveDetails.time;
    document.getElementById('printReason').textContent = leaveRequest.leaveDetails.reason;


    document.getElementById('printGuardian').textContent = leaveRequest.leaveDetails.guardian;
    document.getElementById('printContact').textContent = leaveRequest.leaveDetails.contact;


    const remarksSection = document.getElementById('printRemarksSection');
    const remarksText = document.getElementById('printRemarks');
    if (leaveRequest.leaveDetails.remarks && leaveRequest.leaveDetails.remarks.trim()) {
        remarksSection.style.display = 'block';
        remarksText.textContent = leaveRequest.leaveDetails.remarks;
    } else {
        remarksSection.style.display = 'none';
    }
}


window.submitLeaveRequest = function () {

    const leaveDate = document.getElementById('leaveDate').value;
    const leaveTime = document.getElementById('leaveTime').value;
    const reasonType = document.getElementById('reasonType').value;
    const guardianRelation = document.querySelector('input[name="guardianRelation"]:checked')?.value;
    const contactNumber = document.getElementById('contactNumber').value;
    const adminRemarks = document.getElementById('adminRemarks').value;


    if (!leaveDate || !leaveTime || !reasonType || !contactNumber) {
        alert('Please fill in all required fields');
        return;
    }


    if (reasonType === 'Other' && !adminRemarks.trim()) {
        alert('Please provide remarks when selecting "Other" as reason type');
        return;
    }


    const studentName = document.getElementById('studentName').textContent;
    const studentRoll = document.getElementById('studentRoll').textContent;
    const studentClass = document.getElementById('studentClass').textContent;


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


    console.log('Early Leave Request Submitted:', leaveRequest);


    populatePrintSection(leaveRequest);


    alert(`Early Leave Request Created Successfully!\n\nStudent: ${studentName}\nRoll No: ${studentRoll}\nDate: ${leaveDate}\nTime: ${leaveTime}\n\nPrint dialog will open...`);


    setTimeout(() => {
        window.print();
    }, 500);
};


window.resetForm = function () {
    if (confirm('Are you sure you want to reset the form?')) {
        document.getElementById('leaveDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('leaveTime').value = '';
        document.getElementById('reasonType').value = '';
        document.querySelector('input[name="guardianRelation"][value="Father"]').checked = true;
        document.getElementById('contactNumber').value = '';
        document.getElementById('adminRemarks').value = '';
        document.getElementById('remarksSection').style.display = 'none';
    }
};





function initSettings() {
    const saveBtn = document.querySelector('.save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Settings saved successfully!');
        });
    }
}

