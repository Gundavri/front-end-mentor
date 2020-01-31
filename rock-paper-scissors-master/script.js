var modal = document.getElementsByClassName('modal')[0];
var modalContent = document.getElementsByClassName('modal-content')[0];
var modalCloseBtn = document.getElementsByClassName('close')[0];
var rulesBtn = document.getElementsByClassName('rules')[0];
var textDivs = document.getElementsByClassName('selected-text');
var lines = document.getElementsByClassName('line');
var playerChoice = document.getElementById('player-choice');
var enemyChoice = document.getElementById('enemy-choice');
var playAgain = document.getElementById('play-again');
var playAgainBtn = document.getElementById('play-again-btn');
var playAgainText = document.getElementById('play-again-text');
var playerUnderneath = document.getElementById('player-underneath');
var enemyUnderneath = document.getElementById('enemy-underneath');
var initialRow1 = document.getElementsByClassName('initial-row-1');
var initialRow2 = document.getElementsByClassName('initial-row-2');
var scoreDiv = document.getElementsByClassName('score-num')[0];

// Variables after starting Bonus Mode
var toggleSwitch = document.getElementById('switch');
var modalImgs = document.getElementsByClassName('modal-body-image');
var signsWords = document.getElementsByClassName('signs-words');
var gameWrappers = document.getElementsByClassName('game-wrapper');

var signs = document.getElementsByClassName('wrapper');
var paper = signs[0];
var scissors = signs[1];
var rock = signs[2];


var score = 0;
var isTie = false;

// CONSTANS

const REVEAL_TIME = 0;


//  Modal Functions

function modalOpenFunc(){
    modal.style.display = 'block';
    modalContent.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 1);
    
}

