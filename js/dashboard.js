function authChecker() {
  const user = JSON.parse(localStorage.getItem("userfound"));
  if (!user) {
    redirectTo("login.html");
  }
}

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
