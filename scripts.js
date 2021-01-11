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

var qIndex = 0;
function createQuizQuestions(qIndex){
    var questionEl.innerHTML = "";
    var optionsCreate = document.createElement("ul");
    optionsCreate.innerHTML = ""
    for (i = 0; i < quiz.length; i++) {
        var questionNumber = quiz[qIndex].question;
        var optionsList = options[qIndex].options;
        questionEl.textContent = questionNumber;
    }

    optionsList.forEach(function (item) {
        var choice = document.createElement("li")
        choice.textContent = item;
        questionEl.appendChild(optionsCreate);
        optionsCreate.appendChild(choice);
        choice.addEventListener("click", (checkAnswer));
    }
}

