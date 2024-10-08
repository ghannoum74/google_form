export const loginInputsData = [
  {
    id: 1,
    name: "email",
    header: "Sign in",
    caption: "Use your Google Account",
    pattern: "^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$",
    next_route: "/login-password",
    leftBtn: "Create Account",
    rightBtn: "Next",
    // forgetWord: "Forget Email?",
    to: "/login-forget",
    loginInputs: [
      {
        id: 1,
        name: "email",
        type: "text",
        maxlength: 30,
        required: true,
        label: "Enter your own email",
        errorsMsgs:
          "couldn't find your Google Account, Try using your email address instead",
      },
    ],
  },
  {
    id: 2,
    name: "password",
    header: "Sign in",
    caption: "Enter your password",
    next_route: "/successfull",
    forgetWord: "Forget Password?",
    to: "/login-forget",
    loginInputs: [
      {
        id: 1,
        name: "password",
        type: "password",
        maxlength: 30,
        required: true,
        label: "Password",
        errorsMsgs: "password dosen 't match! Get out bitch!!!",
      },
    ],

    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$",
    rightBtn: "Next",
  },
  {
    id: 3,
    name: "forget",
    header: "Find your email",
    caption: "Enter your phone number",
    next_route: "/checking-account-name",
    to: "login-forget",
    loginInputs: [
      {
        id: 1,
        name: "phoneNumber",
        type: "text",
        maxlength: 30,
        required: true,
        label: "Phone number",
        errorsMsgs: "phone number dosen't exist!. Try with valid one.",
      },
    ],
    pattern: "^(81|76|77|03|71|70)[0-9]{6}$",
    rightBtn: "Next",
  },
  {
    id: 4,
    name: "fullname",
    header: "What’s your name?",
    caption: "Enter the name on your Google Account",
    next_route: "/succesfull",
    loginInputs: [
      {
        id: 1,
        name: "firstname",
        type: "text",
        required: true,
        label: "First Name",
        maxlength: 20,
        errorsMsgs:
          "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
      },
      {
        id: 2,
        name: "lastname",
        type: "text",
        required: true,
        maxlength: 20,
        label: "Last Name (optional)",
        errorsMsgs:
          "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
      },
    ],

    pattern: "^[A-Za-z]+(?:[ '\\-][A-Za-z]+)*$",
    rightBtn: "Next",
  },
  {
    id: 5,
    name: "verifyCode",
    header: "Enter your verification code",
    caption:
      "verification code has been sent to your phone number. plz check your message inbox",
    next_route: "/",
    // to: "login-forget-password",
    loginInputs: [
      {
        id: 1,
        name: "verficationCode",
        type: "text",
        maxlength: 4,
        required: true,
        label: "Enter your code",
        errorsMsgs: "Incorrect verification code!",
      },
    ],
    rightBtn: "Next",
  },
];
