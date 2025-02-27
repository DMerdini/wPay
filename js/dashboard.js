let passedfounduser = JSON.parse(localStorage.getItem("userfound"));
function authchecker() {
  if (!passedfounduser) {
    window.location.href = "login.html";
  }
}
authchecker();
function userlogout() {
  passedfounduser = "";
  authchecker();
}
