// Declare an array of objects with the quiz questions, options, and the correct answer string that we can reference in a function later
var quiz = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];

var start = document.querySelector("#startbutton")
var time = document.querySelector(".timer");
var questionEl = document.querySelector("#questions");
var timerInterval;

// We need a function that will generate quiz question html from that object array we declared earlier

// Where qIndex is a position in the quiz array, we're going to move through each question object in the array, and render out the different parts of that object as html elements that display in the browser. 

var qIndex = 0;
function createQuizQuestions(qIndex){
    questionEl.textContent = "";
    var optionsCreate = document.createElement("ul");
    optionsCreate.innerHTML = ""
    for (i = 0; i < quiz.length; i++) {
        var questionNumber = quiz[qIndex].question;
        var optionsList = quiz[qIndex].options;
        questionEl.textContent = questionNumber;
        console.log(questionNumber);
    }

    optionsList.forEach(function (item) {
        var choice = document.createElement("li")
        choice.textContent = item;
        questionEl.appendChild(optionsCreate);
        optionsCreate.appendChild(choice);
        choice.addEventListener("click", (checkAnswer));
        console.log(item);
        
    });
}

var timeRemaining = 100;
var wrongAnswer = 20; 
var timerInterval = 0;

start.addEventListener("click", function() {
     if (timerInterval === 0) {
        timerInterval = setInterval(function () {
            timeRemaining--;
            time.textContent = "Time: " + timeRemaining;

                if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                endQuiz();
                time.textContent = "You ran out of time!"
                }
            }, 1000);
        } 
    createQuizQuestions(qIndex);
});

function checkAnswer(event) {

    var selection = event.target;
    var selectionDiv = document.createElement("div");
    selectionDiv.setAttribute("id", "selectionDiv");
    selectionDiv.innerHTML = ""
    if (selection.matches("li")) {
        if (selection.textContent === quiz[qIndex].answer) {
            selectionDiv.textContent = "Correct: The answer is " + quiz[qIndex].answer; 
        } else {
                selectionDiv.textContent = "Wrong: The answer is " + quiz[qIndex].answer;
                timeRemaining = timeRemaining - wrongAnswer;
            }
        }
        qIndex++;
        if (qIndex >= quiz.length) {
            endQuiz();
            selectionDiv.textContent = "Thanks for playing!";
            
        } else {
            createQuizQuestions(qIndex);
        } 
        questionEl.appendChild(selectionDiv);

    }

var highScores = document.querySelector("#highscores");
highScores.style.display = "none";

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.innerHTML = "";
    time.innerHTML = "";

    var headline = document.createElement("h1");
    headline.textContent = "You finished! Your score is " + timeRemaining + ". Enter your initials to log your score.";

    
    questionEl.appendChild(headline);

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute = ("id", "initials");
    
    questionEl.appendChild(initialsInput);
    var linebreak = document.createElement("br");
    questionEl.appendChild(linebreak);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submit")
    questionEl.append(submitButton);
    

    submitButton.addEventListener("click", function getScores () {
        
        showHighScores();
        var initials = initialsInput.value;
        console.log(initials);
        
        
        var userData = {
                initials: initials,
                score: timeRemaining
            };

        localStorage.setItem("userData", JSON.stringify(userData));
        var scoreList = localStorage.getItem("scoreList");
        
        if (scoreList === null) {
            scoreList = [];
        } else {
            scoreList = JSON.parse(scoreList);
        }

        

        scoreList.push(userData);
        var newUser = JSON.stringify(scoreList);
        localStorage.setItem("scoreList", newUser);

        for (i =0; i < scoreList.length; i++) {
            var newLine = document.createElement("li");
            newLine.innerHTML = "Initials: " + scoreList[i].initials + "<br />" + "Score: " + scoreList[i].score;
            highscores.appendChild(newLine);
            }
        });
}

var highScoresLink = document.querySelector(".highscores-link");
highScoresLink.addEventListener("click", (showHighScores));

function showHighScores () {
    time.remove();
    questionEl.remove();
    highScores.style.display = "block";
    highScoresLink.remove();
    var scoreList = localStorage.getItem("scoreList");
        
    if (scoreList === null) {
        scoreList = [];
        alert = "There are no scores to view";
    } else {
        scoreList = JSON.parse(scoreList);
    }

    for (i =0; i < scoreList.length; i++) {
        var newLine = document.createElement("li");
        newLine.textContent = "Initials: " + scoreList[i].initials + " " + "Score: " + scoreList[i].score;
        highscores.appendChild(newLine);
        }
}

var clearEl = document.querySelector("#clearscores");
clearEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});