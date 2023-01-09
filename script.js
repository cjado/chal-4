const questions = [
    {
        question: 'What is 1 + 1? ',
        answers: [
            { text: '2', correct: true },
            { text: '3', correct: false},
            { text: '4', correct: false},
            { text: '5', correct: false}
        ]},
    {    question: 'what is 2+2',
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: false},
            { text: '4', correct: true},
            { text: '5', correct: false}
        ]},
    {    question: 'What is 3+3?',
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: false},
            { text: '6', correct: true},
            { text: '5', correct: false}
        ]}
];

const startButton = document.getElementById('start-button')
const questionContainer = document.getElementById('question-container')
const nextButton = document.getElementById('next-button')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const defaultBtn = document.getElementById('btn')
const countDown = document.getElementById('countdown')
const restartButton = document.getElementById('restart-button')
const highScoreList = document.getElementById("high-score-list");
const saveButton = document.getElementById("save-button");
const nameInput = document.getElementById("name-input");

let shuffledQuestions, currentQuestionIndex
let timerInterval;
var timeLeft = 30;


highScoreList.addEventListener("click", showHighScores)
startButton.addEventListener("click", startGame)
restartButton.addEventListener("click", restartLocalStorage)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
},)

const highScores = [];

saveButton.addEventListener("click", () => {
    const name = nameInput.value;
    const score = questionsCorrect;
    const highScore = { name: name, score: score };
    highScores.push(highScore);
    // localStorage.setItem("name", name);
    // localStorage.setItem("score", score);
    nameInput.value = "";
    if (highScores.length > 0) {
        showHighScores();
        highScoreList.classList.remove('hide')
      }
  });

quizTime()
function quizTime() {
  var timerInterval = setInterval(function () {
    if(timeLeft > 0) {
        timeLeft--;
        countdown.textContent = "Time left: " + timeLeft ;
    } else {
        console.log('time had ended')
        timeLeft = 30;
        clearInterval(timerInterval);
        setNextQuestion()
        quizTime()};},1000);
};

let questionsCorrect = 0;
function startGame() {
        const storedQuestionsCorrect = localStorage.getItem('questionsCorrect');
        if (storedQuestionsCorrect) {
        questionsCorrect = parseInt(storedQuestionsCorrect);
        }
    console.log('started')
    console.log('timer started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    countDown.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    checkedForQuestionsLeft()
    console.log('setNextQuestion set')
    resetDefault()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    timeLeft = 30
}



function showQuestion(question){
    console.log('question shown')
    answerButtonsElement.classList.remove('hide')
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } else {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectedAnswer)
        answerButtonsElement.appendChild(button)
        highScoreList.classList.add('hide')
        restartButton.classList.add('hide')
    } ) 
}

function selectedAnswer(event) {
    const button = event.target;
    const dataCorrect = button.dataset.correct;
    if (dataCorrect === "true") {
      console.log("The answer selected is correct!");
      questionsCorrect++;
      localStorage.setItem('questionsCorrect', questionsCorrect.toString())
    } else {
      console.log("The answer selected is incorrect.");
    }
    clearInterval(timerInterval)
    checkedForQuestionsLeft()
    answerButtonsElement.classList.add('hide')
}

function checkedForQuestionsLeft () {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
        console.log('checked # of questions left')
    } else {
        highScoreList.classList.remove('hide')
        console.log('no questions left, restart button avbl')
        console.log(questionsCorrect)
        restartButton.classList.remove('hide')
        saveButton.classList.remove('hide')
        nameInput.classList.remove('hide')
}}

function resetDefault () {
   nextButton.classList.add('hide')
       while (answerButtonsElement.firstChild) {
       answerButtonsElement.removeChild(answerButtonsElement.firstChild)
}}

function restartLocalStorage () {
    saveButton.classList.add('hide')
    nameInput.classList.add('hide')
    highScoreList.classList.add('hide')
    localStorage.clear()
    startGame()
}



function showHighScores() {
  highScoreList.innerHTML = "";
  highScores.forEach((highScore) => {
    const li = document.createElement("li");
    li.textContent = `${highScore.name}: ${highScore.score}`;
//   const name = localStorage.getItem("name");
//   const score = localStorage.getItem("score");
//   const item = document.createElement("li");
//   item.innerHTML = `${name}: ${score}`;
  highScoreList.appendChild(li);
});}
