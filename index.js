var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() { //
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

$(".btn").click(function() {
  if (started) { // This makes no more button clicks
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length - 1);
  }
});

function checkAnswer(lastClick) {
  if (gamePattern[lastClick] === userPattern[lastClick]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
