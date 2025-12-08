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
        window.location.href = '../index.html';
    },
    
    requireAuth: function(allowedRole) {
        var session = this.getSession();

        if (!session) {
            window.location.href = '../index.html';
            return false;
        }

        if (allowedRole && session.role !== allowedRole) {
            console.error("Access Denied: Role is not " + allowedRole);
            return false;
        }
        
        return true;
    }
};

window.Auth = Auth;
