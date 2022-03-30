
var questions = [
    {
        title: "How many typed of windows does python use:",
        choices: ["front window", "Code window and shell window", "car window", "side window"],
        answer: "Code window and shell window"
    },
    {
        title: "What symbols make up the Python language",
        choices: ["quotes", "curly brackets", "parentheses", "words and characters"],
        answer: "words and characters"
    },
    {
        title: "What is computer coding?",
        choices: ["fixing computer games", "Coding tells a computer what to do", "looking at code", "all of the above"],
        answer: "Coding tells a computer what to do."
    },
    {
        title: "Which of these is a programming language? ",
        choices: ["scratch", "Itch", "rub", "tug"],
        answer: "Scratch"
    },
    {
        title: "What word describes the set of instructions that computers ned to work?",
        choices: ["talking", "Program", "a script", "console log"],
        answer: "Program"
    },

];

var score = 0;
var questionIndex = 0;
var score = localStorage.getItem("score");
console.log(score)


var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var page = document.querySelector("#page");



var secondsLeft = 90;

var holdInterval = 0;

var penalty = 10;

var ulCreate = document.createElement("ul");


timer.addEventListener("click", function () {
  
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "You're done!";
            }
        }, 1000);
    }
    render(questionIndex);
});

 
function render(questionIndex) {
     
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
         
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
             
        } else {
            
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    
    questionIndex++;

    if (questionIndex >= questions.length) {
        
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You're done!";

    questionsDiv.appendChild(createH1);

    
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    
    var createlink = document.createElement("a");
    createlink.setAttribute("href","./assets/HighScores.html");
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createlink);
    createlink.appendChild(createSubmit);


    
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
             window.location.replace("HighScores.html");
        }
    });

}

