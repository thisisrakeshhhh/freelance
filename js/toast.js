var Toast = {
    container: null,
    
    init: function() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;max-width:350px;pointer-events:none;';
        document.body.appendChild(this.container);
    },
    
    show: function(message, type, duration) {
        var self = this;
        type = type || 'info';
        duration = duration || 3000;
        
        this.init();
        
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        
        var colors = {
            success: { bg: '#dcfce7', border: '#16a34a', text: '#166534', icon: '✓' },
            error: { bg: '#fee2e2', border: '#dc2626', text: '#991b1b', icon: '✕' },
            warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', icon: '⚠' },
            info: { bg: '#e0e7ff', border: '#6366f1', text: '#3730a3', icon: 'ℹ' }
        };
        
        var style = colors[type] || colors.info;
        
        toast.style.cssText = 'pointer-events:auto;display:flex;align-items:center;gap:12px;padding:14px 18px;background:' + style.bg + ';border-left:4px solid ' + style.border + ';border-radius:8px;color:' + style.text + ';font-size:14px;font-weight:600;box-shadow:0 8px 20px rgba(0,0,0,0.15);animation:slideIn 0.3s ease;cursor:pointer;min-width:280px;';
        
        toast.innerHTML = '<span style="font-size:18px">' + style.icon + '</span><span style="flex:1">' + message + '</span>';
        
        if (!document.getElementById('toast-styles')) {
            var styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}';
            document.head.appendChild(styles);
        }
        
        this.container.appendChild(toast);
        
        var closeTimeout = setTimeout(function() {
            closeToast();
        }, duration);
        
        function closeToast() {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() { if(toast.parentElement) toast.remove(); }, 300);
        }
        
        toast.addEventListener('click', function() {
            clearTimeout(closeTimeout);
            closeToast();
        });
    },
    
    success: function(m) { this.show(m, 'success'); },
    error: function(m) { this.show(m, 'error'); },
    warning: function(m) { this.show(m, 'warning'); },
    info: function(m) { this.show(m, 'info'); }
};

window.Toast = Toast;
