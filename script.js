// SECRET CODE

let secretCode = "2608";

function showPage(pageId) {
    const pages = document.querySelectorAll(".container section");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");
}

function startGame() {
    showPage("codePage");
}

function checkCode() {
    let input = document.getElementById("secretInput").value;

    if (input === secretCode) {
        showPage("surprisePage");
        document.getElementById("message").textContent = "";
    } else {
        document.getElementById("message").textContent =
            "Yahhh, kok salah sih? Coba lagi! ";
    }
}

function showNextPage() {
    showPage("quizPage");
}

function sayNo() {
    document.getElementById("noButton").classList.add("hidden");
    document.getElementById("angryMessage").classList.remove("hidden");
}


// DO YOU KNOW ME

let quizChosen = false;

function chooseAnswer(answer) {
    if (quizChosen) return;

    quizChosen = true;

    document.getElementById("quizResult").textContent =
        "HAHAHAHA ACTUALLY LEBIH SUKA KAMU SIH KAK! 💗";

    setTimeout(function() {
        document.getElementById("prankText").classList.remove("hidden");
        document.getElementById("continueButton").classList.remove("hidden");
    }, 2000);
}

function goToNextGame() {
    showPage("choosePage");
    displayRound();
}


// CHOOSE ONE

const chooseQuestions = [
    {
        question: "What's ur ideal date?",
        options: ["🎬 Movie Date", "🚶 Jalan-jalan"],
        comments: [
            "OHHH, movie date nih ceritanya? 👀",
            "Mau jalan kemana kita? WKWKWK"
        ]
    },
    {
        question: "What movie do u prefer?",
        options: ["👻 Horror", "💗 Romance"],
        comments: [
            "Sok bgtt, padahal lu penakut...",
            "Dih? romance? sejak kapan jir"
        ]
    },
    {
        question: "Movie night at...",
        options: ["🍿 Cinema", "🏠 Home"],
        comments: [
            "Bioskop? when yh",
            "netflix aja netflix"
        ]
    },
    {
        question: "Pick ur favorite snack!",
        options: ["🍿 Popcorn", "🍟 French Fries"],
        comments: [
            "Classic choice! 🍿",
            "Kentang lovers ye lu"
        ]
    }
];

let currentRound = 0;

function displayRound() {
    let question = chooseQuestions[currentRound];

    document.getElementById("roundNumber").textContent =
        "Round " + (currentRound + 1) + " of 4";

    document.getElementById("chooseQuestion").textContent =
        question.question;

    document.getElementById("chooseResult").textContent = "";
    document.getElementById("chooseComment").textContent = "";

    document.getElementById("nextRoundButton").classList.add("hidden");

    let optionsArea = document.getElementById("chooseOptions");
    optionsArea.innerHTML = "";

    question.options.forEach(function(option, index) {
        let button = document.createElement("button");

        button.textContent = option;
        button.classList.add("choice-button");

        button.onclick = function() {
            selectChoice(index);
        };

        optionsArea.appendChild(button);
    });
}

function selectChoice(index) {
    let question = chooseQuestions[currentRound];

    document.getElementById("chooseResult").textContent =
        "Your choice: " + question.options[index];

    document.getElementById("chooseComment").textContent =
        question.comments[index];

    let buttons = document.querySelectorAll("#chooseOptions button");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    document.getElementById("nextRoundButton").classList.remove("hidden");
}

function nextRound() {
    currentRound++;

    if (currentRound < chooseQuestions.length) {
        displayRound();
    } else {
        currentRound = 0;
        showPage("spinPage");
    }
}


// SPIN THE QUESTION

const questions = [
    "First impression kamu tentang aku?",
    "Menurut kamu, aku orangnya kayak gimana?",
    "Siapa yang lebih banyak ngomong?",
    "Apa momen paling memorable bareng aku?",
    "Kalau bisa pergi ke mana aja bareng aku, mau ke mana?",
    "Satu kata buat menggambarkan aku?",
    "Hal paling random yang pernah kita lakuin?",
    "Kalau aku tiba-tiba ngajak jalan, mau nggak?"
];

let availableQuestions = [...questions];
let isSpinning = false;
let currentQuestion = "";

function spinWheel() {
    if (isSpinning) return;

    // Kalau semua pertanyaan sudah keluar, acak ulang
    if (availableQuestions.length === 0) {
        availableQuestions = [...questions];
    }

    isSpinning = true;

    let wheel = document.getElementById("questionWheel");

    document.getElementById("spinButton").classList.add("hidden");
    document.getElementById("questionArea").classList.add("hidden");
    document.getElementById("spinChoices").classList.add("hidden");
    document.getElementById("spinMessage").textContent = "";

    wheel.classList.remove("spin-animation");

    let randomIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[randomIndex];

    availableQuestions.splice(randomIndex, 1);

    void wheel.offsetWidth;
    wheel.classList.add("spin-animation");

    setTimeout(function() {
        document.getElementById("selectedQuestion").textContent =
            currentQuestion;

        document.getElementById("questionAnswer").value = "";

        document.getElementById("questionArea").classList.remove("hidden");

        isSpinning = false;
    }, 3000);
}

function submitAnswer() {
    let answer = document.getElementById("questionAnswer").value.trim();

    if (answer === "") {
        document.getElementById("spinMessage").textContent =
            "Jawab dulu donggg yank";
        return;
    }

    document.getElementById("questionArea").classList.add("hidden");

    document.getElementById("spinChoices").classList.remove("hidden");

    document.getElementById("spinMessage").textContent =
        "Jawaban kamu sudah diterima! 💗";
}

function spinAgain() {
    document.getElementById("spinChoices").classList.add("hidden");
    document.getElementById("spinButton").classList.remove("hidden");

    spinWheel();
}

function goToFinalPage() {
    showPage("finalPage");
}


// FINAL SURPRISE

function openGift() {
    document.getElementById("giftBox").classList.add("hidden");
    document.getElementById("giftHint").classList.add("hidden");
    document.getElementById("giftContent").classList.remove("hidden");

    let music = document.getElementById("backgroundMusic");

    music.currentTime = 142;

    music.play().catch(function() {
        document.getElementById("giftContent").insertAdjacentHTML(
            "beforeend",
            "<p>Tekan tombol play pada musik jika belum terdengar. 🎵</p>"
        );
    });
}