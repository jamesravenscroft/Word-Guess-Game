var selectableWords =           // Word list
    [
        "hyrule",  "link", "ganon",   "mastersword",  "legend", 
        "majora",   "zant", "darklink", "epona", "greatdekutree", "navi",
        "triforce", "biggoron", "ocarina", "ganondorf",
    ];

const maxTries = 10;            // Maximum number of tries player has

var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up
var losses = 0;

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // Make sure the hearts is cleared
    document.getElementById("hangmanImage").src = "";

    // Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};


  //  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLosses").innerText = losses;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
        losses++;
    }
};
/// Updates the image depending on how many guesses
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".jpg";
};

document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check for keys pressed. Double & is a Boolean
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        //check used letters
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the heart count. 
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
//triple equals signs means strict equality.
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
    
};





// window.onload = function () {

// //   var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
// //         'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
// //         't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
// //   var categories;         // Array of topics   *not used*
// //   var chosenCategory;     // Selected catagory
// //   var getHint ;          // Word getHint
//   var word ;              // Selected word
//   var guess ;             // Geuss
//   var geusses = [ ];      // Stored geusses
//   var lives ;             // Lives
//   var counter ;           // Count correct geusses
//   var space;              // Number of spaces in word '-'

//   // Get elements
//   var showLives = document.getElementById("mylives");
//   var showCatagory = document.getElementById("scatagory");
// //   var getHint = document.getElementById("hint");
// //   var showClue = document.getElementById("clue");



//   // create alphabet ul
//   var buttons = function () {
//     myButtons = document.getElementById('buttons');
//     letters = document.createElement('ul');

//     for (var i = 0; i < alphabet.length; i++) {
//       letters.id = 'alphabet';
//       list = document.createElement('li');
//       list.id = 'letter';
//       list.innerHTML = alphabet[i];
//       check();
//       myButtons.appendChild(letters);
//       letters.appendChild(list);
//     }
//   }
    
  
//   // Select Catagory- not used
// //   var selectCat = function () {
// //     if (chosenCategory === categories[0]) {
// //       catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
// //     } else if (chosenCategory === categories[1]) {
// //       catagoryName.innerHTML = "The Chosen Category Is Films";
// //     } else if (chosenCategory === categories[2]) {
// //       catagoryName.innerHTML = "The Chosen Category Is Cities";
// //     }
// //   }

//   // Create geusses ul
//    result = function () {
//     wordHolder = document.getElementById('hold');
//     correct = document.createElement('ul');

//     for (var i = 0; i < word.length; i++) {
//       correct.setAttribute('id', 'my-word');
//       guess = document.createElement('li');
//       guess.setAttribute('class', 'guess');
//       if (word[i] === "-") {
//         guess.innerHTML = "-";
//         space = 1;
//       } else {
//         guess.innerHTML = "_";
//       }

//       geusses.push(guess);
//       wordHolder.appendChild(correct);
//       correct.appendChild(guess);
//     }
//   }
  
//   // Show lives
//    comments = function () {
//     showLives.innerHTML = "You have " + lives + " lives";
//     if (lives < 1) {
//       showLives.innerHTML = "Game Over";
//     }
//     for (var i = 0; i < geusses.length; i++) {
//       if (counter + space === geusses.length) {
//         showLives.innerHTML = "You Win!";
//       }
//     }
//   }

// //       // Animate man
// //   var animate = function () {
// //     var drawMe = lives ;
// //     drawArray[drawMe]();
// //   }

  
// //    // Hangman
// //   canvas =  function(){

// //     myStickman = document.getElementById("stickman");
// //     context = myStickman.getContext('2d');
// //     context.beginPath();
// //     context.strokeStyle = "#fff";
// //     context.lineWidth = 2;
// //   };
  
// //     head = function(){
// //       myStickman = document.getElementById("stickman");
// //       context = myStickman.getContext('2d');
// //       context.beginPath();
// //       context.arc(60, 25, 10, 0, Math.PI*2, true);
// //       context.stroke();
// //     }
    
// //   draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
// //     context.moveTo($pathFromx, $pathFromy);
// //     context.lineTo($pathTox, $pathToy);
// //     context.stroke(); 
// // }

// //    frame1 = function() {
// //      draw (0, 150, 150, 150);
// //    };
   
// //    frame2 = function() {
// //      draw (10, 0, 10, 600);
// //    };
  
// //    frame3 = function() {
// //      draw (0, 5, 70, 5);
// //    };
  
// //    frame4 = function() {
// //      draw (60, 5, 60, 15);
// //    };
  
// //    torso = function() {
// //      draw (60, 36, 60, 70);
// //    };
  
// //    rightArm = function() {
// //      draw (60, 46, 100, 50);
// //    };
  
// //    leftArm = function() {
// //      draw (60, 46, 20, 50);
// //    };
  
// //    rightLeg = function() {
// //      draw (60, 70, 100, 100);
// //    };
  
// //    leftLeg = function() {
// //      draw (60, 70, 20, 100);
// //    };
  
// //   drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


//   // OnClick Function
//    check = function () {
//     list.onclick = function () {
//       var geuss = (this.innerHTML);
//       this.setAttribute("class", "active");
//       this.onclick = null;
//       for (var i = 0; i < word.length; i++) {
//         if (word[i] === geuss) {
//           geusses[i].innerHTML = geuss;
//           counter += 1;
//         } 
//       }
//       var j = (word.indexOf(geuss));
//       if (j === -1) {
//         lives -= 1;
//         comments();
//         animate();
//       } else {
//         comments();
//       }
//     }
//   }
  
    
//   // Play
//   play = function () {
//     categories = [
//         ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
//         ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
//         ["manchester", "milan", "madrid", "amsterdam", "prague"]
//     ];

//     chosenCategory = categories[Math.floor(Math.random() * categories.length)];
//     word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
//     word = word.replace(/\s/g, "-");
//     console.log(word);
//     buttons();

//     geusses = [ ];
//     lives = 10;
//     counter = 0;
//     space = 0;
//     result();
//     comments();
//     selectCat();
//     canvas();
//   }

//   play();
  
//   // Hint- not gon dah

// //     hint.onclick = function() {

// //       hints = [
// //         ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
// //         ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
// //         ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
// //     ];

// //     var catagoryIndex = categories.indexOf(chosenCategory);
// //     var hintIndex = chosenCategory.indexOf(word);
// //     showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
// //   };

//    // Reset

//   document.getElementById('reset').onclick = function() {
//     correct.parentNode.removeChild(correct);
//     letters.parentNode.removeChild(letters);
//     showClue.innerHTML = "";
//     context.clearRect(0, 0, 400, 400);
//     play();
//   }
// }


