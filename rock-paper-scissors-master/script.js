var modal = document.getElementsByClassName('modal')[0];
var modalContent = document.getElementsByClassName('modal-content')[0];
var modalCloseBtn = document.getElementsByClassName('close')[0];



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

modalOpenFunc();

modal.addEventListener('click', (event) => {
    if(event.target === modal) {
        modalCloseFunc();
    }
});

modalCloseBtn.addEventListener('click', (event) => {
    modalCloseFunc();
});