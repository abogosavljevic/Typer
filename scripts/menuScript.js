let menuHolder = document.querySelector(".menu-holder");
let instructionsBtn = document.querySelector(".instructions-btn");
let startBtn = document.querySelector(".start-btn");
let plusElement = document.querySelector(".plus");

let instructionsElement = document.querySelector(".instructions");
let endMenuOverlay = document.querySelector(".finish-menu-overlay");

let numOfWordsTypedElement = document.querySelector(".num-words-typed");
let numOfCharsTypedElement = document.querySelector(".num-char-typed");
let testLengthElement = document.querySelector(".length-sec");
let timePerWordElement = document.querySelector(".time-per-word");
let numOfTyposElement = document.querySelector(".num-of-typos");
let resetBtn = document.querySelector(".replay-btn");
let showTextBtn = document.querySelector(".show-text-btn");

function menuRoll(){
    endMenuOverlay.style.display = "block";
    document.querySelectorAll(".test-finished-menu>p, .test-finished-menu .menu-btns").forEach(e => e.style.display = "none");
    endMenuElement.classList.add("retract");
}

function retractExtend(event){
    if(endMenuElement.classList.contains("retract")){
        document.querySelectorAll(".test-finished-menu>p, .test-finished-menu .menu-btns").forEach(e => e.style.display = "block");
        endMenuOverlay = "none";
        endMenuElement.classList.remove("retract");
    }
}

function next(event){
    
    if(event.target == instructionsBtn){
        menuHolder.style.display = "none";
        instructionsElement.style.display = "flex";
    }
    else if(event.target == startBtn){
        instructionsElement.style.display = "none";
        textHolderELement.style.display = "flex";
        isReadyToType(1);
    }
    else if(event.target == plusElement && endMenuElement.classList.contains("retract")){
        document.querySelectorAll(".test-finished-menu>p").forEach(e => e.style.display = "block");
        document.querySelector(".menu-btns").style.display = "flex";
        endMenuOverlay.style.display = "none";
        overlayElement.style.display = "block"
        endMenuElement.classList.remove("retract");
    }
    else if(event.target == showTextBtn){
        overlayElement.style.display = "none";
        textHolderELement.style.display = "flex";
        menuRoll();
    }
}

instructionsBtn.addEventListener("click", next);
startBtn.addEventListener("click", next);
showTextBtn.addEventListener("click", next)
endMenuElement.addEventListener("click", next);
resetBtn.addEventListener("click", resetValues);