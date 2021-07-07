    // Set up the JSON object for questions and answers
    var questions = [{
        question: "What is HTML?",
        choices: ['Hypnotic Text Made Legible', 'Hard Test Method Lookup', 'Hyper Text Markup Language', 'Happy Turtles March Last', 'Hydraulic Tanks Must Leak'],
        correctAnswer: "2"
        }, {
        question: "What is for for?",
        choices: ["For is for four", "Bad golf shots", "Conditional Statements", "For...While Loops", "For Loops"],
        correctAnswer: "4"
        }, {
        question: "What does do do?",
        choices: ["It specifies the task for the Do..While loop", "LOL do do", "It begins a non-repetitive task", "Do the DEW", "Calls an Element"],
        correctAnswer: "0"
        }, {
        question: "How is a Java Script file called from a HTML file?",
        choices: ["Cell Phone", "It isn't", "From a specific spot", "Script Element", "Anchor Element"],
        correctAnswer: "3"
        }, {
        question: "What is the correct symbol to query select by the ID  of the element?",
        choices: ["!", "@", "$", "*", "#"],
        correctAnswer: "4"
        }];
    
var questionCounter = 0; //Tracks question number
var selections = []; //Array containing user choices
var quiz = document.getElementById('quiz'); //Quiz div object
var choices = document.getElementById("qList"); //List of Answer Buttons
var startBtn = document.getElementById("start"); //Start Over Button
var timeBar = document.getElementById("myBar"); //Progress Timer Bar
var interval;
// var localScores = localStorage.setItem("scores") = {records:[]};

// Click handler for the 'Start' button
startBtn.addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  interval = startTimer(10);
  questionCounter = 0;
  selections = [];
  var scoreEl = document.getElementById("results");
  while (scoreEl !== null) {
    scoreEl.remove();
    var scoreEl = document.getElementById("results");
  } ;
  displayNext();
  startBtn.style.display = "none";
});
    
// Click handler for the answer button clicks
quiz.addEventListener('click', function (event) {
      event.preventDefault();
      var targetBtn = event.target;
      var selection = targetBtn.getAttribute("data-index");
      // Only move forward if the user selects a button with the "data-index" attribute
      if (selection == null) {
      } else {
        selections[questionCounter++] = selection; // get the user selection from the target object and increment the counter
        displayNext();
      }
});

// Displays next requested element
function displayNext() {
      var question = document.getElementById("qDiv");
      // Handle the first question
      if (question !== null){
        question.remove();
      }
      // Ony continue if there are more question
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion);
        
      }else { //Display the score after last question
        
        var initials = prompt("What are your initials?");
        var scoreElem = displayScore(initials);
        clearInterval(interval);
        quiz.append(scoreElem);
      
        startBtn.style.display = "block";
      }
}
    
//Construct the element for the Question and Answers
function createQuestionElement(index) {
      var qDiv = document.createElement('div');
      qDiv.setAttribute("id" ,"qDiv");
      var question = questions[index].question;
      var qElement = document.createElement("h1");
      qElement.textContent = "Question " + (index +1) + ": " +  question;
      qDiv.append(qElement); //Append the question element
    
      
      var buttons = createButtons(index); //Make the answer elements
      qDiv.append(buttons); //append the answer list element
      
      return qDiv;
}
    
// Creates a list of the answer choices as input buttons
function createButtons(index) {
      var radioList = document.createElement('ul');
      radioList.id = "qList"
      for (var i = 0; i < questions[index].choices.length; i++) {
        var choiceBtn = document.createElement('button');
        var item = document.createElement('li')
        choiceBtn.classList.add("activeBtn");
        choiceBtn.setAttribute("data-index", i);
        choiceBtn.innerHTML = questions[index].choices[i];
        item.append(choiceBtn);
        radioList.append(item);
      }
      return radioList;
}
    
   
// Gets previous scores and adds in the new one
function displayScore(initials) {
      var results = document.createElement("div");
      var score = document.createElement("p");
      score.id = 'score';
      score.setAttribute("id",'score');
      results.setAttribute("id", "results");
    
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.setAttribute("score", numCorrect);
      score.textContent = 'You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!';
      

      results.append(score);
      var histScores = getScores(initials, numCorrect);  
      results.append(histScores);
      return results;
}

function getScores (initials, score) {
      console.log(initials + " " + score );
      var scores = JSON.parse(localStorage.getItem("scores"));
      if (scores == null) {
        scores = {records:[]};
      } 

      var recJSON = {initials: "", score: ""};
      recJSON.initials = initials;
      recJSON.score = score;
      console.log(recJSON);

      scores.records.push(recJSON);
      localStorage.setItem("scores",JSON.stringify(scores));
      var listEl = document.createElement("ul");
      
       
      for (i=0; i < scores.records.length; i++) {
        var item = document.createElement("li");
        item.textContent = scores.records[i].initials + " Got " + scores.records[i].score;
        listEl.append(item);
      }

  return listEl;
}


//Timer functions

var startTime, countAmt;

function now() {
  return ((new Date()).getTime());
}

function tick() {
  var elapsed = now() - startTime;
  var cnt = countAmt - elapsed;
  if (cnt > 0) {
    var width = (Math.floor((elapsed/countAmt)*100)) + "%";
    console.log(cnt/1000);
    console.log(width);
    timeBar.style.width = width;
  } else {
    clearInterval(interval);
    timeBar.style.width = '100%';
    displayNext();
  }
}

function startTimer(secs) {
  clearInterval(interval);
  timeBar.style.width = "0%";
  countAmt = secs * 1000;
  startTime = now();
  interval = setInterval(tick, 1000);
  return interval;  
}