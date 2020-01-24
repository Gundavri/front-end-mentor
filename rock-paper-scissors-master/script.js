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
var playerUnderneath = document.getElementById('player-underneath');
var enemyUnderneath = document.getElementById('enemy-underneath');

var signs = document.getElementsByClassName('wrapper');
var paper = signs[0];
var scissors = signs[1];
var rock = signs[2];



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
    console.log(event);
    signClickedFunc('scissors');
}

function rockCallback(event) {
    console.log(event);
    signClickedFunc('rock');
}

function playAgainCallback(event) {
    console.log('blaaa');
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

function randomizeAndDraw(sign){
    result = {};
    randNum = Math.floor(Math.random() * 3);
    result.randNum = randNum;

    if(sign === 'paper') {
        playerChoice.appendChild(paper);
        paper.style.display = 'block';
        if(randNum === 0) result.res = 0;
        else if(randNum === 1) result.res = -1;
        else if(randNum === 2) result.res = 1;
    } else if(sign === 'scissors'){
        playerChoice.appendChild(scissors);
        scissors.style.display = 'block';
        if(randNum === 0) result.res = 1;
        else if(randNum === 1) result.res = 0;
        else if(randNum === 2) result.res = -1;
    } else if(sign === 'rock') {
        playerChoice.appendChild(rock);
        rock.style.display = 'block';
        if(randNum === 0) result.res = -1;
        else if(randNum === 1) result.res = 1;
        else if(randNum === 2) result.res = 0;
    }

    if(!result.hasOwnProperty('res')) result.err = 'Something went wrong';

    return result;
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


function drawMiddle(txt) {
    playAgain.style.display = 'block';

}


function drawRes(num) {
    if(num === 0) {
        drawMiddle("TIE");
    } else if(num === -1) {
        drawMiddle("YOU LOSE");
    } else if(num === 1) {
        drawMiddle("YOU WIN");
    }
}



function signClickedFunc(sign){
    removeEventListeners();
    changeDisplaysWhenChosen();
    result = randomizeAndDraw(sign);
    drawEnemy(result.randNum);
    drawRes(result.res);
}

// modalOpenFunc();
addEventListeners();
// removeEventListeners();
// changeDisplaysWhenChosen();
paperCallback();



// Event Listeners

modal.addEventListener('click', (event) => {
    if(event.target === modal) {
        modalCloseFunc();
    }
});

modalCloseBtn.addEventListener('click', modalCloseFunc);

rulesBtn.addEventListener('click', modalOpenFunc);

playAgainBtn.addEventListener('click', playAgainCallback)




