// Set all variables gathered from index.html
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionCard = document.getElementById('question-card');
var questionEle = document.getElementById('question');
var answerDisplayEle = document.getElementById('answer-display');
var correctDisplayEle = document.getElementById('correct-label');
var timerCounterEle = document.getElementById('timer-counter');
var timeCounterEle = document.getElementById('time-counter');
var highScoreEle = document.getElementById('high-score');
var getHighScore = localStorage.getItem("highScore");
var scoreEle = document.getElementById('current-score');
var userNameEle = document.getElementById('user-name');


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
    shuffledQuestions = questionArray.sort(() => Math.random() - .5);
    setNextQuestion();
    startTimer();
}

//Pull reset card and next question
function setNextQuestion(){
    resetCard();
    var currentScore = scoreEle.textContent;

    if (currentQuestionIndex < questionArray.length){
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }else{
        showHighScoreInput(currentScore)
    }
}

//Create a Username Input display that shows the users score and allows them to enter username
//User name and score will be entered into High Score if score beats the current high score
function showHighScoreInput(score){
    clearInterval(interval);
    var input = document.createElement('input');
    var button = document.createElement('button');
    button.innerText = "Submit";
    button.classList.add('btn');
    answerDisplayEle.appendChild(input);
    answerDisplayEle.appendChild(button);

    let time = timerCounterEle.textContent;
    let timeBonus = (Math.floor(time / 10));
    let userScore = parseInt(score) + timeBonus;

    if(timeBonus > 0){
        questionEle.innerText = "Your Score is " + score + ". You got " + timeBonus + " bonus points for making good time! Please enter your username:";
    } else {
        questionEle.innerText = "Your Score is " + score + ". Please enter your username:";
    }

    button.addEventListener("click", function(){
        let userInput = input.value;
        setHighScore(userScore, time, userInput);
        resetCard();
        startButton.classList.remove('hide');
        questionCard.classList.add('hide');
        timerCounterEle.textContent = "75";
        scoreEle.textContent = "0";
    })
}

//Gathers score, time, and username. Checks if user has high score then assigns to local storage and calls display
function setHighScore(score, time, userInput){
    let newScore = parseInt(score);
    let checkScore = localStorage.getItem('highScore');

    if(checkScore >= newScore){
        //do nothing
    } else{
        localStorage.setItem("highScore", newScore); 
        localStorage.setItem("userName", userInput); 
        highScoreEle.textContent = newScore;
        userNameEle.textContent = userInput;
    }

    pullHighScore();
}

//Pull info from local storage and display it on site
function pullHighScore(){
    //pull the highscore from local storage and display it in highscore
    let setScore = localStorage.getItem("highScore");
    let userName = localStorage.getItem('userName');

    //This sets the local storage for high score. If a refresh happens, this will check
    //to make sure the correct high score is showing and does not reset back to 0.
    if(!setScore){
        setScore = highScoreEle.textContent
    } else{
        highScoreEle.textContent = " " + setScore;
        userNameEle.textContent = " " + userName;
    }
}

//Reset the Question Card to blank
function resetCard(){
    timerCounterEle.classList.remove('error');
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
    var scoreEle = document.getElementById('current-score');
    var score = scoreEle.textContent;
    
    if(isCorrect){
        resetCard();
        correctDisplayEle.classList.remove('hide');
        correctDisplayEle.innerText = "Correct!";
        score++;
        scoreEle.textContent = score;
        nextButton.classList.remove('hide');
    } else{
        resetCard();
        correctDisplayEle.classList.remove('hide');
        correctDisplayEle.innerText = "Incorrect.   -5 Secs";
        nextButton.classList.remove('hide');
        timerCounterEle.classList.add('error');
        timePenalty();
    }
}

//Remove 4 seconds when function is called
function timePenalty(){
    totalSeconds = totalSeconds - 4
}

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    setTime();

    // We only want to start the timer if totalSeconds is > 0
    if (totalSeconds > 0) {
      /* The "interval" variable here using "setInterval()" begins the recurring increment of the
         totalSeconds variable which is used to check if the time is up */
        interval = setInterval(function() {
            totalSeconds--; 
            renderTime();
        }, 1000);
    } else {
        //This should never activate
        alert("You have run out of time")
    }
}

