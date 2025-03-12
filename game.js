var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var vari = 0; // Declare `vari` outside to maintain its state
var intervalId; // Declare `intervalId` outside for managing intervals

$(".starting").click(function() {
  if (!started) {
    nextSequence();
    started = true;
  } else {
    console.log("Game already started");
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
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

function nextSequence() {
  clearInterval(intervalId); // Clear existing interval
  vari = 0; // Reset `vari` to 0
  
  // Ensure that the timer element is reset
  document.getElementById("time").innerHTML = vari;
  document.getElementById("time").style.color = "white"
  

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  function timecalci() {
    vari += 1;
    console.log(vari);
    document.getElementById("time").innerHTML = vari;
if(vari > 50 && vari < 59){
  document.getElementById("time").style.color = "red";
}
    else if (vari >= 60) {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
      clearInterval(intervalId);
      vari= 0  ;
      document.getElementById("time").innerText = vari ;  // Ensure interval is cleared on game over
    } 
  }
  intervalId = setInterval(timecalci, 1000);
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
  clearInterval(intervalId); // Ensure interval is cleared on start over
}
