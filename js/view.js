// Alle notwendigen Bereiche einlesen und zuweisen
let gameScreen = document.getElementById("gameScreen");
let startScreen = document.getElementById("startScreen");
let gameInfo = document.getElementById("gameInfo");
let gameResult = document.getElementById("gameResult");
let highscoreScreen = document.getElementById("highscoreScreen");
let currentState = document.getElementById("status");
let anzahlMaximalerRunden = document.getElementById("anzahlMaxRunden");
let rundennummer = document.getElementById("currentRoundNumber");
// Countdown auf der Spielt-Start-Lade-Seite
let startButton = document.getElementById('start-button');
let overlay = document.getElementById('overlay');
let countdown = document.getElementById('countdownElement');
let main = document.getElementById("main"); // Hauptinhalt
// Start Timer
let interval;
// Liste der Board-Komponenten
const gridItems = document.querySelectorAll('.grid-item');

// zusätzliche Variabeln
let playerPosition = 0;
let currentRoundNr = 1;
let currentPostionOfRound = 1;
let onlyHumans = false;
// wenn true, ist die APp im Show-Modus und der User schaut nur zu
let showMode = false;
let countdownToStart = 4;
let currentCountdownNumber = 0;
// aktueller Spieler
let currentPlayer = 1;


let soundPlaylist = []; // Gesamte Playlist
let currentRoundPlaylist = []; // Playlist für die aktuelle Runde
// Default Liste zum Anzeigen des Highscores 
const highscoreData = [
    { rank: 1, name: 'User 1', points: 1000 },
    { rank: 2, name: 'User 2', points: 900 },
    { rank: 3, name: 'User 3', points: 800 },
    { rank: 4, name: 'User 4', points: 700 },
    { rank: 5, name: 'User 5', points: 600 },
    { rank: 6, name: 'User 6', points: 500 },
    { rank: 7, name: 'User 7', points: 400 },
    { rank: 8, name: 'User 8', points: 300 },
    { rank: 9, name: 'User 9', points: 200 },
    { rank: 10, name: 'User 10', points: 100 },
    { rank: 11, name: 'User 9', points: 200 },
    { rank: 12, name: 'User 10', points: 100 }
    // Add more users here...
];
// Liste der verfügbaren Farben für das Soundboard
const availableColorList = ["red", "blue", "yellow", "black", "grey", "white"];
// Soundbord audio/sound und verfügbare Sounds, MIN 4 notwendig
let audio;
let sounds = [new Audio('/sounds/butterbirne.mp3'), new Audio('/sounds/alarm.mp3'), new Audio('/sounds/sprachfehler.mp3'), new Audio('/sounds/watwerbistdudenn.mp3')];

// lies die Checkbox aus für Veränderungen
const checkbox = document.getElementById('checkbox_two_players');
checkbox.addEventListener('change', handleTwoPlayersCheckbox);

// Methode, die aufgerufen wird, sofern der Startbutton getätigt wird
function startGame() {
    console.log('Das Spiel hat begonnen!');
    // starte bei Runde 1 beim ersten Start
    setCurrentRoundNr(1);
    console.log('Runden gesetzt');
    // 2 Spieler Modus ohne CPU auslesen
    onlyHumans = getTwoPlayersState();
    // generiere für das Spiel eine zufällige Playlist
    generatePlaylists(anzahlMaximalerRunden);
    // show game and hide start screen
    giveGridsColors();

    // display Game and make Startscreen unvisible
    // switchToGameScreen();
    // starte Spiel je nach Optionen mit oder ohne Computer
    if (onlyHumans) {
        console.log('showStartingDisplay gestartet for humans!');
        showStartingDisplay();


        start2Game();
        // anzeigen
        console.log("Das Spiel wurde gestartet");

    } else {
        console.log('showStartingDisplay gestartet for general!');


    };

}

function start2Game() {
    console.log('start2Game aufegrufen!');
    // Hier dein Spielstart-Code hinzufügen
    startCountdownFor2Player(countdownToStart);
}


function showStartingDisplay() {
    console.log('showStartingDisplay: overlay ANZEIGEN!');
    // start ShowClickPath
    document.getElementById("overlay").style.display = "block";
    main.style.display = "none";
    document.getElementById('cancelbutton').addEventListener('click', stopCountdown);
}

