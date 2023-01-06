const startButton = document.getElementById('start-button')
const questionContainer = document.getElementById('question-container')
const nextButton = document.getElementById('next-button')
var questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const defaultBtn = document.getElementById('btn')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetDefault()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}



function showQuestion(question){
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
    } )
}

function selectedAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.add('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
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
            { text: '4', correct: true},
            { text: '5', correct: false}
        ]}
];