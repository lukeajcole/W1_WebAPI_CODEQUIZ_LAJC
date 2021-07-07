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
var choices = document.getElementById("qList"); //Next Button
var startBtn = document.getElementById("start"); //Start Over Button

// var localScores = localStorage.setItem("scores") = {records:[]};


startBtn.style.display = "block";

// Display initial question
startBtn.addEventListener('click',function(event){
    startBtn.style.display = "none";
      displayNext();
});
    
    // Click handler for the button clicks
quiz.addEventListener('click', function (event) {
      event.preventDefault();
      var targetBtn = event.target;
      var selection = targetBtn.getAttribute("data-index");
      // If no user selection, progress is stopped
      if (selection == null) {
      } else {
        selections[questionCounter] = selection;
        questionCounter++;
        displayNext();
      }
});
    
// Click handler for the 'Start' button
startBtn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      questionCounter = 0;
      selections = [];
      var scoreEl = document.getElementById("score");
      while (scoreEl !== null) {
        scoreEl.remove();
        var scoreEl = document.getElementById("score");
      } ;
      displayNext();
      startBtn.style.display = "none";
});
    
    // Animates buttons on hover
document.querySelector(".activeBtn").addEventListener('mouseenter', function () {
  document.querySelector(".activeBtn").classList.add('active');
});
document.querySelector(".activeBtn").addEventListener('mouseleave', function () {
  document.querySelector(".activeBtn").classList.remove('active');
});
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
function createQuestionElement(index) {
      var qDiv = document.createElement('div');
      qDiv.setAttribute("id" ,"qDiv");
      var question = questions[index].question;
      var qElement = document.createElement("h1");
      qElement.textContent = "Question " + (index +1) + ": " +  question;
      qDiv.append(qElement);
    
      
      var buttons = createButtons(index);
      qDiv.append(buttons);
      
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
    
    
    // Displays next requested element
function displayNext() {
        var question = document.getElementById("qDiv");
        if (question !== null){
          question.remove();
        }
    
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion);
          
        }else {
          var scoreElem = displayScore();

          // var initials = prompt("What are your initials?");
          quiz.append(scoreElem);
          // var highScores = getScores(initials, document.getElementById("score").getAttribute('score'));
          // quiz.append(highScores);
          startBtn.style.display = "block";
        }
}
    
    // Gets previous scores and presents them with a text box element to be displayed
function displayScore() {
      var results = document.createElement("div");
      var score = document.createElement("p");
      score.id = 'score';
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "initials")
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