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

const correct = questions.correct


const startButton = document.getElementById('start-button')
const questionContainer = document.getElementById('question-container')
const nextButton = document.getElementById('next-button')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const defaultBtn = document.getElementById('btn')
const countDown = document.getElementById('countdown')
const highScores = document.getElementById('highscores')

let answerCorrect = 1
let answerIncorrect = 0
let totalCorrectQuestions = 0 
let shuffledQuestions, currentQuestionIndex
var timeLeft = 10;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
},
)

function quizTime() {
  var timerInterval = setInterval(function () {
    if(timeLeft > 0) {
        timeLeft--;
        countdown.textContent = "Time left: " + timeLeft ;
    }
    else {
        console.log('time had ended')
        timeLeft = 0;
        countDown.textContent = "You have ran out of time! Please restart the game or check the highscores tos see where you rank.";
        startButton.textContent = 'Restart'
        answerButtonsElement.classList.add('hide')
        questionElement.classList.add('hide')
        startButton.classList.remove('hide')

    };
        }, 1000);
};


function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    countDown.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    console.log('setNextQuestion set')
    resetDefault()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}



function showQuestion(question){
    console.log('question shown')
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectedAnswer)
        answerButtonsElement.appendChild(button)
        highScores.classList.add('hide')
    } ) 
}

function selectedAnswer(e) {
    console.log('answer selected')
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (selectedButton.correct = true) {
        localStorage.setItem("Correct", 1)
        console.log(correct)
    } else {
        console.log(correct)
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.textContent = "Restart"
        startButton.classList.remove('hide')
        highScores.classList.remove('hide')
        console.log('no questions left')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
    }
    else {
        element.classList.add('wrong')
    }

}

function clearStatusClass(element, correct) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
};

function resetDefault () {
   nextButton.classList.add('hide')
       while (answerButtonsElement.firstChild) {
       answerButtonsElement.removeChild(answerButtonsElement.firstChild)
   }
}
