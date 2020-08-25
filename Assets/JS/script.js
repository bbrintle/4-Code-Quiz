// Set all variables gathered from index.html
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionVar = document.getElementById("question-card");
var questionElement = document.getElementById('question');
var answerBtnElement = document.getElementById('answer-display');


var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionVar.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerBtnElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerBtnElement.firstChild){
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}

function selectAnswer(event){
    var selectedBtn = event.target;
    var correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
       nextButton.classList.remove('hide'); 
    } else{
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
    }
    
    
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    } else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

var questions = [
    {
        question: 'Who killed Qui-Gon Jinn?',
        answers: [
            { text: 'Darth Maul', correct: true},
            { text: 'Darth Vader', correct: false },
            { text: 'Count Dooku', correct: false },
            { text: 'General Greivous', correct: false }
        ]
    },
    {
        question: 'Who is the Chosen One?',
        answers: [
            { text: 'Darth Maul', correct: false},
            { text: 'Darth Vader', correct: true },
            { text: 'Count Dooku', correct: false },
            { text: 'General Greivous', correct: false }
        ]
    },
    {
        question: 'Who killed Lukes father??',
        answers: [
            { text: 'Darth Maul', correct: false},
            { text: 'Darth Vader', correct: true },
            { text: 'Count Dooku', correct: false },
            { text: 'General Greivous', correct: false }
        ]
    }
]