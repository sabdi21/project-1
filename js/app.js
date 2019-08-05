'use strict'

//-----------------Global Variables------------------------------//

var easy = ["ACRES", "ACT", "BASIC", "BASIS", "BAT", "BE", "BEAN", "BEAR", "BEAT", "BEE", "BEEN", "BEGAN", "BEGUN", "CHART", "CHECK", "CHEST", "CHIEF", "CHILD", "CROP", "CROSS", "CROWD", "CRY", "CUP", "CURVE", "CUT", "DAILY", "DANCE", "DARK", "DATE", "DAWN", "DAY", "DEAD", "DEAL", "DEAR"]

var medium = ["ACCOUNT", "ACCURATE", "ACROSS", "ACTION", "ACTIVE", "ACTIVITY", "BASEBALL", "BASKET", "BATTLE", "BEAUTY", "BECAME", "BECAUSE", "BECOME", "BECOMING", "BEFORE", "BEHAVIOR", "BEHIND", "CHANCE", "CHANGE", "CHANGING", "CHAPTER", "CHARGE", "CHEESE", "CHEMICAL", "CHICKEN", "CHILDREN", "CURIOUS", "CURRENT", "CUSTOMS", "CUTTING", "DAMAGE", "DANGER", "DARKNESS", "DAUGHTER", "DECIDE", "DECLARED", "DEEPLY", "DEGREE", "DEPEND", "DESCRIBE", "DESERT", "DESIGN", "DETAIL", "EXCEPT", "EXCHANGE", "EXCITED", "EXCITING", "EXERCISE", "EXPECT", "EXPLAIN", "EXPLORE", "EXPRESS", "FACING", "FACTOR", "FACTORY", "FAILED", "FAIRLY", "FALLEN", "FAMILIAR", "FAMILY", "FAMOUS", "FARMER", "FARTHER", "FASTENED", "FASTER", "FATHER", "FAVORITE", "FEATHERS", "FEATURE", "FELLOW", "GRABBED", "GRAVITY", "GREATER", "GREATEST", "GREATLY", "GROUND", "GROWTH", "HALFWAY", "HANDLE", "HANDSOME", "HAPPEN", "HAPPENED", "HAPPILY", "HARBOR", "HARDER", "HARDLY", "INSTANCE", "INSTANT", "INSTEAD", "INTEREST", "INTERIOR", "INVENTED", "INVOLVED", "ISLAND", "ITSELF", "JOINED", "JOURNEY", "JUNGLE", "KITCHEN", "LANGUAGE", "LARGER", "LARGEST", "LAYERS", "MINERALS", "MINUTE", "MIRROR", "MISSING", "MISSION", "MISTAKE", "NUMBER", "NUMERAL", "OBJECT", "OBSERVE", "OBTAIN", "OFFICE", "OFFICER", "OFFICIAL", "PURPOSE", "PUTTING", "QUARTER", "QUESTION", "QUICKLY", "QUIETLY", "RABBIT", "RAILROAD", "RAPIDLY", "RATHER", "READER", "REALIZE", "SUGGEST", "SUMMER", "SUNLIGHT", "SUPPER", "SUPPLY", "SUPPORT", "SUPPOSE", "SURFACE", "SURPRISE", "SWIMMING", "SYLLABLE", "SYMBOL", "SYSTEM", "TAUGHT", "TEACHER", "TWELVE", "TWENTY", "TYPICAL", "UNHAPPY", "UNIVERSE", "UNKNOWN", "UNLESS", "UNUSUAL", "UPWARD", "VESSELS", "VICTORY", "VILLAGE", "VISITOR", "VOLUME", "VOYAGE", "WEALTH", "WEATHER", "WRAPPED", "WRITER", "WRITING", "WRITTEN", "YELLOW", "YOUNGER", "YOURSELF"];

var hard = ["ACCURATE", "ACTIVITY", "BASEBALL", "BEAUTIFUL", "BECOMING", "BEGINNING", "BEHAVIOR", "CHANGING", "CHARACTER", "CHARACTERISTIC", "CHEMICAL", "CHILDREN", "DANGEROUS", "DARKNESS", "DAUGHTER", "DECLARED", "DEFINITION", "DESCRIBE", "EXCELLENT", "EXCHANGE", "EXCITEMENT", "EXCITING", "EXCLAIMED", "EXERCISE", "EXPERIENCE", "EXPERIMENT", "EXPLANATION", "EXPRESSION", "FAMILIAR"];

