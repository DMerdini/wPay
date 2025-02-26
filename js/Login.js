//
import { sysusers } from "./users.js";

function checkauth() {
  let enteredusername = document.getElementById("enteredemail").value.trim();
  let enteredpass = document.getElementById("enteredpass").value.trim();
  let founduser = sysusers.find((user) => {
    user.sysusername.toLowerCase() === enteredusername.toLowerCase() &&
      user.sysuserpass == enteredpass;
  });

  if (founduser) {
    let alertmsg = document.getElementById("welcomemodal");
    console.log(alertmsg);

    document.getElementById("welcomeusername").innerHTML =
      "Welcome back " + founduser.accdetails.accusename + "!";
    alertmsg.style.display = "block";
    localStorage.setItem("userfound", JSON.stringify(founduser));
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 4000);
  }
}
document.getElementById("enteredpass").addEventListener((event) => {});
