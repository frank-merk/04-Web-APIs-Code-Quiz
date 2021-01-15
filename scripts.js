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

var start = document.querySelector("#startbutton"); // start button
var highScoresLink = document.querySelector(".highscores-link"); // link in top left corner to view scores
var questionEl = document.querySelector("#questions"); // main element that we're manipulating
var highScores = document.querySelector("#highscores"); // the secondary element manipulated
highScores.style.display = "none"; // hide that element for now
var time = document.querySelector(".timer"); // empty element that starts counting down when they start the quiz
var clearEl = document.querySelector("#clearscores"); // button the scores page that lets users clear old scores


// clock related variables
var timeRemaining = 100; // start the clock
var wrongAnswer = 20; // points off, if wrong answer
var timerInterval = 0; // empty timer interval we need to control clock elements

// We need a function that will generate quiz question html from that object array we declared earlier

// Where qIndex is a position in the quiz array, we're going to move through each question object in the array, and render out the different parts of that object as html elements that display in the browser. 

var qIndex = 0;
function createQuizQuestions(qIndex){
    questionEl.textContent = ""; // empty question element to start with
    var optionsCreate = document.createElement("ul"); // options will display in this list
    optionsCreate.innerHTML = "" // starting from empty
    for (i = 0; i < quiz.length; i++) {
        var questionNumber = quiz[qIndex].question; // question prompt
        var optionsList = quiz[qIndex].options; // spits out the list of options
        questionEl.textContent = questionNumber; // displays the question text
        console.log(questionNumber); // for debugging
    }
    // for each loop that takes each item in our options list, creates a list element for it, populates the html and appends to the options list
    optionsList.forEach(function (item) {
        var choice = document.createElement("li")
        choice.textContent = item;
        questionEl.appendChild(optionsCreate);
        optionsCreate.appendChild(choice);
        choice.addEventListener("click", (checkAnswer)); // event listener checking for a correct response.
        console.log(item); // debugging 
    });
}

// Clock functionality
start.addEventListener("click", function() {
     if (timerInterval === 0) { // Set this at the beginning
        timerInterval = setInterval(function () {
            timeRemaining--; // countdown
            time.textContent = "Time: " + timeRemaining;

                if (timeRemaining <= 0) {
                clearInterval(timerInterval); // clears the timer
                endQuiz(); // quiz is over, time's up
                time.textContent = "You ran out of time!"
                }
            }, 1000);
        } 
    createQuizQuestions(qIndex); // Renders the first quiz question
});

function checkAnswer(event) {

    var selection = event.target; // checks the user clicked on something
    var selectionDiv = document.createElement("div");
    selectionDiv.setAttribute("id", "selectionDiv"); // logs what the user picked
    selectionDiv.innerHTML = "" // setting this empty for now
    if (selection.matches("li")) { // if they clicked list element...
        if (selection.textContent === quiz[qIndex].answer) { // check the content agains the answer in the object
            selectionDiv.textContent = "Correct: The answer is " + quiz[qIndex].answer; // if correct, tell em
        } else {
                selectionDiv.textContent = "Wrong: The answer is " + quiz[qIndex].answer; // tell them if they're wrong...
                timeRemaining = timeRemaining - wrongAnswer; // and penalize
            }
        }
        qIndex++; // add to the question index
        if (qIndex >= quiz.length) {
            endQuiz(); // finish when we're out of questions
            selectionDiv.textContent = "Thanks for playing!";
            
        } else {
            createQuizQuestions(qIndex); // if there are more questions, keep going
        } 
        questionEl.appendChild(selectionDiv);

    }
 // run down of stuff that happens when the quiz is over
function endQuiz() {
    // clear everything
    clearInterval(timerInterval);
    questionEl.innerHTML = "";
    time.innerHTML = "";

    // score message
    var headline = document.createElement("h1");
    headline.textContent = "You finished! Your score is " + timeRemaining + ". Enter your initials to log your score.";
    questionEl.appendChild(headline);

    // box for user identification
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute = ("id", "initials");
    questionEl.appendChild(initialsInput);

    // spacer
    var linebreak = document.createElement("br");
    questionEl.appendChild(linebreak);

    // create the submit button
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submit")
    questionEl.append(submitButton);
    
    //when the user clicks submit...
    submitButton.addEventListener("click", function getScores () {
        
        // take them to the high score page
        showHighScores();
        // store their initials
        var initials = initialsInput.value;
        console.log(initials); //debugging
        
        // object with user data
        var userData = {
                initials: initials,
                score: timeRemaining
            };

        // store that data, and stringify it so we can use it later
        localStorage.setItem("userData", JSON.stringify(userData));
        // look for existing scores
        var scoreList = localStorage.getItem("scoreList");
        
        // if they don't exist...
        if (scoreList === null) {
            //make them.
            scoreList = [];
        } else {
            //otherwise, parse out the scorelist array
            scoreList = JSON.parse(scoreList);
        }

        // add the users score to the array
        scoreList.push(userData);
        var newUser = JSON.stringify(scoreList);
        localStorage.setItem("scoreList", newUser);

        // go through that array and make a list item for each name in it, and display it on the page
        for (i =0; i < scoreList.length; i++) {
            var newLine = document.createElement("li");
            newLine.innerHTML = "Initials: " + scoreList[i].initials + "<br />" + "Score: " + scoreList[i].score;
            highscores.appendChild(newLine);
            }
        });
}

// show high scores link
highScoresLink.addEventListener("click", (showHighScores));

// makes the high scores element visible and hides the questions element. Displays the high scores
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

// clear local storage
clearEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});