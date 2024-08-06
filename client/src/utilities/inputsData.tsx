export const inputsData = [
  {
    id: 1,
    name: "fullname",
    header: "Create A GHANNACOUNT",
    caption: "Enter your Full name",
    next_route: "/basic-information",
    inputs: [
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
    leftBtn: "i have already an account",
    rightBtn: "Next",
  },
  {
    id: 2,
    name: "basicData",
    header: "Basic information",
    caption: "Enter your birthday and gender",
    next_route: "/email-information",
    inputs: [
      {
        id: 1,
        name: "day",
        type: "number",
        required: true,
        min: "1",
        max: "30",
        label: "Day",
        errorsMsgs: "Sorry, Day should be valid (from 0 ---> 30)",
      },
      {
        id: 2,
        name: "year",
        type: "number",
        min: "1950",
        max: "2024",
        required: true,
        label: "Year",
        errorsMsgs: "Sorry, Year should be valid (from 1950 ---> 2024)",
      },
    ],
    selectData: [
      {
        id: 1,
        label: "Month",
        monthsData: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      {
        id: 2,
        label: "Gender",
        genderData: ["Male", "Female", "Rather not say", "Custom"],
      },
    ],
    leftBtn: "i have already an account",
    rightBtn: "Next",
  },
  {
    id: 3,
    name: "emailData",
    header: "Choose your Gmail address",
    caption: "Pick a Gmail address or create your own",
    pattern: "^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$",
    next_route: "/password-information",
    leftBtn: "Use Your Existing Email",
    rightBtn: "Next",
    inputs: [
      {
        id: 1,
        name: "email",
        type: "text",
        maxlength: 30,
        required: true,
        label: "create your own email",
        errorsMsgs:
          "Sorry, email should be as format 'Example1@gmail|hotmail.com' ",
      },
    ],
  },
  {
    id: 4,
    name: "password",
    header: "Create a strong password",
    caption:
      "Create a strong password with a mix of letters, numbers and symbols",
    next_route: "/Succesfull",
    inputs: [
      {
        id: 1,
        name: "password",
        type: "password",
        maxlength: 30,
        required: true,
        label: "Password",
        errorsMsgs:
          "strong password should contain Minimum 8 characters. At least one uppercase letter. At least one lowercase letter. At least one number. At least one special character (e.g., !@#$%^&*).",
      },
    ],

    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$",
    leftBtn: "i have already an account",
    rightBtn: "Next",
  },
];
