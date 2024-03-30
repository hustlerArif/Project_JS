const database = {
  data: [
    {
      question: "Which is the capital of Jharkhand ?",
      options: {
        a: "Bihar",
        b: "Ranchi",
        c: "kolkata",
        d: "uttarakhand",
      },
      correctAns: "b",
    },

    {
      question: "Where Taj Majal is located ?",
      options: {
        a: "Jaipur",
        b: "Ranchi",
        c: "Agra",
      },
      correctAns: "c",
    },
    {
      question: "Which is the capital of Rajasthan ?",
      options: {
        a: "Jaipur",
        b: "Ranchi",
        c: "kolkata",
        d: "uttarakhand",
      },
      correctAns: "a",
    },
  ],
};
//   console.log(database.data[0].options)

const readline = require("readline-sync");
const userName = readline.question("Enter your name here: \n");
console.log(`welcome ${userName} to Quiz CLI App... \n`);

let count = 0;
function showData(database) {
  // console.log(database.data[1].question)
  for (i = 0; i < database.data.length; i++) {
    console.log(database.data[i].question);
    console.log(database.data[i].options);
    const answer = readline.question("\n select answer a/b/c/d :- ");
    if (answer === database.data[i].correctAns) {
      count++;
      console.log("correct Answer\n");
    } else {
      console.log(
        `wrong answer, correct answer is ${database.data[i].correctAns} \n`
      );
    }
  }
}

showData(database);
console.log(
  `you have given ${count} correct answer out of ${database.data.length}`
);
