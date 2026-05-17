// ===== DOM Elements =====
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const adminSidebar = document.querySelector('.admin-sidebar');
const adminNavLinks = document.querySelectorAll('.admin-nav-link');
const adminThemeToggle = document.getElementById('adminThemeToggle');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadForm = document.getElementById('uploadForm');

// ===== Theme Toggle =====
function initAdminTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateAdminThemeIcon(savedTheme);
}

function updateAdminThemeIcon(theme) {
    const icon = adminThemeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

adminThemeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateAdminThemeIcon(newTheme);
});

// ===== Mobile Sidebar Toggle =====
mobileSidebarToggle.addEventListener('click', () => {
    adminSidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.admin-sidebar') && !e.target.closest('.mobile-sidebar-toggle')) {
            adminSidebar.classList.remove('active');
        }
    }
});

// ===== Navigation =====
adminNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active state
        adminNavLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Update page title
        const pageTitle = this.querySelector('span').textContent;
        document.querySelector('.admin-page-title').textContent = pageTitle;
        
        // Show/hide content sections
        const section = this.getAttribute('href').substring(1);
        showSection(section);
        
        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            adminSidebar.classList.remove('active');
        }
    });
});

function showSection(section) {
    // Hide all content sections
    document.querySelectorAll('.admin-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show the selected section
    if (section === 'upload') {
        document.getElementById('uploadContent').style.display = 'block';
    } else {
        document.getElementById('adminContent').style.display = 'block';
    }
}

// ===== File Upload =====
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.backgroundColor = 'var(--bg-tertiary)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.backgroundColor = 'var(--bg-secondary)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.backgroundColor = 'var(--bg-secondary)';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    if (files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        showAdminNotification(`Selected ${files.length} file(s): ${fileNames}`);
        
        // Preview the first image
        if (files[0].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 100%; max-height: 300px; border-radius: 10px; margin-bottom: 15px;">
                    <p style="color: var(--text-secondary);">Click to change image</p>
                `;
            };
            reader.readAsDataURL(files[0]);
        }
    }
}

// ===== Upload Form =====
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate upload
    showAdminNotification('Uploading wallpaper...', 'info');
    
    setTimeout(() => {
        showAdminNotification('Wallpaper uploaded successfully!', 'success');
        uploadForm.reset();
        
        // Reset upload area
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Drag & Drop your wallpaper here</h3>
            <p>or click to browse</p>
        `;
    }, 2000);
});

// ===== Admin Notification System =====
function showAdminNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background-color: ${colors[type] || colors.success};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Table Actions =====
document.addEventListener('click', (e) => {
    // Edit button
    if (e.target.closest('.btn-icon') && e.target.closest('.btn-icon').title === 'Edit') {
        const row = e.target.closest('tr');
        const title = row.cells[1].textContent;
        showAdminNotification(`Editing: ${title}`, 'info');
    }
    
    // Delete button
    if (e.target.closest('.btn-icon') && e.target.closest('.btn-icon').title === 'Delete') {
        const row = e.target.closest('tr');
        const title = row.cells[1].textContent;
        
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            row.remove();
            showAdminNotification(`Deleted: ${title}`, 'success');
        }
    }
});

// ===== Stats Animation =====
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/,/g, ''));
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue).toLocaleString();
                }
            }, 20);
        }
    });
}

// ===== Progress Bars Animation =====
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
}

// ===== Initialize =====
initAdminTheme();

// Animate on page load
window.addEventListener('load', () => {
    animateStats();
    animateProgressBars();
});

// ===== Sample Data Generation =====
function generateSampleData() {
    // This would typically fetch data from an API
    console.log('Admin dashboard initialized');
}

generateSampleData();

// ===== Export Functionality =====
function exportData(format) {
    showAdminNotification(`Exporting data as ${format.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        showAdminNotification(`Data exported successfully!`, 'success');
    }, 1500);
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + U for upload
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        const uploadLink = document.querySelector('a[href="#upload"]');
        uploadLink.click();
    }
    
    // Ctrl/Cmd + D for dashboard
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const dashboardLink = document.querySelector('a[href="#dashboard"]');
        dashboardLink.click();
    }
});

// ===== Real-time Updates Simulation =====
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update a stat
        const stats = document.querySelectorAll('.stat-value');
        if (stats.length > 0) {
            const randomStat = stats[Math.floor(Math.random() * stats.length)];
            const currentValue = parseInt(randomStat.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 10);
            randomStat.textContent = newValue.toLocaleString();
        }
    }, 10000); // Update every 10 seconds
}

// Start real-time updates
simulateRealTimeUpdates();
