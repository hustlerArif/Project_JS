let readlineSync = require("readline-sync");
let kuler = require("kuler");

let userName = readlineSync.question("Enter your Name ");
console.log(kuler(`welcome ${userName} to quiz app! \n\n `, "#dc2626"));

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

//**creating leaderboard */
const leaderboard = {
  data: [
    {
      name: "Ashish",
      score: 2,
    },
    {
      name: "Riya",
      score: 3,
    },
    {
      name: "Arun",
      score: 1,
    },
  ],
};

//   console.log(database.data[0].question)

let score = 0;

/**main logic */
function showQuestion_Option(database) {
  for (i = 0; i < database.data.length; i++) {
    console.log(`Q${0 + i} ${database.data[i].question} \n `);
    // console.log(database.data[i].options);

    for (let key in database.data[i].options) {
      console.log(`${key} - ${database.data[i].options[key]} \n`);
    }

    let userAnswer = readlineSync
      .question("Enter your answers, select a/b/c/d  ")
      .toLowerCase();
    playGame(userAnswer, database.data[i].correctAns);
  }
}

function playGame(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    score++;
    console.log(kuler("correct answer", "#16a34a"));
  } else {
    console.log(kuler("Incorrect Answer", "#ef4444"));
    console.log(`correct answer is ${correctAnswer}`);
  }
}

function highScorer(leaderboard) {
  leaderboard.data.push({ name: userName, score: score });  // using Array method -push
  let sortedScoreList = leaderboard.data.sort((a, b) => b.score - a.score);
  // console.log(sortedScoreList)
  for (let leader of sortedScoreList) {
    console.log(`${leader.name} ${leader.score}`);
  }

  // console.log(leaderboard.data);
}

showQuestion_Option(database);

console.log(`you have given total ${score} correct answers`);
console.log("\n check your postion below: \n \n ");
highScorer(leaderboard);
