export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.showQuestion();
    document
      .querySelector("#next")
      .addEventListener("click", this.nextQues.bind(this));
  }

  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  showQuestion() {
    let currentAnswer = this.questions[this.index].correct_answer;
    document.querySelector("#question").innerHTML =
      this.questions[this.index].question;
    let answers = [
      this.questions[this.index].correct_answer,
      ...this.questions[this.index].incorrect_answers,
    ];
    this.shuffle(answers);
    let cartona = ``;
    for (let i = 0; i < answers.length; i++) {
      cartona += `                
        <label class="form-check-label mb-1">
        <input type="radio" class="form-check-input me-2" name="answers" value="${answers[i]}">
        ${answers[i]}
        </label> </br>`;
    }
    document.querySelector("#displayAnswer").innerHTML = cartona;
  }

  nextQues() {
    let correntAnswer = this.questions[this.index].correct_answer;
    let userAnswerElement = document.getElementsByName("answers");
    let userAnswer = Array.from(userAnswerElement).find((e) => e.checked);
    if (userAnswer != undefined) {
      $("#alert").fadeOut(0);
      userAnswer.value;
      this.checkAnswer(userAnswer, correntAnswer);
      this.index++;
      if (this.index < this.questions.length) {
        this.showQuestion();
      } else {
        this.showFinish(this.score);
        $("#quiz").fadeOut(1000, function () {
          $("#finish").fadeIn(1000);
        });
      }
    } else {
      $("#alert").fadeIn(500);
    }
  }

  checkAnswer(answers, currenAnswer) {
    if (answers == currenAnswer) {
      this.score++;
    }
  }

  showFinish(score) {
    document.querySelector("#score").innerHTML = score;
    document
      .querySelector("#tryBtn")
      .addEventListener("click", this.tryAgain.bind(this));
  }

  tryAgain() {
    $("#finish").fadeOut(1000, function () {
      $("#setting").fadeIn(500);
    });
    document.querySelector("#numberOfQuestions").value = "";
    $("#category option:eq(0)").prop("selected", true);
    $("#easy").prop("checked", true);
  }
}