function setTime() {
    totalSeconds = timerCounterEle.textContent;
    clearInterval(interval);
}

// Display time and check to see if time is up. If time is up, display the HighScore Page (showHighScoreInput)
function renderTime() {
    timerCounterEle.textContent = totalSeconds;

    if (totalSeconds <= 0) {  
        stopTimer();
        resetCard();
        var score = scoreEle.textContent;
        showHighScoreInput(score);
    }
}

function stopTimer(){
    clearInterval(interval);
}

//Make sure that if page is refreshed, the highscore is still displayed
pullHighScore();  

//List of questions to be provided
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
    question: 'What species is Jabba?',
    answers: [
        { text: 'Ithorian', correct: false},
        { text: 'Hutt', correct: true },
        { text: 'Jawa', correct: false },
        { text: "Twi'lek", correct: false }
    ]
},
{
    question: 'Which order brought about the death of the Jedi?',
    answers: [
        { text: 'Order 55', correct: false},
        { text: 'Order 88', correct: false },
        { text: 'Order 66', correct: true },
        { text: "Order 77", correct: false }
    ]
},
{
    question: 'What is the name of the actress who played Princess Leia?',
    answers: [
        { text: 'Gillian Anderson', correct: false},
        { text: 'Sigourney Weaver', correct: false },
        { text: 'Linda Hamilton', correct: false },
        { text: "Carrie Fisher", correct: true }
    ]
},
{
    question: 'Who are the only two characters who appear in ever Star Wars movie?',
    answers: [
        { text: 'C-3P0 / R2-D2', correct: true},
        { text: 'Luke / Leia', correct: false },
        { text: 'Darth Vader / Emperor Palpatine', correct: false },
        { text: "Han Solo / Chewbacca", correct: false }
    ]
},
{
    question: 'On which planet do we first meet Rey in The Force Awakens?',
    answers: [
        { text: 'Tattoine', correct: false},
        { text: 'Jakku', correct: true },
        { text: 'Coruscant', correct: false },
        { text: 'Mustafar', correct: false }
    ]
},
{
    question: 'Which furry species lives on the forest moon of Endor?',
    answers: [
        { text: 'Ewoks', correct: true},
        { text: 'Wookiees', correct: false },
        { text: 'Hutts', correct: false },
        { text: 'Jawas', correct: false }
    ]
},
{
    question: 'Who originally played Han Solo?',
    answers: [
        { text: 'Mel Gibson', correct: false},
        { text: 'Sylvester Stallone', correct: false },
        { text: 'Harrison Ford', correct: true },
        { text: 'Mark Hamill', correct: false }
    ]
},
{
    question: "What were Luke's aunt and uncle's job on Tatooine?",
    answers: [
        { text: 'Blue Milk Farmer', correct: false},
        { text: 'Driod Repair', correct: false },
        { text: 'Moisture Farmer', correct: true },
        { text: 'Womp Rat Farmer', correct: false }
    ]
},
{
    question: "In how many languages is C-3P0 fluent?",
    answers: [
        { text: 'More than 6 Million', correct: true},
        { text: 'Over 9000', correct: false },
        { text: '3720', correct: false },
        { text: "C-3P0 can't talk...", correct: false }
    ]
},
{
    question: "What is the Wookiee's home world?",
    answers: [
        { text: 'Yavin 4', correct: false},
        { text: 'Dantooine', correct: false },
        { text: 'Alderan', correct: false },
        { text: "Kashyyyk", correct: true }
    ]
},
{
    question: "What is the name of Boba Fett's ship?",
    answers: [
        { text: 'Millenium Falcon', correct: false},
        { text: 'Salve 1', correct: true },
        { text: 'Chimaera', correct: false },
        { text: "The Ghost", correct: false }
    ]
},
{
    question: "Who is the creator of Star Wars?",
    answers: [
        { text: 'Steven Spielberg', correct: false},
        { text: 'Robert Zemeckis', correct: false },
        { text: 'George Lucus', correct: true },
        { text: "John Hughes", correct: false }
    ]
},
{
    question: "Where was Luke Skywalker originally headed to pick up power converters?",
    answers: [
        { text: 'Mos Eisley', correct: false},
        { text: 'Black Spire Outpost', correct: false },
        { text: 'Tosche Station', correct: true },
        { text: "Oga's Cantina", correct: false }
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
