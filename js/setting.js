import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    this.chooseCategory = document.querySelector("#category");
    this.chooseLevel = document.querySelectorAll("input[name='difficulty']");
    this.chosseNumQues = document.querySelector("#numberOfQuestions");
    document
      .querySelector("#startBtn")
      .addEventListener("click", this.getData.bind(this));
  }

  async getData() {
    let category = this.chooseCategory.value;
    let level = Array.from(this.chooseLevel).find((e) => e.checked).value;
    let numQues = this.chosseNumQues.value;
    if (numQues != "") {
      $("#questionsAlert").fadeOut(200);
      let data = await fetch(
        `https://opentdb.com/api.php?amount=${numQues}&category=${category}&difficulty=${level}`
      );
      let res = await data.json();
      let quiz = new Quiz(res.results);
      $("#setting").fadeOut(500, function () {
        $("#quiz").fadeIn(500);
      });
    } else {
      $("#questionsAlert").fadeIn(200);
    }
  }
}