function startCountdownFor2Player(duration) {
    let timer = duration, minutes, seconds;



    countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("countdownElement").textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            // hier können Sie Code hinzufügen, der ausgeführt wird, wenn der Countdown abgelaufen ist
            // Overlay mit Countdown ausblenden
            document.getElementById("overlay").style.display = "none";
            // hier können Sie Code hinzufügen, der ausgeführt wird, wenn der Countdown abgelaufen ist

            startHumanGame();
        }
    }, 1000);

}

function stopCountdown() {
    clearInterval(countdown);
    // hier können Sie Code hinzufügen, der ausgeführt wird, wenn der Countdown abgelaufen ist
    document.getElementById("overlay").style.display = "none";
    main.style.display = "block";
}



function startHumanGame(currentRoundNr) {
    console.log("startHumanGame was started");
    switchToGameScreen();    
}

function handleTwoPlayersCheckbox() {
    isTwoPlayers = getTwoPlayersState();
    if (isTwoPlayers) {
        onlyHumans = true;
    } else {
        onlyHumans = false;
    }
}

// Funktion zum Auslesen der Startoptionen
function getTwoPlayersState() {
    console.log("getTwoPlayersState aufgerufen");
    let checkbox = document.getElementById('checkbox_two_players');
    console.log('checkbox für 2 spieler ist gesetzt auf ' + checkbox.checked);
    return checkbox.checked;
}

function switchToGameScreen() {
    main.style.display = "block";
    gameResult.innerHTML = "";
    gameScreen.style.display = "block";
    startScreen.style.display = "none";
    highscoreScreen.style.display = "none";
    gameEndResult.style.display = "none";
    console.log('Items colored');
}


function giveGridsColors() {

    console.log('giveGridsColors gestartet!');

    gridItems.forEach(function (item) {
        // gib jedem Panel/Grid eine Farbe aus dem Array
        item.style.background = generateRandomColor();
    });
}

// Generiere die Playlist für max. Rundenanzahl
function generatePlaylists(anzahlMaximalerRunden) {
    // generiere zu erst eine Playlist
    let randomPermutation = generateRandomPermutation(anzahlMaximalerRunden.value);
    soundPlaylist = randomPermutation.slice();
}

function startround() {
    // wenn der ShowModus nicht aktiviert ist, aktiviere ihn
    if (!showMode) {
        activateShowMode(true);
    }

    startShowRound(currentRoundNr);


    document.getElementById("currentRoundNumber").innerHTML = currentRoundNr;
}
let clickIndex = 0;

function generateCurrentRoundPlaylist(currentRoundNr) {
    for (let index = 0; index < currentRoundNr; index++) {
        currentRoundPlaylist[index] = soundPlaylist[index];
    }

}

function showClick(element) {
    // Füge den "green"-Stilklassennamen hinzu, um das Element grün zu färben
    element.classList.add("green");

    // Entferne den "green"-Stilklassennamen nach 2 Sekunden, um die grüne Färbung zu beenden
    setTimeout(function () {
        element.classList.remove("green");
    }, 2000);
}

function startShowRound(currentRoundNr) {
    generateCurrentRoundPlaylist(currentRoundNr);

    currentRoundPlaylist.forEach(element => {
        console.log(element);
        gridItems[element].classList.add('disable-graident');
        gridItems[element].addEventListener('click', function () {
            showClick(this);
        })
    });
}

function userReplayklicks(currentRoundNr) {
    gridItems = document.querySelectorAll('.grid-item');
    let i = 0;
    gridItems.forEach(function (item) {
        item.classList.add('disable-graident');
        item.addEventListener('click', function () {
            check(i);
        });
        i++;
    });
};

function activateShowMode(activated) {
    showMode = activated;
    let bitteWarten = "BITTE AUF COMPUTER WARTEN! ";
    let weiterMachen = "Du bist dran! "

    if (showMode) {
        currentState.innerHTML = "<span class='blink'>" + bitteWarten + "</span>";
    } else {
        currentState.innerHTML = "<span>" + weiterMachen + "</span>";
    }
}

