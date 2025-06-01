const creepySentences = [
    "leave",
    "run 3210",
    "you are not alone",
    "you are not safe",
    "you can not hide",
    "listen to plume",
    "heaven is closed",
];

const codewordResponses = {
    plume: "13062025",
};

const letterPositions = {
    a: { top: "46%", left: "11%" },
    b: { top: "40%", left: "18%" },
    c: { top: "36%", left: "24%" },
    d: { top: "33%", left: "30%" },
    e: { top: "31%", left: "37%" },
    f: { top: "30%", left: "43%" },
    g: { top: "30%", left: "49%" },
    h: { top: "30%", left: "56%" },
    i: { top: "31%", left: "62%" },
    j: { top: "33%", left: "67%" },
    k: { top: "35%", left: "73%" },
    l: { top: "39%", left: "80%" },
    m: { top: "44%", left: "87%" },
    n: { top: "65%", left: "12%" },
    o: { top: "59%", left: "18%" },
    p: { top: "54%", left: "23%" },
    q: { top: "50%", left: "29%" },
    r: { top: "47%", left: "36%" },
    s: { top: "46%", left: "42%" },
    t: { top: "44%", left: "48%" },
    u: { top: "45%", left: "55%" },
    v: { top: "46%", left: "62%" },
    w: { top: "49%", left: "69%" },
    x: { top: "54%", left: "76%" },
    y: { top: "59%", left: "82%" },
    z: { top: "65%", left: "87%" },
    1: { top: "73%", left: "22%" },
    2: { top: "73%", left: "27%" },
    3: { top: "73%", left: "33%" },
    4: { top: "73%", left: "40%" },
    5: { top: "73%", left: "46%" },
    6: { top: "73%", left: "52%" },
    7: { top: "73%", left: "58%" },
    8: { top: "73%", left: "64%" },
    9: { top: "73%", left: "70%" },
    0: { top: "73%", left: "77%" }
};




let currentSentence = "";
let currentLetterIndex = 0;
let isSpelling = false;

const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const planchette = document.getElementById("planchette");
const shadow = document.getElementById("planchette-shadow");

askButton.addEventListener("click", askQuestion);

askButton.disabled = true;

questionInput.addEventListener("input", function () {
    if (questionInput.checkValidity()) {
        askButton.disabled = false;
    } else {
        askButton.disabled = true;
    }
});


function askQuestion() {
    if (isSpelling) return;

    isSpelling = true;
    askButton.disabled = true;

    const question = questionInput.value.trim().toLowerCase();

    // Codewort prüfen
    if (codewordResponses.hasOwnProperty(question)) {
        currentSentence = codewordResponses[question];
        currentLetterIndex = 0;
        spellNextLetter();
        return;
    }

    const chance = Math.random();

    if (chance < 0.1) {
        // 5 %: Creepy-Satz
        const index = Math.floor(Math.random() * creepySentences.length);
        currentSentence = creepySentences[index].toLowerCase();
        currentLetterIndex = 0;
        spellNextLetter();
    } else {
        // Ja oder Nein
        const answer = Math.random() < 0.5 ? "yes" : "no";
        movePlanchette(answer);

        // Nach 1 Sekunde zu "bye"
        setTimeout(() => movePlanchette("bye"), 1000);

        // Nach 3 Sekunden zu "idle", dann Button aktivieren
        setTimeout(() => {
            movePlanchette("idle");
            isSpelling = false;
            setTimeout(() => {
                askButton.disabled = false;
            }, 1000);
        }, 3000);
    }
}


function spellNextLetter() {
    if (currentLetterIndex >= currentSentence.length) {
        // Animation zu "bye", dann "idle"
        setTimeout(() => movePlanchette("bye"), 1000);
        setTimeout(() => {
            movePlanchette("idle");
            isSpelling = false;
            setTimeout(() => {
                askButton.disabled = false;
            }, 1500);
        }, 3000);
        return;
    }

    const char = currentSentence[currentLetterIndex];

    if (char === " ") {
        // Kurze Pause bei Leerzeichen
        currentLetterIndex++;
        setTimeout(spellNextLetter, 800);
    } else if (letterPositions[char]) {
        movePlanchetteToLetter(char);
        currentLetterIndex++;
        setTimeout(spellNextLetter, 1300);
    } else {
        // Ungültige Zeichen überspringen
        currentLetterIndex++;
        setTimeout(spellNextLetter, 400);
    }
}

function movePlanchetteToLetter(letter) {
    const pos = letterPositions[letter];
    if (pos) {
        planchette.style.transition = "all 1s ease";
        planchette.style.top = pos.top;
        planchette.style.left = pos.left;

        // Schatten leicht versetzt
        shadow.style.transition = "all 1s ease";
        shadow.style.top = `calc(${pos.top} + 5px)`;
        shadow.style.left = `calc(${pos.left} + 5px)`;
    }
}


function movePlanchette(target) {
    const positions = {
        yes: { top: "13%", left: "23%" },
        no: { top: "13%", left: "77%" },
        idle: { top: "60%", left: "50%" },
        bye: { top: "90%", left: "50%" }
    };

    const pos = positions[target];
    if (pos) {
        planchette.style.transition = "all 1s ease";
        planchette.style.top = pos.top;
        planchette.style.left = pos.left;

        shadow.style.transition = "all 1s ease";
        shadow.style.top = `calc(${pos.top} + 5px)`;
        shadow.style.left = `calc(${pos.left} + 5px)`;
    }
}

