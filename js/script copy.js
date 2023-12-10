let gridClickSequence = [];
let reihenfolge = [0, 1, 0, 3, 2, 2, 0];

/* BUTTON AUF DER STARTSEITE STARTEB */
function showGameScreen() {
    // Spielscreen ausblenden
    document.querySelector('.gamescreen').style.display = 'block';

    document.querySelector('.rundennummer').style.display = 'block';

    // Startbildschirm anzeigen
    document.querySelector('.startscreen').style.display = 'none';
}



/* BUTTON AUF DER SPIELSEITE BEENDEN */
function showStartScreen() {
    // Spielscreen einblenden
    document.querySelector('.gamescreen').style.display = 'none';

    document.querySelector('.rundennummer').style.display = 'none';

    // Startbildschirm ausblenden
    document.querySelector('.startscreen').style.display = 'block';
}

const colorList = ["red", "blue", "yellow", "black", "grey", "white"];

// Farben generieren
function generateRandomColor() {
    let colora = colorList[Math.floor(Math.random() * colorList.length)];
    let index = colorList.indexOf(colora);
    colorList.splice(index, 1);
    return colora;

}

// Farben den Grid-Elementen zuweisen
let gridItems = document.querySelectorAll('.grid-item');
let i = 0;
gridItems.forEach(function (item) {
    item.style.background = generateRandomColor();

    // item.addEventListener('click', () => click(item));

    i++
});

/*
let click = (correctValue) => {
    let buttonValue = parseInt(event.target.textContent);
    if (buttonValue === correctValue) {
        alert('Correct!');
    } else {
        alert('Incorrect! The correct button was: ' + correctValue);
    }
}

*/
function playSound(item) {

    item.classList.add('green-flash');
    setTimeout(() => {
        item.classList.remove('green-flash');
    }, 1000);

    // console.log(item);



    let audio;

    if (item == gridItems[0]) {
        audio = new Audio('/sounds/butterbirne.mp3');

    }
    else if (item == gridItems[1]) {
        audio = new Audio('/sounds/alarm.mp3');
    }
    else if (item == gridItems[2]) {
        audio = new Audio('/sounds/sprachfehler.mp3');
    }
    else if (item == gridItems[3]) {
        audio = new Audio('/sounds/watwerbistdudenn.mp3');
    }

    if (audio != null) audio.play();
}

var countdown = 5;
var intervalId;

function startCountdown() {
    countdown--;
    document.getElementById('countdown').textContent = countdown;
    if (countdown <= 0) {
        clearInterval(intervalId);
        startGame();
    }
}

let userClickedOrder= [];

function showReihenfolge(roundNr) {
    /*   document.querySelector('header').style.display ='none';
   
       document.querySelector('footer').style.display ='none';
   
       document.querySelector('oben').style.display ='none';
   
       document.querySelector('unten').style.display ='none'; */


    let slicedFruits = arraySlice(reihenfolge, roundNr);
    console.log(slicedFruits);

    var gridItems = document.getElementsByClassName('grid-item');
    var clickIndex = 0;

    

    function clickNext() {
        gridItems[slicedFruits[clickIndex]].click();
        userClickedOrder.push(slicedFruits[clickIndex]);
        clickIndex++;
        if (clickIndex < roundNr) {
            setTimeout(clickNext, 2000); // wait 2 second before clicking the next item
        } else {
            userReplayklicks(roundNr);
        }
    }

    clickNext(); // start clicking
}

function userReplayklicks(roundNr) {
    let gridItems = document.querySelectorAll('.grid-item');
    let i = 0;
    gridItems.forEach(function (item) {
        item.classList.add('disable-graident');
        item.addEventListener('click', function () {
            check(0);
        });
    });
};

let currentClickedOrder = [];

function check(itemId) {
   
    currentClickedOrder.push(itemId);

    if (JSON.stringify(currentClickedOrder) === JSON.stringify(userClickedOrder)) {
       flashCorrect();
       currentClickedOrder = [];
    } else {
        flashCorrect();

    }

   }

   function flashCorrect() {
    let cells = document.querySelectorAll('.grid-item');
    for (let i = 0; i < cells.length; i++) {
       cells[i].classList.add('correct');
    }

    setTimeout(function () {
       for (let i = 0; i < cells.length; i++) {
         cells[i].classList.remove('correct');
       }
    }, 1000);
   }

function animateScrollToElement(element) {
    let rect = element.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    let top = rect.top + window.scrollY;

    let startTime = null;
    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        const elapsedTime = currentTime - startTime;
        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const progress = easeInOutQuad(Math.min(elapsedTime / 1000, 1));
        window.scrollTo(left * progress, top * progress);
        if (elapsedTime < 1000) {
            requestAnimationFrame(animation);
        }
    }
    requestAnimationFrame(animation);
}

function startGame() {
    let roundNr = 6;
    document.querySelector('.rundennummer').textContent = 'RUNDE: ' + roundNr;
    let element = document.getElementById("hut");

    if (element) {
        animateScrollToElement(element);
    }
    showReihenfolge(roundNr);

    startround(roundNr);
}


function startround(roundno) {

}

function nextRound() {
    var roundNr = parseInt(document.querySelector('.rundennummer').textContent);
    roundNr++;
    document.querySelector('.rundennummer').textContent = roundNr;
    showReihenfolge(roundNr);
}


function resetClickSequence() {
    gridClickSequence.length = 0;
}

// Funktion zum Überprüfen, ob das gamescreen angezeigt wird
function isGameScreenVisible() {
    return document.getElementById('gamescreen').style.display === 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    var myDiv = document.getElementById('gamescreen');

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Führe die gewünschte Funktion aus
                gameDisplayed();
                // Entferne den Beobachter, um zukünftige Überprüfungen zu verhindern
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(myDiv);
});

function gameDisplayed() {
    intervalId = setInterval(startCountdown, 1000);
    // document.getElementById('oben').style.display = 'none';
}

// Start the countdown as soon as the page loads
window.onload = function () {
    // if app loaded

};

function arraySlice(array, x) {
    let slicedArray = [];

    for (let i = 0; i < x; i++) {
        slicedArray.push(array[i]);
    }

    return slicedArray;
};

// gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    item.addEventListener('click', function () {
        this.classList.remove('disable-graident');
    });
});