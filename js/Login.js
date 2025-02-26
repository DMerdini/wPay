//

let sysusers = [
  {
    // later change username with email
    sysusername: "pablo",
    sysuserpass: "123",
    accdetails: {
      accusename: "Pablo",
      accuserlastname: "Picasso",
      accuserpic: "",
    },
    acccards: [{ acccardname: "", acccardiban: "", acccardstatus: "" }],
    accbills: [{ accbillname: "", accbillamount: "", accbillstatus: "" }],
  },
];

function checkauth() {
  let enteredusername = document.getElementById("enteredemail").value.trim();
  let enteredpass = document.getElementById("enteredpass").value.trim();
  let founduser = sysusers.find((user) => {
    return user.sysusername.toLowerCase() === enteredusername.toLowerCase();
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
