// Set all variables gathered from index.html
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionCard = document.getElementById('question-card');
var questionEle = document.getElementById('question');
var answerDisplayEle = document.getElementById('answer-display');
var correctDisplayEle = document.getElementById('correct-label');
var timerCounterEle = document.getElementById('timer-counter');

// currentQuestionIndex will identify the question within the array "questionArray"
var currentQuestionIndex;
var shuffledQuestions;
var interval;
var totalSeconds = 0;

//Start quiz when start button is clicked
startButton.addEventListener('click', startQuiz);

//GoTo next question when next button is clicked
nextButton.addEventListener('click', function(){
    currentQuestionIndex++;
    setNextQuestion();
});

//Star the Quiz
function startQuiz(){
    currentQuestionIndex = 0;
    startButton.classList.add('hide');
    setNextQuestion();
    startTimer();
}

//Pull reset card and next question
function setNextQuestion(){
    resetCard();
    showQuestion(questionArray[currentQuestionIndex]);
}

//Reset the Question Card to blank
function resetCard(){
    nextButton.classList.add('hide');
    correctDisplayEle.classList.add('hide');
    //As long as there is a child attached to answerDisplayEle 
    //this loop will continue to remove it until there are none.
    while (answerDisplayEle.firstChild){
        answerDisplayEle.removeChild(answerDisplayEle.firstChild)
    }
}

//Provide all buttons set-up with answer and provide question
function showQuestion(question){
    questionEle.innerText = question.question;
    questionCard.classList.remove('hide');

    //loop through each answer and create a button for it and add to answerDisplayEle
    question.answers.forEach(possibleAnswer => {
        var button = document.createElement('button');
        button.innerText = possibleAnswer.text;
        button.classList.add('btn');
        if (possibleAnswer.correct) {
            button.dataset.correct = possibleAnswer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerDisplayEle.appendChild(button);
    });
}

//When an answer button is selected, inform the user of a right or wrong answer
function selectAnswer(element){
    var selectedButton = element.target;
    var isCorrect = selectedButton.dataset.correct;
    if(isCorrect){
        correctDisplayEle.classList.remove('hide');
        correctDisplayEle.innerText = "Correct!";
        nextButton.classList.remove('hide');
    } else{

        //remove 5 seconds
    
        correctDisplayEle.classList.remove('hide');
        correctDisplayEle.innerText = "Incorrect";
        nextButton.classList.remove('hide');
    }
}




//Set the timer
// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    setTime();
  
    // We only want to start the timer if totalSeconds is > 0
    if (totalSeconds > 0) {
      /* The "interval" variable here using "setInterval()" begins the recurring increment of the
         secondsElapsed variable which is used to check if the time is up */
        interval = setInterval(function() {
          totalSeconds--;
  
          // So renderTime() is called here once every second.
          renderTime();
        }, 1000);
    } else {
      alert("Minutes of work/rest must be greater than 0.")
    }
}

/* This function retrieves the values from the html input elements; Sort of
getting run in the background, it sets the totalSeconds variable which
is used in getFormattedMinutes/Seconds() and the renderTime() function.
It essentially resets our timer */
function setTime() {
    totalSeconds = timerCounterEle.textContent;
    clearInterval(interval);
}

// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    timerCounterEle.textContent = totalSeconds;
  
   // ..and then checks to see if the time has run out
    if (totalSeconds <= 0) {  
      stopTimer();
    }
}

/* This function stops the interval and also resets secondsElapsed
and calls "setTime()" which effectively reset the timer
to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
    setTime();
    renderTime();
}
  
  




//Assign a High Score and Username to the Browser to be saved upon refresh

//Once timer reaches 0, quiz is over and getUserInfo function is called

//when timer hits 10 seconds, numbers turn red and enlarge



var questionArray = [
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
];