function doAclick(indexOfCurrentGrid, currentPostionOfRound) {
    gridItems[indexOfCurrentGrid].classList.add('disable-graident');
    gridItems[indexOfCurrentGrid].addEventListener('click', function () {
        check(indexOfCurrentGrid, currentPostionOfRound);
    });
    if (currentPostionOfRound <= currentRoundNr) {
        gridItems[indexOfCurrentGrid].click();
    }

}

function check(indexOfCurrenClickedtGrid, currentPostionOfRound) {
    if (soundPlaylist[indexOfCurrenClickedtGrid] == soundPlaylist[currentPostionOfRound]) {
        flashCorrect(indexOfCurrenClickedtGrid);
    } else {
        flashWrong(indexOfCurrenClickedtGrid);
    }
}
function flashCorrect(indexOfCurrenClickedtGrid) {
    gridItems[indexOfCurrenClickedtGrid].classList.add('green-flash');
    setTimeout(() => {
        gridItems[indexOfCurrenClickedtGrid].classList.remove('green-flash');
    }, 1000);
}
function flashWrong(indexOfCurrenClickedtGrid) {
    gridItems[indexOfCurrenClickedtGrid].classList.add('red-flash');
    setTimeout(() => {
        gridItems[indexOfCurrenClickedtGrid].classList.remove('red-flash');
    }, 1000);

}

function setCurrentRoundNr(aktuelleRunde) {
    rundennummer.innerHTML = aktuelleRunde;
}


function endGame() {
    gameScreen.style.display = "none";
    startScreen.style.display = "none";
    highscoreScreen.style.display = "block";
    gameEndResult.style.display = "block";
    gameEndResult.innerHTML = "Glückwunsch, Sie haben gewonnem!";
}

function restartApp() {
    playerPosition = 0;
    document.getElementById("status").innerHTML = soundPlaylist;
    startGame();
}


let select = document.getElementById("anzahlMaxRunden");
for (var i = 2; i <= 100; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
}



function displayhighscore(startIndex = 0, endIndex = 10) {
    const highscoreDataTable = document.getElementById('highscoreData');
    highscoreDataTable.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        const user = highscoreData[i];
        if (!user) break;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.rank}</td>
            <td>${user.name}</td>
            <td>${user.points}</td>
        `;
        highscoreDataTable.appendChild(row);
    }
}

displayhighscore();

document.getElementById('showMore').addEventListener('click', () => {
    displayhighscore(highscoreData.length - 10, highscoreData.length);
});

// Zufällige Permutation der Zahlen von 0 bis 5 erstellen
function generateRandomPermutation(maxRoundCount) {
    let permutation = [];
    for (let i = 0; i < maxRoundCount; i++) {
        permutation.push(i);
    }
    for (let i = 0; i < maxRoundCount; i++) {
        let randomIndex = generateRandomNumber(4); // Zufällige Zahl zwischen 0 und 3
        permutation[i] = randomIndex;
    }
    return permutation;
}

function generateRandomNumber(n) {
    return Math.floor(Math.random() * n);
}



// Farben generieren
function generateRandomColor() {
    let colora = availableColorList[Math.floor(Math.random() * availableColorList.length)];
    let index = availableColorList.indexOf(colora);
    availableColorList.splice(index, 1);
    return colora;
}

function playSound(item) {

    item.classList.add('green-flash');
    setTimeout(() => {
        item.classList.remove('green-flash');
    }, 1000);

    if (item == gridItems[0]) { item = sounds[0]; }
    else if (item == gridItems[1]) { item = sounds[1]; }
    else if (item == gridItems[2]) { item = sounds[2]; }
    else if (item == gridItems[3]) { item = sounds[3]; }

    if (item != null) item.play();

}

function audioPlayed() {
    return;
}

function blinkText() {
    text = "BITTE WARTEN AUF COMPUTER! ";
    if (showRound) {
        document.getElementById("blinker").innerHTML = "<span class='blink'>" + text + "</span>";
    } else {
        document.getElementById("blinker").innerHTML = "<span>" + text + "</span>";
        let element = document.getElementById("hut");

        if (element) {
            animateScrollToElement(element);
        }
    }
    showRound = !showRound; // toggle the value of blink
}
