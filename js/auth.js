var Auth = {
  SESSION_KEY: 'cms_session',
  
  login: function(role, username) {
    var session = {
      role: role,
      username: username,
      loginTime: Date.now()
    };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  },
  
  getSession: function() {
    var session = sessionStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },
  
  isLoggedIn: function() {
    return this.getSession() !== null;
  },
  
  getRole: function() {
    var session = this.getSession();
    return session ? session.role : null;
  },
  
  getUsername: function() {
    var session = this.getSession();
    return session ? session.username : null;
  },
  
  logout: function() {
    sessionStorage.removeItem(this.SESSION_KEY);
    window.location.href = this.getBasePath() + 'index.html';
  },
  
  getBasePath: function() {
    return window.location.pathname.includes('/dashboard/') ? '../' : '';
  },
  
  requireAuth: function(allowedRole) {
    if (!this.isLoggedIn()) {
      window.location.href = this.getBasePath() + 'index.html';
      return false;
    }
    
    if (allowedRole && this.getRole() !== allowedRole) {
      var role = this.getRole();
      if (role === 'admin') {
        window.location.href = this.getBasePath() + 'dashboard/admin-dashboard.html';
      } else {
        window.location.href = this.getBasePath() + 'dashboard/student-dashboard.html';
      }
      return false;
    }
    
    return true;
  },
  
  validate: function(role, username, password) {
    var users = {
      admin: { username: 'admin', password: '123' },
      student: { username: 'student', password: '123' }
    };
    
    var user = users[role];
    if (user && user.username === username && user.password === password) {
      return { success: true, role: role, username: username };
    }
    return { success: false, message: 'Invalid credentials' };
  }
};

window.Auth = Auth;
