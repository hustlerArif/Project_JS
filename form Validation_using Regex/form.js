let formData = document.querySelector(".form");
let submitButton = document.querySelector(".button");
let errorMessages = document.querySelectorAll(".error-message");
let emptyfieldMsg = document.querySelectorAll(".empty-field");
let showPwdBtn = document.querySelector(".btn"); // for show/hide password

let fnFlag, lnFlag, emailFlag, passFlag; // for setting T/F to route to success.html

let firstName, lastName, email, password;
let field;

let fnTarget, lnTarget, emailTarget, passTarget; // to highlghth the input border  if condn fails

let nameRegEx = /[a-z]+$/i; // regular expression
let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d) (?=.*[!@#$%^&*]) (?=.*[a-z]) (?=.*[A-Z]).{8,}$/;

for (let errorMessage of errorMessages) {
  // hide error msg
  errorMessage.classList.add("d-none");
}

for (let emptyfieldMsgs of emptyfieldMsg) {
  // hide empty field msg
  emptyfieldMsgs.classList.add("d-none");
}

formData.addEventListener("keyup", (event) => {
  event.preventDefault();
  // console.log(event.target.dataset.key)
  // console.log(event.target.value)

  field = event.target.dataset.key;

  switch (field) {
    case "firstName":
      firstName = event.target.value; // for input selection
      fnTarget = event.target; // for input border
      break;
    case "lastName":
      lastName = event.target.value;
      lnTarget = event.target;
      break;
    case "email":
      email = event.target.value;
      emailTarget = event.target;
      break;
    case "password":
      password = event.target.value;
      passTarget = event.target;
      break;

    default: // fail safe
      firstName = lastName = email = password = "";
      break;
  }

  //   console.log(firstName);
  // console.log(lastName)
  // console.log(email)
  // console.log(password)
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(firstName, lastName, email, password);

  if (firstName) {
    emptyfieldMsg[0].classList.add("d-none");

    if (nameRegEx.test(firstName)) {
      fnTarget.classList.remove("error");
      errorMessages[0].classList.add("d-none");
      fnFlag = true;
      //   console.log("good to go");
    } else {
      fnTarget.classList.add("error");
      errorMessages[0].classList.remove("d-none");
      fnFlag = false;
      //   console.log("First Name must contain only alphabets");
    }
  } else {
    emptyfieldMsg[0].classList.remove("d-none");
    // console.log("please fill this field");
  }

  if (lastName) {
    emptyfieldMsg[1].classList.add("d-none");

    if (nameRegEx.test(lastName)) {
      lnTarget.classList.remove("error");
      errorMessages[1].classList.add("d-none");
      lnFlag = true;
      //   console.log("good to go");
    } else {
      lnTarget.classList.add("error");
      errorMessages[1].classList.remove("d-none");
      lnFlag = false;
      //   console.log("LastName must contain only alphabets");
    }
  } else {
    emptyfieldMsg[1].classList.remove("d-none");
    // console.log("please fill this field");
  }

  if (email) {
    emptyfieldMsg[2].classList.add("d-none");

    if (!emailRegex.test(email)) {
      // emailTarget.classList.add('error')
      errorMessages[2].classList.remove("d-none");
      emailFlag = false;
      //   console.log("Invalid email id");
    } else {
      // emailTarget.classList.remove('error')
      errorMessages[2].classList.add("d-none");
      emailFlag = true;
      //   console.log("good to go");
    }
  } else {
    emptyfieldMsg[2].classList.remove("d-none");
    // console.log("please fill this field");
  }

  if (password) {
    emptyfieldMsg[3].classList.add("d-none");

    if (!passwordRegex.test(password)) {
      // passTarget.classList.add('error')
      errorMessages[3].classList.remove("d-none");
      passFlag = false;
      //   console.log("Invalid password");
    } else {
      // passTarget.classList.remove('error')
      errorMessages[3].classList.add("d-none");
      passFlag = true;
      //   console.log("good to go");
    }
  } else {
    emptyfieldMsg[3].classList.remove("d-none");
    // console.log("please fill this field");
  }

  if (fnFlag && lnFlag && emailFlag && passFlag) {
    fnTarget.value = lnTarget.value = emailTarget.value = passTarget.value = "";
    window.location.href = "/success.html";
  } else {
    console.log("issue");
  }
});

showPwdBtn.addEventListener("click", (event) => {
  // for show/hide password
  event.preventDefault();

  if (passTarget.getAttribute("type") === "text") {
    passTarget.setAttribute("type", "password");
  } else {
    passTarget.setAttribute("type", "text");
  }
});



// checked, having issue in password validation, rest functionality ok