function modalCloseFunc(){
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function paperCallback(event) {
    signClickedFunc('paper');
}

function scissorsCallback(event) {
    signClickedFunc('scissors');
}

function rockCallback(event) {
    signClickedFunc('rock');
}

function playAgainCallback(event) {
    addEventListeners();
    unchangeDisplayWhenChosen();
    unrandomizeAndDraw();
    undrawEnemy();
    undrawMiddle();
    unmoveUnderneathAndStyle();
    unmoveSelectedText();
}

function modeSwitchCallback(event) {
    if(toggleSwitch.checked) {
        changeToBonusMode();
    } else {
        changeToNormalMode();
    }
}



// Logic

function addEventListeners() {
    paper.addEventListener('click', paperCallback);
    scissors.addEventListener('click', scissorsCallback);  
    rock.addEventListener('click', rockCallback);
    paper.style.cursor = 'pointer';
    scissors.style.cursor = 'pointer';
    rock.style.cursor = 'pointer';
}

function removeEventListeners() {
    paper.style.cursor = 'default';
    scissors.style.cursor = 'default';
    rock.style.cursor = 'default';
    paper.removeEventListener('click', paperCallback);
    scissors.removeEventListener('click', scissorsCallback);
    rock.removeEventListener('click', rockCallback);
}

function changeDisplaysWhenChosen(){
    textDivs[0].style.display = 'block';
    textDivs[1].style.display = 'block';
    paper.style.display = 'none';
    scissors.style.display = 'none';
    rock.style.display = 'none';
    for(let ln of lines){
        ln.style.display = 'none';
    }
    playerChoice.style.display = 'block';
    enemyChoice.style.display = 'block';
    playerUnderneath.style.display = 'block';
    enemyUnderneath.style.display = 'block';
}

function unchangeDisplayWhenChosen(){
    playerChoice.style.display = 'none';
    enemyChoice.style.display = 'none';
    playerUnderneath.style.display = 'none';
    enemyUnderneath.style.display = 'none';
    textDivs[0].style.display = 'none';
    textDivs[1].style.display = 'none';
    paper.style.display = 'block';
    scissors.style.display = 'block';
    rock.style.display = 'block';
    for(let ln of lines){
        ln.style.display = 'block';
    }
}


function randomizeAndDraw(sign){
    result = {};
    randNum = Math.floor(Math.random() * 3);
    result.randNum = randNum;

    if(sign === 'paper') {
        playerChoice.appendChild(paper.cloneNode(true));
        if(randNum === 0) result.res = 0;
        else if(randNum === 1) result.res = -1;
        else if(randNum === 2) result.res = 1;
    } else if(sign === 'scissors'){
        playerChoice.appendChild(scissors.cloneNode(true));
        if(randNum === 0) result.res = 1;
        else if(randNum === 1) result.res = 0;
        else if(randNum === 2) result.res = -1;
    } else if(sign === 'rock') {
        playerChoice.appendChild(rock.cloneNode(true));
        if(randNum === 0) result.res = -1;
        else if(randNum === 1) result.res = 1;
        else if(randNum === 2) result.res = 0;
    }
    playerChoice.childNodes[0].style.display = 'block';
    if(!result.hasOwnProperty('res')) result.err = 'Something went wrong';

    return result;
}


function unrandomizeAndDraw(){
    result = {};
    playerChoice.removeChild(playerChoice.childNodes[0]);
}


function drawEnemy(num){
    if(num === 0) {
        enemyChoice.appendChild(paper.cloneNode(true));
    } else if(num === 1) {
        enemyChoice.appendChild(scissors.cloneNode(true));
    } else if(num === 2) {
        enemyChoice.appendChild(rock.cloneNode(true));
    }
    
    enemyChoice.childNodes[0].style.display = 'block';
    enemyChoice.childNodes[0].style.transform = 'translate(45%, 0)';
}


function undrawEnemy() {
    enemyChoice.removeChild(enemyChoice.childNodes[0]);
}


function drawMiddle(txt) {
    playAgain.style.display = 'block';
    playAgainText.innerText = txt;
}

function undrawMiddle() {
    playAgain.style.display = 'none';
}


function drawRes(num) {
    if(num === 0) {
        drawMiddle("TIE");
    } else if(num === -1) {
        score--;
        drawMiddle("YOU LOSE");
    } else if(num === 1) {
        score++;
        drawMiddle("YOU WIN");
    }
    scoreDiv.innerText = score;
}


function moveUnderneathAndStyle(res) {
    playerUnderneath.style.display = 'none';
    enemyUnderneath.style.display = 'none';
    if(res === 0) {
        isTie = true;
        return;
    }

    let tempUnderneaths = [];
    for(let i=0; i<3; i++){
        tempUnderneaths.push(document.createElement('div'));
        tempUnderneaths[i].style.position = 'absolute';
        tempUnderneaths[i].style.borderRadius = '50%';
        initialRow2[0].appendChild(tempUnderneaths[i]);
    }

    tempUnderneaths[0].style.backgroundColor = 'rgba(255, 255, 255, 0.01)';
    tempUnderneaths[0].style.zIndex = '-4';
    tempUnderneaths[0].style.width = '30vw';
    tempUnderneaths[0].style.height = '30vw';
    tempUnderneaths[1].style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
    tempUnderneaths[1].style.zIndex = '-3';
    tempUnderneaths[1].style.width = '25vw';
    tempUnderneaths[1].style.height = '25vw';
    tempUnderneaths[2].style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
    tempUnderneaths[2].style.zIndex = '-2';
    tempUnderneaths[2].style.width = '20vw';
    tempUnderneaths[2].style.height = '20vw';

    if(res === 1) {
        tempUnderneaths[0].style.transform = 'translate(-21.8vw, -10vw)';
        tempUnderneaths[1].style.transform = 'translate(-21.8vw, -7.5vw)';
        tempUnderneaths[2].style.transform = 'translate(-21.8vw, -5vw)';
    } else if(res === -1) {
        tempUnderneaths[0].style.transform = 'translate(22.2vw, -10vw)';
        tempUnderneaths[1].style.transform = 'translate(22.2vw, -7.5vw)';
        tempUnderneaths[2].style.transform = 'translate(22.2vw, -5vw)';
    }
}


function unmoveUnderneathAndStyle(){
    if(!isTie){
        for(let i=0; i<3; i++){
            initialRow2[0].removeChild(initialRow2[0].childNodes[initialRow2[0].childNodes.length-1]);
        }
    }
    console.log(initialRow2[0].childNodes);
    isTie = false;
}


function moveSelectedText() {
    textDivs[0].style.width = '44%';
    textDivs[1].style.width = '44%';
}

function unmoveSelectedText() {
    textDivs[0].style.width = '30%';
    textDivs[1].style.width = '30%';
}


function changeToNormalMode() {
    // open normal modal
    modalImgs[1].setAttribute('style', 'display:none !important');
    modalImgs[0].setAttribute('style', 'display:inline !important');
    // modalOpenFunc();
  
    
    console.log('normal')
    gameWrappers[0].style.display = 'block';
    gameWrappers[1].style.display = 'none';
}

function changeToBonusMode() {
    // open bonus modal
    modalImgs[0].setAttribute('style', 'display:none !important');
    modalImgs[1].setAttribute('style', 'display:inline !important');
    // modalOpenFunc();


    console.log(modalImgs);
    gameWrappers[0].style.display = 'none';
    gameWrappers[1].style.display = 'block';
}



function signClickedFunc(sign){
    removeEventListeners();
    changeDisplaysWhenChosen();
    result = randomizeAndDraw(sign);
    console.log(result)
    setTimeout(() => {
        drawEnemy(result.randNum);
        setTimeout(() => {
            drawRes(result.res);
            moveUnderneathAndStyle(result.res);
            moveSelectedText();
        }, REVEAL_TIME);
    }, REVEAL_TIME);
}

// modalOpenFunc();
addEventListeners();
changeToBonusMode();
// removeEventListeners();
// changeDisplaysWhenChosen();
// scissorsCallback();



// Event Listeners

modal.addEventListener('click', (event) => {
    if(event.target === modal) {
        modalCloseFunc();
    }
});

modalCloseBtn.addEventListener('click', modalCloseFunc);

rulesBtn.addEventListener('click', modalOpenFunc);

playAgainBtn.addEventListener('click', playAgainCallback)


toggleSwitch.addEventListener('change', modeSwitchCallback);