var userScore = 0;
var totalScore = 0;
var totalScoreArray = [];
var userNameArray = [];

var timeleft = 60;
var timer;

var randomWord;
var randomWordSplit = [];
var textContentSplit = [];

var getUserScore = 0;
var storedUserScore = 0;
var userName;
var userObjectArr = [];
var user = {};


//----------------DOM References------------------------------//
var wordBoxReference = document.getElementById('word-box');
var input = document.getElementById('input');
var log = document.getElementById('user-text');
var button = document.getElementById("button");

var welcometext = document.getElementById('welcome');

var changeTimer = document.getElementById('timer');
var changeScoreText = document.getElementById('user-score');


//----------------EVENT LISTENERS------------------------------//
button.addEventListener("click", function () {
    welcometext.removeAttribute('class');
    welcometext.setAttribute('class', 'translate');
    button.setAttribute('class', 'start');
  
    startGame();
  });


  button.addEventListener("click", function () {
    welcometext.removeAttribute('class');
    welcometext.setAttribute('class', 'translate');
    button.setAttribute('class', 'start');
  
    startGame();
  });

//----------------START GAME------------------------------//
function startGame() {
    //   getUserName();
    //   input.value = "";
      wordBoxReference.innerHTML = '';
      document.getElementById("input").focus();
    
      userScore = 0;
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
      timeleft = 60;
    
      countdown();
      generateRandomWord();
      input.addEventListener('input', checkUserInput);
    };


//---------------GENERATE RANDOM WORDS ---------------//

function generateRandomWord() {
  if (userScore <= 4) {
    randomWord = easy[Math.floor(Math.random() * easy.length)];
    randomWordSplit = randomWord.split('');
  } else if (userScore >= 5 && userScore <= 9) {
    randomWord = medium[Math.floor(Math.random() * medium.length)];
    randomWordSplit = randomWord.split('');
  } else if (userScore >= 10 && userScore < 20) {
    randomWord = hard[Math.floor(Math.random() * hard.length)];
    randomWordSplit = randomWord.split('');
  }
  for (var i = 0; i < randomWordSplit.length; i++) {
    var span = document.createElement('span')
    span.textContent = randomWordSplit[i];
    span.setAttribute('id', i);
    span.removeAttribute('class');
    wordBoxReference.append(span);
  }
};

//=======CHECK IF INPUT IS CORRECT
//===========CHECK IF THE LETTER IS NOT HIGHLIGHTED IF IT'S RIGHT OR WRONG

function highlightLetters() {
  textContentSplit = log.textContent.split('')
  for (var i = 0; i < randomWordSplit.length; i++) {
    if (randomWordSplit[i] === textContentSplit[i]) {
      document.getElementById(`${i}`).setAttribute('class', 'text-color');
      console.log(`${randomWordSplit[i]} is the same as ${textContentSplit[i]}`)
    }
    if (randomWordSplit[i] !== textContentSplit[i]) {
    }
  }
  console.log(randomWordSplit[i] !== textContentSplit[i]);
}

function checkUserInput(event) {
  log.textContent = event.target.value.toUpperCase();
  if (log.textContent === randomWord) {
    if (userScore >= 20) { 
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
      timeleft = timeleft + 3;
    }
    wordBoxReference.innerHTML = '';
    input.value = "";
    userScore++;
    document.getElementById('user-score').innerHTML = userScore;

    generateRandomWord();


  } else {
    highlightLetters();
  }
}


//----------------------SET TIMER ------------------//
function countdown() {
    document.getElementById("timer").innerHTML = timeleft;
    timeleft -= 1;
    if (timeleft === -1) {
        clearInterval(timer);

        totalScore = userScore;
        totalScoreArray.push(totalScore);
        saveUserScore();
        retrieveUserScore();
        gameOver();

        input.value = "";
        input.removeEventListener('input', checkUserInput);


        button.setAttribute('class', 'play-again');
    }
}
