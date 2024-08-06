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
        errorsMsgs:
          "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
      },
      {
        id: 2,
        name: "lastname",
        type: "text",
        required: true,
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
        min: "0",
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
];
