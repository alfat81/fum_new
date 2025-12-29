// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    const adminTab = document.getElementById('admin-tab');
    const adminPanel = document.getElementById('admin-panel');
    const closeAdminPanel = document.getElementById('close-admin-panel');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginBtn = document.getElementById('login-admin-btn');
    const adminLogin = document.querySelector('.admin-login');
    
    // Admin panel toggle
    if (adminTab && adminPanel) {
        adminTab.addEventListener('click', function() {
            adminPanel.classList.add('active');
            adminTab.style.display = 'none';
        });
    }

    // Close admin panel
    if (closeAdminPanel) {
        closeAdminPanel.addEventListener('click', function() {
            adminPanel.classList.remove('active');
            setTimeout(() => {
                if (adminTab) adminTab.style.display = 'block';
            }, 300);
        });
    }

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Admin login functionality
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const password = document.getElementById('admin-password').value;
            const loginMessage = document.getElementById('login-message');
            
            // Simple password check (in real app, this would be server-side)
            if (password === 'admin123') { // Default password, should be changed
                loginMessage.textContent = 'Успешный вход!';
                loginMessage.style.color = 'green';
                adminLogin.style.display = 'none';
                
                // Show admin functions
                document.querySelectorAll('.admin-protected').forEach(el => {
                    el.style.display = 'block';
                });
            } else {
                loginMessage.textContent = 'Неверный пароль!';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Mock data for demonstration
    const commissionData = {
        leaders: [
            { id: 1, name: 'Серов Дмитрий Андреевич', position: 'Председатель комиссии', region: 'Нижний Новгород', phone: '+7 (977) 823-63-90', email: 'serovdima@list.ru', icon: 'crown' },
            { id: 2, name: 'Петров Иван Сергеевич', position: 'Заместитель председателя', region: 'Москва', phone: '+7 (900) 123-45-67', email: 'petrov@example.com', icon: 'user-tie' }
        ],
        regions: [
            { id: 1, region: 'Нижегородская область', representative: 'Серов Дмитрий Андреевич', position: 'Председатель комиссии', phone: '+7 (977) 823-63-90', email: 'serovdima@list.ru' },
            { id: 2, region: 'Ленинградская область', representative: 'Иванов Алексей Петрович', position: 'Региональный координатор', phone: '+7 (900) 765-43-21', email: 'ivanov@example.com' }
        ]
    };

    // Display initial data
    displayLeaders();
    displayRegions();

    // Add leader functionality
    const addLeaderBtn = document.getElementById('add-leader-btn');
    if (addLeaderBtn) {
        addLeaderBtn.addEventListener('click', function() {
            const name = document.getElementById('leader-name').value;
            const position = document.getElementById('leader-position').value;
            const region = document.getElementById('leader-region').value;
            const phone = document.getElementById('leader-phone').value;
            const email = document.getElementById('leader-email').value;
            const icon = document.getElementById('leader-icon').value;
            
            if (name && position) {
                const newLeader = {
                    id: Date.now(),
                    name: name,
                    position: position,
                    region: region || '',
                    phone: phone || '',
                    email: email || '',
                    icon: icon || 'user-tie'
                };
                
                commissionData.leaders.push(newLeader);
                displayLeaders();
                clearLeaderForm();
            }
        });
    }

    // Add region functionality
    const addRegionBtn = document.getElementById('add-region-btn');
    if (addRegionBtn) {
        addRegionBtn.addEventListener('click', function() {
            const region = document.getElementById('region-name').value;
            const representative = document.getElementById('representative-name').value;
            const position = document.getElementById('representative-position').value;
            const phone = document.getElementById('representative-phone').value;
            const email = document.getElementById('representative-email').value;
            
            if (region && representative) {
                const newRegion = {
                    id: Date.now(),
                    region: region,
                    representative: representative,
                    position: position || '',
                    phone: phone || '',
                    email: email || ''
                };
                
                commissionData.regions.push(newRegion);
                displayRegions();
                clearRegionForm();
            }
        });
    }

    // Save settings functionality
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            const pageTitle = document.getElementById('page-title').value;
            const metaDescription = document.getElementById('meta-description').value;
            
            // Update document title
            if (pageTitle) document.title = pageTitle;
            
            // Update meta description (if exists)
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            if (metaDescription) metaDesc.content = metaDescription;
            
            alert('Настройки успешно сохранены!');
        });
    }

    // Delete leader functionality
    function setupDeleteLeaderButtons() {
        document.querySelectorAll('.delete-leader').forEach(btn => {
            btn.removeEventListener('click', handleDeleteLeader); // Remove existing listeners
            btn.addEventListener('click', handleDeleteLeader);
        });
    }

    function handleDeleteLeader(e) {
        const leaderId = parseInt(e.target.dataset.id);
        commissionData.leaders = commissionData.leaders.filter(leader => leader.id !== leaderId);
        displayLeaders();
    }

    // Delete region functionality
    function setupDeleteRegionButtons() {
        document.querySelectorAll('.delete-region').forEach(btn => {
            btn.removeEventListener('click', handleDeleteRegion); // Remove existing listeners
            btn.addEventListener('click', handleDeleteRegion);
        });
    }

    function handleDeleteRegion(e) {
        const regionId = parseInt(e.target.dataset.id);
        commissionData.regions = commissionData.regions.filter(region => region.id !== regionId);
        displayRegions();
    }

    // Display leaders in admin panel
    function displayLeaders() {
        const leadersList = document.getElementById('leaders-list');
        if (!leadersList) return;
        
        leadersList.innerHTML = '';
        
        commissionData.leaders.forEach(leader => {
            const leaderElement = document.createElement('div');
            leaderElement.className = 'admin-item';
            leaderElement.innerHTML = `
                <div class="admin-item-header">
                    <i class="fas fa-${leader.icon}"></i>
                    <strong>${leader.name}</strong> - ${leader.position}
                </div>
                <div class="admin-item-details">
                    ${leader.region ? `<div><i class="fas fa-map-marker-alt"></i> ${leader.region}</div>` : ''}
                    ${leader.phone ? `<div><i class="fas fa-phone"></i> ${leader.phone}</div>` : ''}
                    ${leader.email ? `<div><i class="fas fa-envelope"></i> ${leader.email}</div>` : ''}
                </div>
                <button class="btn btn-danger delete-leader" data-id="${leader.id}">
                    <i class="fas fa-trash"></i> Удалить
                </button>
            `;
            leadersList.appendChild(leaderElement);
        });
        
        setupDeleteLeaderButtons();
    }

    // Display regions in admin panel
    function displayRegions() {
        const regionsList = document.getElementById('regions-list');
        if (!regionsList) return;
        
        regionsList.innerHTML = '';
        
        commissionData.regions.forEach(region => {
            const regionElement = document.createElement('div');
            regionElement.className = 'admin-item';
            regionElement.innerHTML = `
                <div class="admin-item-header">
                    <i class="fas fa-building"></i>
                    <strong>${region.region}</strong>
                </div>
                <div class="admin-item-details">
                    <div><i class="fas fa-user"></i> ${region.representative}</div>
                    <div><i class="fas fa-briefcase"></i> ${region.position}</div>
                    ${region.phone ? `<div><i class="fas fa-phone"></i> ${region.phone}</div>` : ''}
                    ${region.email ? `<div><i class="fas fa-envelope"></i> ${region.email}</div>` : ''}
                </div>
                <button class="btn btn-danger delete-region" data-id="${region.id}">
                    <i class="fas fa-trash"></i> Удалить
                </button>
            `;
            regionsList.appendChild(regionElement);
        });
        
        setupDeleteRegionButtons();
    }

    // Clear leader form
    function clearLeaderForm() {
        document.getElementById('leader-name').value = '';
        document.getElementById('leader-position').value = '';
        document.getElementById('leader-region').value = '';
        document.getElementById('leader-phone').value = '';
        document.getElementById('leader-email').value = '';
        document.getElementById('leader-icon').value = 'user-tie';
    }

    // Clear region form
    function clearRegionForm() {
        document.getElementById('region-name').value = '';
        document.getElementById('representative-name').value = '';
        document.getElementById('representative-position').value = '';
        document.getElementById('representative-phone').value = '';
        document.getElementById('representative-email').value = '';
    }

    // Confirmation modal functionality
    const modal = document.getElementById('confirmation-modal');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    
    if (modal && modalCancel && modalConfirm) {
        modalCancel.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Initialize admin panel if elements exist
    const adminElements = document.querySelectorAll('.admin-tab, .admin-panel');
    if (adminElements.length > 0) {
        console.log('Admin panel initialized');
    }
});

// Utility functions for the website
function initAnimations() {
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}

function initCompetitionsCalendar() {
    // Initialize calendar functionality if exists
    const calendarElement = document.querySelector('.competition-calendar');
    if (calendarElement) {
        console.log('Competition calendar initialized');
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initCompetitionsCalendar();
    
    // Initialize any other components
    console.log('Website initialized successfully');
});

// Export data functionality (for admin panel)
function exportData() {
    const data = {
        leaders: commissionData.leaders,
        regions: commissionData.regions,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'commission-data-' + new Date().toISOString().slice(0,10) + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import data functionality (for admin panel)
function importData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.leaders && data.regions) {
                    commissionData.leaders = data.leaders;
                    commissionData.regions = data.regions;
                    displayLeaders();
                    displayRegions();
                    alert('Данные успешно импортированы!');
                } else {
                    alert('Неверный формат файла!');
                }
            } catch (error) {
                alert('Ошибка при импорте данных: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
}

// Make functions available globally for admin panel
window.exportData = exportData;
window.importData = importData;
