'use strict'
//-----------------Global Variables------------------------------//
var easy; 
var medium;
var hard;
var insanity

var getUserScore = 0;
var storedUserScore = 0;

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
var highScores = [];
var user = {};


//----------------DOM References-----------------//
document.getElementById('sunny').play();
var wordBoxReference = document.getElementById('word-box');
var input = document.getElementById('input');
var log = document.getElementById('user-text');
var button = document.getElementById("button");

var welcomeText = document.getElementById('message');
var gameLevel = document.getElementById('level-message');
var changeTimer = document.getElementById('timer');
var changeScoreText = document.getElementById('user-score');
var userNameInput = document.getElementById('user-name')

//----------------EVENT LISTENERS----------------//
button.addEventListener("click", function () {
  button.setAttribute('class', 'start');
  startGame();
});

//----------------START GAME---------------------//
function startGame() {
  document.getElementById('typing').play();
  welcomeText.textContent = "";
  console.log('function START GAME is running')
  initialize()
  getUserName();
  input.value = "";
  wordBoxReference.innerHTML = '';
  document.getElementById("input").focus();
  userNameInput.style.visibility = "hidden"

  countdown();
  generateRandomWord();
  input.addEventListener('input', checkUserInput);
};


//----------GENERATE RANDOM WORDS ---------------//
function generateRandomWord() {
  var index;
  if (userScore <= 4) {
    console.log('player is in easy mode');
    document.getElementById('sunny').play();
    gameLevel.textContent = 'You are playing EASY mode.';
    gameLevel.style.color = 'green';
    
    index = Math.floor(Math.random() * easy.length)
    randomWord = easy[index];
    randomWordSplit = randomWord.split('');
    easy.splice(index, 1);
 

  } else if (userScore >= 5 && userScore <= 9) {  
    // document.getElementsByClassName('body-background')[0].classList.add('hard');
    gameLevel.textContent = 'You are playing MEDIUM mode.';
    gameLevel.style.color = 'yellow';
    console.log('player is in medium mode');
    index = Math.floor(Math.random() * medium.length);
    randomWord = medium[index];
    randomWordSplit = randomWord.split('');
    medium.splice(index, 1);
    // add style changes

  } else if (userScore >= 10 && userScore <= 19) {
    gameLevel.textContent = 'You are playing HARD mode.';
    gameLevel.style.color = 'orange';
    console.log('player is in hard mode');
    index = Math.floor(Math.random() * hard.length);
    randomWord = hard[index];
    randomWordSplit = randomWord.split('');
    hard.splice(index, 1);
    // add style changes

  } else if (userScore >= 20) {
    // document.getElementsByTagName('body-background')[0].classList.add('hard');
    document.getElementById('sunny').pause();
    document.getElementById('thunder').play();
    gameLevel.textContent = 'You are playing INSANITY mode.';
    gameLevel.style.color = 'red';
    console.log('player is in insanity mode');
    index = Math.floor(Math.random() * insanity.length);
    randomWord = insanity[index];
    randomWordSplit = randomWord.split('');
    insanity.splice(index, 1);
    // add style changes
    
  } else {
      console.log('nothing should happen')
  }

  for (var i = 0; i < randomWordSplit.length; i++) {
    var span = document.createElement('span')
    span.textContent = randomWordSplit[i];
    span.setAttribute('id', i);
    span.removeAttribute('class');
    wordBoxReference.append(span);
  }
};

//----CHECK IF THE LETTER IS NOT HIGHLIGHTED IF IT'S RIGHT OR WRONG
function highlightLetters() {
  textContentSplit = log.textContent.split('')
  for (var i = 0; i < randomWordSplit.length; i++) {
    if (randomWordSplit[i] === textContentSplit[i]) {
      document.getElementById(i).setAttribute('class', 'text-color');
    }
    if (randomWordSplit[i] !== textContentSplit[i]) 
      { break;}
  }
}


