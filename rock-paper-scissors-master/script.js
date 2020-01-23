var modal = document.getElementsByClassName('modal')[0];
var modalContent = document.getElementsByClassName('modal-content')[0];
var modalCloseBtn = document.getElementsByClassName('close')[0];
var rulesBtn = document.getElementsByClassName('rules')[0];

var signs = document.getElementsByClassName('wrapper');
var paper = signs[0];
var scissors = signs[1];
var rock = signs[2];


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

function signClickedFunc(sign){
    console.log(sign);
}

// modalOpenFunc();


// Event Listeners

modal.addEventListener('click', (event) => {
    if(event.target === modal) {
        modalCloseFunc();
    }
});

modalCloseBtn.addEventListener('click', modalCloseFunc);

rulesBtn.addEventListener('click', modalOpenFunc);


paper.addEventListener('click', (event) => {
    signClickedFunc('paper');
});

scissors.addEventListener('click', (event) => {
    signClickedFunc('scissors');
});

rock.addEventListener('click', (event) => {
    signClickedFunc('rock');
});