var triviaQuestions = [{
	question: "What percentage of Toromnto residents speak a language other then English?",
	answerList: ["50%", "30%", "40%", "60%"],
	answer: 1
},{
	question: "The same year the Maple Leafs last won the Stanley Cup this also happened in Toronto.",
	answerList: ["Pizza Pizza was founded", "The Toronto Act was signed", "CN tower broke ground", "Toronto got its first MLB team"],
	answer: 0
},{
	question: "How many taxi licenses does the City of Toronto issue each year?",
	answerList: ["10,000", "5,000", "25,000", "None"],
	answer: 0
},{
	question: "Why did Rob Ford remove half of Toronto's newly installed bike lanes after becoming mayor?",
	answerList: ["To make more room for pedestrians", "To make more room for cars", "He hates bicyclists", "To save the city money"],
	answer: 2
},{
	question: "Who was the only knuckleball pitcher to play for the Toronto Blue Jays?",
	answerList: ["Dave Stieb", "Roy Halladay", "Jimmy Key", "R.A. Dickey"],
	answer: 3
},{
	question: "How many kilometers of roads does Toronto have?",
	answerList: ["5,365 km", "3,987 km", "6,452 km", "7,158 km"],
	answer: 0
},{
	question: "Why is Toronto called 'Hog Town'?",
	answerList: ["The Big Smoke was taken", "It's name used as a reference to the stockyards", "Toronto is famous for back bacon on a bun, coining the name", "The name was coined by bankers on Bay Street"],
	answer: 1
},{
	question: "How many days of measurable sunshine does Toronto get in an average year?",
	answerList: ["256", "171", "301", "58"],
	answer: 2
},{
	question: "Why did Toronto choose the name 'Raptors' for its NBA team during the name selection?",
	answerList: ["A raptor fossil had just been displayed at the ROM", "Jurrasic Park was in theaters", "Nike suggested it because of a new clothing line", "It's the only animal that could use the colours red and purple"],
	answer: 1
},{
	question: "Why is Toronto called 'The Six'?",
	answerList: ["The area code is 416", "It was better than 4", "It came from a tweet of mini Drake on top of the CN tower", "The nickname comes from the GTA's 6 major areas"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('.content').empty();
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "425px" height = "250px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}




