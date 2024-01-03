const usns = [
    "2023LCS004","2023LCS006","2023LCS007","2023LCS008","2023LCS019","2023LCS020","4NI22CS062", "4NI22CS063", "4NI22CS064", "4NI22CS065","4NI22CS067", "4NI22CS068", "4NI22CS069", "4NI22CS070", 
    "4NI22CS071","4NI22CS072", "4NI22CS073", "4NI22CS074",  "4NI22CS076", "4NI22CS077", "4NI22CS078", "4NI22CS079", 
    "4NI22CS080", "4NI22CS081", "4NI22CS082", "4NI22CS083", "4NI22CS084", "4NI22CS085", "4NI22CS086", "4NI22CS087", 
    "4NI22CS088", "4NI22CS089", "4NI22CS090", "4NI22CS091","4NI22CS092", "4NI22CS093", "4NI22CS094", "4NI22CS095", 
    "4NI22CS096", "4NI22CS097", "4NI22CS098", "4NI22CS099", "4NI22CS100", "4NI22CS101", "4NI22CS102", "4NI22CS103", 
    "4NI22CS104", "4NI22CS105", "4NI22CS106", "4NI22CS107", "4NI22CS108", "4NI22CS109", "4NI22CS111", 
    "4NI22CS112","4NI22CS113", "4NI22CS114", "4NI22CS115", "4NI22CS116", "4NI22CS117", "4NI22CS118", "4NI22CS119", 
    "4NI22CS120", "4NI22CS121", "4NI22CS123", "4NI22CS124", "4NI22CS125","4NI22CS136","4NI22CS137", "4NI22CS139"
];

const typingText = document.getElementById('typing-text');
const welcomeHeader = document.getElementById('welcome-header');
const numStudentsLabel = document.getElementById('numStudentsLabel');

const welcomeText = "Here we go again";

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        typingText.innerHTML += text.charAt(i);
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback);
        }, 100);
    } else if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 1000);
    }
}

function startTextAnimation() {
    typeWriter(welcomeText, 0, function () {
        typingText.innerHTML = '';
    });
}

document.addEventListener('DOMContentLoaded', startTextAnimation);

function generateRandomUSNs() {
    const numStudents = parseInt(document.getElementById("numStudents").value, 10);
    const resultDiv = document.getElementById("result");

    if (isNaN(numStudents) || numStudents <= 0 || numStudents > usns.length) {
        alert("Please enter a valid number of students.");
        return;
    }
    resultDiv.innerHTML = "";

    const shuffledUSNs = usns.sort(() => Math.random() - 0.5);
    const selectedUSNs = shuffledUSNs.slice(0, numStudents);

    const card = document.createElement('div');
    card.classList.add('card');

    const usnList = document.createElement('ul');
    usnList.classList.add('usn-list');

    selectedUSNs.forEach(usn => {
        const listItem = document.createElement('li');
        const randomQuestion = Math.random() < 0.5 ? '3' : '4'; 
        listItem.textContent = `${usn}(${randomQuestion})`;
        usnList.appendChild(listItem);
    });

    card.appendChild(usnList);
    resultDiv.appendChild(card);
}


function startCountdown() {
    const numStudentsInput = document.getElementById("numStudents");
    const numStudents = parseInt(numStudentsInput.value, 10);

    if (isNaN(numStudents) || numStudents <= 0 || numStudents > usns.length) {
        alert("Please enter a valid number of students.");
        return;
    }
    const countdownDiv = document.getElementById("countdown");
    const generateButton = document.querySelector(".button");
    


    typingText.style.display = "none";
    numStudentsLabel.style.display = "none";
    welcomeHeader.style.display = "none";
    generateButton.style.display = "none";
    document.getElementById("numStudents").style.display = "none";


 
    document.getElementById("result").innerHTML = "";

    countdownDiv.style.display = "block"; 
    countdownDiv.innerHTML = '<div class="base-timer" id="app">' +
        '<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<g class="base-timer__circle">' +
        '<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>' +
        '<path id="base-timer-path-remaining" stroke-dasharray="283" ' +
        'class="base-timer__path-remaining" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>' +
        '</g>' +
        '</svg>' +
        '<span id="base-timer-label" class="base-timer__label"></span>' +
        '</div>';

    const remainingPath = document.getElementById("base-timer-path-remaining");
    remainingPath.style.stroke = 'rgb(65, 184, 131)';

    let seconds = 3;
    const countdownInterval = setInterval(function() {
        const timerLabel = document.getElementById("base-timer-label");

        const circumference = 283; 
        const progressPerSecond = circumference / 4;

        const strokeDashArrayValue = Math.max(0, (progressPerSecond * seconds));
        remainingPath.setAttribute("stroke-dasharray", `${strokeDashArrayValue} ${circumference}`);

        timerLabel.textContent = seconds >= 0 ? seconds : "0";
        seconds--;

        if (seconds < -1) {
            clearInterval(countdownInterval);
            countdownDiv.style.display = "none"; 
            generateRandomUSNs(); 
            generateButton.style.display = "block"; 
          
            typingText.style.display = "block";
            numStudentsLabel.style.display = "block";
            welcomeHeader.style.display = "block";
            document.getElementById("numStudents").style.display = "block";
        }
    }, 1000);
}
