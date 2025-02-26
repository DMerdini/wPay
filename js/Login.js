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
  localStorage.getItem("userfound", JSON.stringify(founduser));
}
