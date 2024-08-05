export const inputsData = [
  {
    id: 1,
    name: "fullname",
    header: "Create A GHANNACOUNT",
    caption: "Enter your Full name",
    inputs: [
      {
        id: 1,
        name: "firstname",
        type: "text",
        required: true,
        pattern: "^[A-Za-z]+(?:[ '-][A-Za-z]+)*$",
        label: "First Name",
        errorsMsgs:
          "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
      },
      {
        id: 2,
        name: "lastname",
        type: "text",
        required: true,
        pattern: "^[A-Za-z]+(?:[ '-][A-Za-z]+)*$",
        label: "Last Name (optional)",
        errorsMsgs:
          "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
      },
    ],
    leftBtn: "i have already an account",
    rightBtn: "Next",
  },
];
