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
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
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
var conatinerEl = document.querySelector("#container");

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

start.addEventListener("click", function() {
    var timeRemaining = 75;
    var wrongAnswer = 10;
    setInterval(function () {
        timeRemaining--;
        time.textContent = "Time: " + timeRemaining;
    }, 1000);
    createQuizQuestions(qIndex);
});

function checkAnswer(event) {
    var selection = event.target;
    var selectionDiv = document.createElement("div");
    if (selection.matches("li")) {
        if (selection.textContent === quiz[qIndex].answer) {
            selectionDiv.textContent = "Correct: The answer is " + quiz[qIndex].answer; 
            var printThis = selectionDiv.textContent;
            console.log(printThis);
        } else {
                selectionDiv.textContent = "Wrong: The answer is " + quiz[qIndex].answer;
            }
        }
        qIndex++;
        createQuizQuestions(qIndex);
}

/* Pseudocode to finish and test:
The first question is rendered right now. We want to create a condition where if the user clicks on an element, it checks that the text content of that element matches the answer of the corresponding question object. If it does, it puts some text on the page like "Correct, the answer is ___", and if it's wrong, we subtract 10 points from the score and write out "Wrong, the correct answer is ____". Clicking on a choice element does one of those two things, then increments the qIndex and calls the createQuizQuestions function again, but now it will write the next question, and so on (this should also clear the questions div id, but may need to test...i think the way I have it written it will just replace). Then there are two conditions to finish the quiz. Either they complete it, or the timer hits zero, and they are taken to a prompt screen to enter their high score which will right to local storage. They can view it via JSON stringify on a separate page. */ 