//------CHECK IF INPUT IS CORRECT----------------//
function checkUserInput(event) {
  log.textContent = event.target.value.toUpperCase();
  randomWord.slice(randomWordSplit)
  if (log.textContent === randomWord) {
    wordBoxReference.innerHTML = '';
    input.value = "";
    userScore++;
    document.getElementById('user-score').innerHTML = userScore;
    generateRandomWord();
  } else {
    highlightLetters();
  }
}

//-------------------SET TIMER ------------------//
function countdown() {
  document.getElementById("timer").innerHTML = timeleft;
  timeleft -= 1;
  if (timeleft === -1) {
    document.getElementById('typing').pause();
    document.getElementById('thunder').pause();
    document.getElementById('sunny').play();
    clearInterval(timer);
    userNameInput.style.visibility = "visible";
    totalScore = userScore;
    totalScoreArray.push(totalScore);
    saveUserScore();
    retrieveUserScore();
    gameOver();

    input.value = "";
    input.removeEventListener('input', checkUserInput);

    button.setAttribute('class', 'play-again');
  }
  if (timeleft === 10) {
      document.getElementById('timer').style.color = 'red';
  }   
  saveUserScore();
  retrieveUserScore();
    
}

function saveUserScore() {
  var stringifiedUserScore = JSON.stringify(totalScoreArray);
  localStorage.setItem('Score', stringifiedUserScore)
}
  
function retrieveUserScore() {
  getUserScore = localStorage.getItem('Score');
  storedUserScore = JSON.parse(getUserScore);
}
  
//------------------- Game Over ------------------//
function gameOver() {
  if (storedUserScore.length === 1) {
    welcomeText.textContent = `Times up! You scored ${totalScore} points!`;
    welcomeText.style.color = 'purple'
    wordBoxReference.textContent = '';
    changeScoreText.textContent = '';
    gameLevel.textContent = '';
  }
  updateHighScore();
}

function updateHighScore() {
  var scoreList = document.getElementById('score-list');
  scoreList.innerHTML = ''; // resetting the list so it can be rendered again with additional scores

  var user = {
    name: userName,
    score: totalScore,
  }
  console.log(user);
  highScores.push(user);
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  for (var i = 0; i < highScores.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = `${highScores[i].name}: ${highScores[i].score} points`
    scoreList.append(listItem);
  }
}

function getUserName() {
  userName = userNameInput.value;
  userNameArray.push(userName);
  var stringifiedUserName = JSON.stringify(userNameArray);
  localStorage.setItem('Name', stringifiedUserName);
}



