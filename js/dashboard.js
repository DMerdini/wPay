class DashboardController {
  constructor() {
    this.sectionMap = {
      mydashboard: 'dashboardwrapper',
      account: 'accountwrapper',
      mobile: 'mobilewrapper',
      payments: 'paymentswrapper',
      complaints: 'complaintswrapper',
      support: 'supportwrapper'
    };
    
    this.initializeEventListeners();
    this.initializeDashboard();
  }

  // Authentication
  static authChecker() {
    try {
      const user = JSON.parse(localStorage.getItem('userfound'));
      if (!user) {
        DashboardController.redirectTo('login.html');
        return null;
      }
      return user;
    } catch (error) {
      console.error('Authentication check failed:', error);
      DashboardController.redirectTo('login.html');
      return null;
    }
  }

  static redirectTo(url) {
    window.location.href = url;
  }

  // Data Population
  populateAccounts(acccards) {
    const accountsContainer = document.getElementById('accounts');
    if (!accountsContainer) return;

    accountsContainer.innerHTML = '';
    
    acccards.forEach(card => {
      const accountElement = document.createElement('div');
      accountElement.className = 'account';
      accountElement.innerHTML = `
        <div class="accdetails">
          <h2>${card.acccardname || 'N/A'}</h2>
          <h2>${card.acccardiban || 'N/A'}</h2>
        </div>
        <button type="button" class="accountbtn ${card.acccardstatus === 'Active' ? 'activebtn' : 'inactivebtn'}">
          Block Account
        </button>
      `;
      accountsContainer.appendChild(accountElement);
    });
  }

  populateBills(accbills) {
    const billContainer = document.getElementById('bills');
    if (!billContainer) return;

    billContainer.innerHTML = '';

    if (accbills?.length > 0) {
      accbills.forEach(bill => {
        const billElement = document.createElement('div');
        billElement.className = 'bill';
        billElement.innerHTML = `
          <div class="billbody">
            <div class="billstatus billactive"></div>
            <div class="billtitle">${bill.accbillname || 'Untitled'}</div>
          </div>
          <button type="button" class="billbtn ${bill.accbillstatus === 'Paid' ? 'activebtn' : 'inactivebtn'}">
            ${bill.accbillstatus === 'Paid' ? 'View' : 'Pay'}
          </button>
        `;
        billContainer.appendChild(billElement);
      });
    } else {
      billContainer.innerHTML = '<h3 style="text-align:center;color:var(--greylight)">No bills to show</h3>';
    }
  }

  populateProfile(accdetails, lastLogin) {
    const elements = {
      fullname: document.getElementById('logeduserfullname'),
      phone: document.getElementById('loggeduserpnone'),
      email: document.getElementById('loggedusermail'),
      profilePic: document.getElementById('logeduserprofile')
    };

    if (Object.values(elements).some(el => !el)) {
      console.error('Profile elements not found');
      return;
    }

    elements.fullname.textContent = `${accdetails.accusename || ''} ${accdetails.accuserlastname || ''}`;
    elements.phone.textContent = accdetails.accuserphone || '';
    elements.email.textContent = accdetails.accuseremail || '';
    elements.profilePic.src = accdetails.accuserpic || '';
  }

  // Navigation
  showSection(id) {
    const contentSections = document.querySelectorAll('.main > div');
    const targetId = this.sectionMap[id.toLowerCase()];

    contentSections.forEach(section => {
      if (section.id === targetId) {
        section.style.display = 'block';
        requestAnimationFrame(() => {
          setTimeout(() => {
            section.style.opacity = '1';
          }, 10);
        });
      } else {
        section.style.opacity = '0';
        setTimeout(() => {
          section.style.display = 'none';
        }, 300);
      }
    });
  }

  // Event Handlers
  handleLogout() {
    localStorage.removeItem('userfound');
    DashboardController.redirectTo('login.html');
  }

  handleProfileHover(e) {
    const frame = e.currentTarget;
    const image = frame.querySelector('#logeduserprofile');
    const { left, top, width, height } = frame.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 75;
    const y = (e.clientY - top - height / 2) / 75;
    image.style.transform = `translate(${x}px, ${y}px) scale(1.3)`;
  }

  handleProfileLeave(e) {
    const image = e.currentTarget.querySelector('#logeduserprofile');
    image.style.transform = 'translate(0, 0) scale(1.1)';
  }

  
  initializeEventListeners() {
    document.getElementById('logoutbtn')?.addEventListener('click', () => this.handleLogout());

    const navItems = document.querySelectorAll('.navli a');
    navItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        this.showSection(item.id);
      });
    });

    const frame = document.querySelector('.accountframe');
    if (frame) {
      frame.addEventListener('mousemove', this.handleProfileHover);
      frame.addEventListener('mouseleave', this.handleProfileLeave);
    }
  }

  initializeDashboard() {
    const user = DashboardController.authChecker();
    if (!user) return;

    this.populateAccounts(user.acccards || []);
    this.populateBills(user.accbills || []);
    this.populateProfile(user.accdetails || {}, user.lastLogin || {});

    const firstSection = document.querySelector('.main > div');
    if (firstSection) {
      firstSection.style.display = 'block';
      setTimeout(() => {
        firstSection.style.opacity = '1';
      }, 100);
    }
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DashboardController();
});

// Initial auth check
DashboardController.authChecker();