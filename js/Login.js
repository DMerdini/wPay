/*import { sysusers } from "./users.js";

function checkauth() {
  let enteredusername = document.getElementById("enteredemail").value.trim();
  let enteredpass = document.getElementById("enteredpass").value.trim();

  let founduser = sysusers.find(
    (user) =>
      user.sysusername.toLowerCase() === enteredusername.toLowerCase() &&
      user.sysuserpass === enteredpass
  );

  let welcomeModal = document.getElementById("welcomemodal");
  let sucessmodal = document.getElementById("suceccmodal");
  let errormodal = document.getElementById("errormodal");
  let welcomeMessage = document.getElementById("welcomeusername");
  let errorMessage = document.getElementById("errorusernotfount");

  if (founduser) {
    errormodal.style.display = "none";
    welcomeModal.style.display = "block";
    sucessmodal.style.display = "flex";
    welcomeMessage.innerHTML = `Welcome back, ${founduser.accdetails.accusename}!`;

    localStorage.setItem("userfound", JSON.stringify(founduser));

    // Hide modal after 4 seconds and redirect to dashboard
    setTimeout(() => {
      welcomeModal.style.display = "none";
      sucessmodal.style.display = "none";
      window.location.href = "dashboard.html";
    }, 2000);
  } else {
    console.log(" somthing");
    errormodal.style.display = "flex";
    errorMessage.style.display = "flex";
    errorMessage.innerHTML =
      "User not found! Please check your username and password.";
    errorMessage.style.animation = "alertboxslidein 230ms ease-out";
    welcomeModal.style.display = "block";

    setTimeout(() => {
      errorMessage.style.display = "none";
      welcomeModal.style.display = "none";
    }, 2000);
  }
}

// Attach event listener to the login button
document.querySelector(".loginbtn").addEventListener("click", checkauth);
*/

/*
import { sysusers } from "./users.js";

document.querySelector(".loginbtn").addEventListener("click", authenticateUser);

function authenticateUser() {
  const username = document.getElementById("enteredemail").value.trim().toLowerCase();
  const password = document.getElementById("enteredpass").value.trim();

  const user = sysusers.find(u => u.sysusername.toLowerCase() === username && u.sysuserpass === password);

  user ? handleSuccess(user) : handleError();
}

function handleSuccess(user) {
  localStorage.setItem("userfound", JSON.stringify(user));
  updateModal("welcomemodal", "suceccmodal", `Welcome back, ${user.accdetails.accusename}!`);
  
  setTimeout(() => {
    closeModals();
    window.location.href = "dashboard.html";
  }, 2000);
}

function handleError() {
  updateModal("welcomemodal", "errormodal", "User not found! Please check your username and password.");
  
  setTimeout(closeModals, 2000);
}

function updateModal(welcomeModalId, targetModalId, message) {
  document.getElementById(welcomeModalId).style.display = "block";
  const targetModal = document.getElementById(targetModalId);
  targetModal.style.display = "flex";

  if (message) {
    const messageElement = targetModal.querySelector(".message") || targetModal;
    messageElement.innerHTML = message;
  }
}

function closeModals() {
  document.querySelectorAll("#welcomemodal, #suceccmodal, #errormodal").forEach(modal => {
    modal.style.display = "none";
  });
}
*/
import { sysusers } from "./users.js";

document.querySelector(".loginbtn").addEventListener("click", authenticateUser);

function authenticateUser() {
  const username = getInputValue("enteredemail").toLowerCase();
  const password = getInputValue("enteredpass");

  const user = sysusers.find(
    (u) =>
      u.sysusername.toLowerCase() === username && u.sysuserpass === password
  );

  user ? handleAuthenticationSuccess(user) : handleAuthenticationError();
}

function handleAuthenticationSuccess(user) {
  localStorage.setItem("userfound", JSON.stringify(user));

  showModal(
    "welcomemodal",
    "suceccmodal",
    `Welcome back, ${user.accdetails.accusename}!`
  );

  setTimeout(() => {
    closeAllModals();
    redirectTo("dashboard.html");
  }, 2000);
}

function handleAuthenticationError() {
  showModal(
    "welcomemodal",
    "errormodal",
    "User not found! Please check your username and password."
  );

  setTimeout(closeAllModals, 2000);
}

function getInputValue(elementId) {
  return document.getElementById(elementId).value.trim();
}

function showModal(welcomeModalId, targetModalId, message) {
  toggleDisplay(welcomeModalId, "block");
  toggleDisplay(targetModalId, "flex");

  const messageElement =
    document.getElementById(targetModalId).querySelector(".message") ||
    document.getElementById(targetModalId);

  if (messageElement) {
    messageElement.innerHTML = message;
  }
}

function closeAllModals() {
  ["welcomemodal", "suceccmodal", "errormodal"].forEach((id) =>
    toggleDisplay(id, "none")
  );
}

function toggleDisplay(elementId, displayStyle) {
  const element = document.getElementById(elementId);
  if (element) element.style.display = displayStyle;
}

function redirectTo(url) {
  window.location.href = url;
}