function initialize() {
  userScore = 0;
  clearInterval(timer);
  timer = setInterval(countdown, 1000);
  timeleft = 60;
  medium = ["ACCOUNT", "ACCURATE", "ACROSS", "ACTION", "ACTIVE", "ACTIVITY", "BASEBALL", "BASKET", "BATTLE", "BEAUTY", "BECAME", "BECAUSE", "BECOME", "BECOMING", "BEFORE", "BEHAVIOR", "BEHIND", "CHANCE", "CHANGE", "CHANGING", "CHAPTER", "CHARGE", "CHEESE", "CHEMICAL", "CHICKEN", "CHILDREN", "CURIOUS", "CURRENT", "CUSTOMS", "CUTTING", "DAMAGE", "DANGER", "DARKNESS", "DAUGHTER", "DECIDE", "DECLARED", "DEEPLY", "DEGREE", "DEPEND", "DESCRIBE", "DESERT", "DESIGN", "DETAIL", "EXCEPT", "EXCHANGE", "EXCITED", "EXCITING", "EXERCISE", "EXPECT", "EXPLAIN", "EXPLORE", "EXPRESS", "FACING", "FACTOR", "FACTORY", "FAILED", "FAIRLY", "FALLEN", "FAMILIAR", "FAMILY", "FAMOUS", "FARMER", "FARTHER", "FASTENED", "FASTER", "FATHER", "FAVORITE", "FEATHERS", "FEATURE", "FELLOW", "GRABBED", "GRAVITY", "GREATER", "GREATEST", "GREATLY", "GROUND", "GROWTH", "HALFWAY", "HANDLE", "HANDSOME", "HAPPEN", "HAPPENED", "HAPPILY", "HARBOR", "HARDER", "HARDLY", "INSTANCE", "INSTANT", "INSTEAD", "INTEREST", "INTERIOR", "INVENTED", "INVOLVED", "ISLAND", "ITSELF", "JOINED", "JOURNEY", "JUNGLE", "KITCHEN", "LANGUAGE", "LARGER", "LARGEST", "LAYERS", "MINERALS", "MINUTE", "MIRROR", "MISSING", "MISSION", "MISTAKE", "NUMBER", "NUMERAL", "OBJECT", "OBSERVE", "OBTAIN", "OFFICE", "OFFICER", "OFFICIAL", "PURPOSE", "PUTTING", "QUARTER", "QUESTION", "QUICKLY", "QUIETLY", "RABBIT", "RAILROAD", "RAPIDLY", "RATHER", "READER", "REALIZE", "SUGGEST", "SUMMER", "SUNLIGHT", "SUPPER", "SUPPLY", "SUPPORT", "SUPPOSE", "SURFACE", "SURPRISE", "SWIMMING", "SYLLABLE", "SYMBOL", "SYSTEM", "TAUGHT", "TEACHER", "TWELVE", "TWENTY", "TYPICAL", "UNHAPPY", "UNIVERSE", "UNKNOWN", "UNLESS", "UNUSUAL", "UPWARD", "VESSELS", "VICTORY", "VILLAGE", "VISITOR", "VOLUME", "VOYAGE", "WEALTH", "WEATHER", "WRAPPED", "WRITER", "WRITING", "WRITTEN", "YELLOW", "YOUNGER", "YOURSELF"];
  easy = ["ACRES", "ACT", "BASIC", "BASIS", "BAT", "BE"]
  hard  = ["ACCURATE", "ACTIVITY", "BASEBALL", "BEAUTIFUL", "BECOMING", "BEGINNING", "BEHAVIOR", "CHANGING", "CHARACTER", "CHARACTERISTIC", "CHEMICAL", "CHILDREN", "DANGEROUS", "DARKNESS", "DAUGHTER", "DECLARED", "DEFINITION", "DESCRIBE", "EXCELLENT", "EXCHANGE", "EXCITEMENT", "EXCITING", "EXCLAIMED", "EXERCISE", "EXPERIENCE", "EXPERIMENT", "EXPLANATION", "EXPRESSION", "FAMILIAR"];
  insanity = ["PHONOCARDIOGRAM", "METALINGUISTICS", "DETERMINATENESS", "NONMONISTICALLY", "PROLETARIANNESS", "PREORGANIZATION", "INTERPEDUNCULAR", "DERMATOPHYTOSIS", "NONARISTOCRATIC", "AUTECOLOGICALLY", "NONCONTROLLABLE", "NONEMANCIPATION", "RENORMALIZATION", "PRODISTRIBUTION", "NONDISCOVERABLE", "HYPEROXYGENIZED", "UNCOUNTERVAILED", "IRREFRAGABILITY", "WITHDRAWINGNESS", "CARPENTERSVILLE", "NONCONTINUATION", "SYLLABIFICATION", "RECONSOLIDATING", "BLAGOVESHCHENSK", "TREASONABLENESS", "TRANSACTIONALLY", "ANTIPERISTALTIC", "TRANSFILTRATION", "SUPERTEMPTATION", "ORONTIPHARYNGES", "PREINCORPORATED", "NONILLUSTRATIVE", "PSEUDORHEUMATIC", "NONDECASYLLABLE", "GYNAECOMORPHOUS", "ANACOLUTHICALLY", "NONINTERCEPTIVE", "THERMODIFFUSION", "HYPNOSPORANGIUM", "PHOTOMETRICALLY", "UNCONGRATULATED", "SUPERACCUMULATE", "OUTMALAPROPPING", "UNDEVELOPMENTAL", "SUPERORDINATING", "IRREPEALABILITY", "TERRITORIALIZED", "COLONIALIZATION", "UNEXPOSTULATING", "UNCONGLUTINATED"];
  }