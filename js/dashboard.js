function authChecker() {
  const user = JSON.parse(localStorage.getItem("userfound"));
  if (!user) {
    redirectTo("login.html");
  }
  return user;
}
function populateAccounts(acccards) {
  const accountsContainer = document.getElementById("accounts");
  accountsContainer.innerHTML = ""; // Clear existing accounts

  acccards.forEach((card) => {
    let useraccountcard = document.createElement("div");
    useraccountcard.classList.add("account"); // Fixed typo from "acount" to "account"
    useraccountcard.innerHTML = `
      <div class="accdetails">
        <h2>${card.acccardname}</h2>
        <h2>${card.acccardiban}</h2>
      </div>
      <button type="button" class="accountbtn ${
        card.acccardstatus === "Active" ? "activebtn" : "inactivebtn"
      }">
        Block Account
      </button>
    `;
    accountsContainer.appendChild(useraccountcard);
  });
}
function populatebills(accbills) {
  const billContainer = document.getElementById("bills");
  billContainer.innerHTML = "";
  accbills.forEach((bill) => {
    let useraccountbill = document.createElement("div");
    useraccountbill.classList.add("bill"); // Fixed typo from "acount" to "account"
    useraccountbill.innerHTML = `  <div class="billbody">
                        <div class="billstatus billactive"></div>
                        <div class="billtitle">${bill.accbillname}</div>
                      </div>
                      <button type="button" class="billbtn ${
                        bill.accbillstatus === "Paid"
                          ? "activebtn"
                          : "inactivebtn"
                      }">${
      bill.accbillstatus === "Paid" ? "view" : "Pay"
    }</button>`;

    document.getElementById("bills").appendChild(useraccountbill);
  });
}
function populateprofile(accdetails, lastLogin) {
  document.getElementById("logeduserfullname").innerHTML =
    accdetails.accusename + " " + accdetails.accuserlastname;
  document.getElementById("loggeduserpnone").innerHTML =
    accdetails.accuserphone;
  document.getElementById("loggedusermail").innerHTML = accdetails.accuseremail;
  document.getElementById("logeduserprofile").src = accdetails.accuserpic;

  document.getElementById("");
}
document.addEventListener("DOMContentLoaded", function () {
  const user = authChecker(); // Check auth and get user
  if (user) {
    populateAccounts(user.acccards); // Populate accounts section
    populatebills(user.accbills);
    populateprofile(user.accdetails, user.lastLogin);
  }
});

function userLogout() {
  localStorage.removeItem("userfound");
  redirectTo("login.html");
}

function redirectTo(url) {
  window.location.href = url;
}

// Run auth check on page load
authChecker();
document.getElementById("logoutbtn").addEventListener("click", userLogout);

// ketu fillon kodi i  ri
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".navli a"); // Select all navbar links
  const contentSections = document.querySelectorAll(".main > div"); // Select all content divs

  // Function to show the selected section and hide others
  function showSection(id) {
    contentSections.forEach((section) => {
      if (section.id === id) {
        section.style.display = "block"; // Make visible
        setTimeout(() => {
          section.style.opacity = "1"; // Smooth fade-in
        }, 50);
      } else {
        section.style.opacity = "0"; // Start fade-out
        setTimeout(() => {
          section.style.display = "none"; // Hide completely after fading
        }, 300);
      }
    });
  }

  // Add event listeners to navbar items
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove 'active' class from all and add to clicked one
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.id.toLowerCase(); // Get clicked item's ID
      showSection(targetId); // Show corresponding section
    });
  });
  // 552252

  // **Ensure first section appears with fade-in**
  const firstSection = contentSections[0]; // First div
  if (firstSection) {
    firstSection.style.display = "block"; // Make it visible
    setTimeout(() => {
      firstSection.style.opacity = "1"; // Smooth fade-in
    }, 100);
  }
});

/*
function populateUserData(user) {
  // Profile Section
  const fullNameElement = document.getElementById("logeduserfullname");
  const emailElement = document.querySelector(".email p");
  const lastLoginElement = document.querySelector(
    ".usermetadata p:first-child"
  );
  const osElement = document.querySelector(".usermetadata p:last-child");
  const phoneElement = document.querySelector(".username p:last-child");

  fullNameElement.textContent = `${user.accdetails.accusename} ${user.accdetails.accuserlastname}`;
  emailElement.textContent = `${user.sysusername}@gmail.com`; // Assuming email format, adjust if needed
  lastLoginElement.textContent = `Last login: ${new Date(
    user.lastLogin.timestamp
  ).toLocaleString()}`;
  osElement.textContent = user.lastLogin.os;
  phoneElement.textContent = "+35568686868"; // Static in HTML, update if dynamic data exists

  // Accounts Section
  const accountsContainer = document.getElementById("accounts");
  accountsContainer.innerHTML = ""; // Clear existing accounts
  user.acccards.forEach((card) => {
    const accountDiv = document.createElement("div");
    accountDiv.classList.add("account");
    accountDiv.innerHTML = `
      <div class="accdetails">
        <h2>${card.acccardname}</h2>
        <h2>${card.acccardiban}</h2>
      </div>
      <button type="button" class="accountbtn ${
        card.acccardstatus === "Active" ? "activebtn" : "inactivebtn"
      }">
        Block Account
      </button>
    `;
    accountsContainer.appendChild(accountDiv);
  });

  // Bills Section
  const billsContainer = document.getElementById("bills");
  billsContainer.innerHTML = ""; // Clear existing bills
  user.accbills.forEach((bill) => {
    const billDiv = document.createElement("div");
    billDiv.classList.add("bill");
    const statusClass =
      bill.accbillstatus === "Paid" ? "billactive" : "billpanding"; // Assuming "Unpaid" as pending
    billDiv.innerHTML = `
      <div class="billbody">
        <div class="billstatus ${statusClass}"></div>
        <div class="billtitle">${bill.accbillname}</div>
      </div>
      <button type="button">Pay</button>
    `;
    billsContainer.appendChild(billDiv);
  });
}

// Run auth check and populate data on page load
document.addEventListener("DOMContentLoaded", function () {
  const user = authChecker(); // Check auth and get user
  if (user) {
    populateUserData(user); // Populate the dashboard with user data
  }

  const navItems = document.querySelectorAll(".navli a"); // Select all navbar links
  const contentSections = document.querySelectorAll(".main > div"); // Select all content divs

  // Function to show the selected section and hide others
  function showSection(id) {
    contentSections.forEach((section) => {
      if (section.id === id) {
        section.style.display = "block"; // Make visible
        setTimeout(() => {
          section.style.opacity = "1"; // Smooth fade-in
        }, 50);
      } else {
        section.style.opacity = "0"; // Start fade-out
        setTimeout(() => {
          section.style.display = "none"; // Hide completely after fading
        }, 300);
      }
    });
  }

  // Add event listeners to navbar items
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
      const targetId = this.id.toLowerCase();
      showSection(targetId);
    });
  });

  // Ensure first section appears with fade-in
  const firstSection = contentSections[0];
  if (firstSection) {
    firstSection.style.display = "block";
    setTimeout(() => {
      firstSection.style.opacity = "1";
    }, 100);
  }
});
*/
