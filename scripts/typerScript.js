const textElement = document.querySelectorAll(".text-to-type");
let textHolderELement = document.querySelector(".text-holder");
let overlayElement = document.querySelector(".overlay");
let endMenuElement = document.querySelector(".test-finished-menu");
let randomParagraphIndex = getRandomParagraphIndex(0, textElement.length - 1);
let textToType = textElement[randomParagraphIndex].textContent;
let words = textToType.split(" ");
let wordHolders = [];
let backgroundTextElements = [];
let inputTextElements = [];
let wordIndex = 0;
let charIndex = 0;
let testIsRunning = 0;
let startTime, endTime, lengthOfTest, timePerChar, lastPressTime, newPressTime;
let numberOfTypedWords = 0;
let numberOfTypedCharacters = 0;
let numberOfButtonPresses = 0;
let mistakeFreeze = false;
let mistakeCount = 0;


for(let i = 0; i < words.length; i++){
    words[i] = words[i].toString().replace("\n", "");
}
words = words.filter(e => e);


for(let i = 0; i < words.length; i++){
    let wordHolder = document.createElement("div");
    wordHolder.classList.add("word-holder");
    textHolderELement.appendChild(wordHolder);
    wordHolders.push(wordHolder);

    let backgroundText = document.createElement("p");
    backgroundText.classList.add("background-text");
    backgroundText.textContent = words[i];
    wordHolder.appendChild(backgroundText);
    backgroundTextElements.push(backgroundText);

    let inputTextElement = document.createElement("p");
    inputTextElement.classList.add("input-text");
    wordHolder.appendChild(inputTextElement);
    inputTextElements.push(inputTextElement);
}

function resetValues(){
    randomParagraphIndex = getRandomParagraphIndex(0, textElement.length - 1);
    textToType = textElement[randomParagraphIndex].textContent;
    words = textToType.split(" ");
    wordHolders = [];
    for(let i = 0; i < words.length; i++){
        words[i] = words[i].toString().replace("\n", "");
    }
    words = words.filter(e => e);
    backgroundTextElements = [];
    inputTextElements = [];
    wordIndex = 0;
    charIndex = 0;
    testIsRunning = 0;
    startTime = 0, endTime = 0, lengthOfTest = 0, timePerChar = 0, lastPressTime = 0, newPressTime = 0;
    numberOfTypedWords = 0;
    numberOfTypedCharacters = 0;
    numberOfButtonPresses = 0;
    mistakeFreeze = false;
    mistakeCount = 0;

    textHolderELement.innerHTML = "";
    endMenuElement.style.display = "none";
    overlayElement.style.display = "none";
    textHolderELement.style.display = "flex";
    isReadyToType(true);

    for(let i = 0; i < words.length; i++){
        let wordHolder = document.createElement("div");
        wordHolder.classList.add("word-holder");
        textHolderELement.appendChild(wordHolder);
        wordHolders.push(wordHolder);
    
        let backgroundText = document.createElement("p");
        backgroundText.classList.add("background-text");
        backgroundText.textContent = words[i];
        wordHolder.appendChild(backgroundText);
        backgroundTextElements.push(backgroundText);
    
        let inputTextElement = document.createElement("p");
        inputTextElement.classList.add("input-text");
        wordHolder.appendChild(inputTextElement);
        inputTextElements.push(inputTextElement);
    }
}

function getRandomParagraphIndex(min, max){
    min = Math.ceil(min);
    max  = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isReadyToType(isReady){
    document.addEventListener("keydown", checkInput);
    return testIsRunning = isReady;
}

function checkInput(event){
    if(testIsRunning){
        event.preventDefault();
    
        if(event.key != "Shift"){
            numberOfButtonPresses++;
        }

        if(numberOfButtonPresses == 1){
            startTime = new Date();
            newPressTime = new Date();
        }else if(numberOfButtonPresses > 1){
            lastPressTime = newPressTime;
            newPressTime = new Date();
            timePerChar = (newPressTime - lastPressTime) / 1000;
            console.log(event.key + ": " + timePerChar + " seconds");
        }
    
        if(event.key == backgroundTextElements[wordIndex].textContent[charIndex]){ 
            inputTextElements[wordIndex].innerHTML += event.key;
            if(charIndex < backgroundTextElements[wordIndex].textContent.length){
                charIndex++;
                numberOfTypedCharacters++;
                mistakeFreeze = false;
            }
        }
        else if(event.key != "Shift" && mistakeFreeze == false){
            if(backgroundTextElements[wordIndex].textContent[charIndex]){
                inputTextElements[wordIndex].innerHTML += ( "<span class='mistake'>" + backgroundTextElements[wordIndex].textContent[charIndex] + "</span>");
                mistakeFreeze = true;
                mistakeCount++;
                console.log(mistakeCount);
                console.log(backgroundTextElements[wordIndex].textContent[charIndex]);
            }
            
            if(charIndex < backgroundTextElements[wordIndex].textContent.length){
                charIndex++;
                numberOfTypedCharacters++;
            }
        }
    
        if(event.key == " " && backgroundTextElements[wordIndex].textContent.length == inputTextElements[wordIndex].textContent.length){
            wordIndex++;
            charIndex = 0;
            numberOfTypedCharacters++;
            mistakeFreeze = false;
        }
    
        if(wordIndex + 1 == words.length && backgroundTextElements[wordIndex].textContent.length == charIndex){
            endTime = new Date();
            lengthOfTest = (endTime - startTime) / 1000;
            numberOfTypedWords = wordIndex + 1;
            isReadyToType(0);
            textHolderELement.style.display = "none";
            // document.removeEventListener("keydown", checkInput);

            overlayElement.style.display = "block";
            endMenuElement.style.display = "flex";
            numOfWordsTypedElement.innerHTML = "Words typed: <br>" + numberOfTypedWords;
            numOfCharsTypedElement.innerHTML = "Number of typed characters: <br>" + numberOfTypedCharacters;
            testLengthElement.innerHTML = "Test length: <br>" + lengthOfTest.toFixed(2) + " s";
            timePerWordElement.innerHTML = "Average time per word: <br>" + (lengthOfTest / numberOfTypedWords).toFixed(2) + " s";
            numOfTyposElement.innerHTML = "Typo count: <br>" + mistakeCount;
            return;
        }
    }
}