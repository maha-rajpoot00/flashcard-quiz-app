let defaultFlashcards = [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style and design web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is used to make websites interactive."
    },
    {
        question: "What is Bootstrap?",
        answer: "Bootstrap is a free, open-source front-end development framework used to build responsive, mobile-first websites."
    }
];

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || defaultFlashcards;

let currentCard = 0;

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const cardNumber = document.getElementById("cardNumber");

const showAnswer = document.getElementById("showAnswer");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

const add = document.getElementById("add");
const edit = document.getElementById("edit");
const deleteButton = document.getElementById("delete");


function saveCards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}


function displayCard() {

    question.textContent = flashcards[currentCard].question;
    answer.textContent = flashcards[currentCard].answer;

    cardNumber.textContent = currentCard + 1;

    answer.style.display = "none";
    showAnswer.textContent = "Show Answer";
}


showAnswer.addEventListener("click", function () {

    if (answer.style.display === "none") {
        answer.style.display = "block";
        showAnswer.textContent = "Hide Answer";
    } else {
        answer.style.display = "none";
        showAnswer.textContent = "Show Answer";
    }

});


next.addEventListener("click", function () {

    if (currentCard < flashcards.length - 1) {
        currentCard++;
        displayCard();
    } else {
        alert("This is the last card.");
    }

});


previous.addEventListener("click", function () {

    if (currentCard > 0) {
        currentCard--;
        displayCard();
    } else {
        alert("This is the first card.");
    }

});


add.addEventListener("click", function () {

    let newQuestion = prompt("Enter your question:");

    if (!newQuestion) {
        return;
    }

    let newAnswer = prompt("Enter the answer:");

    if (!newAnswer) {
        return;
    }

    flashcards.push({
        question: newQuestion,
        answer: newAnswer
    });

    saveCards();

    currentCard = flashcards.length - 1;

    displayCard();

});


edit.addEventListener("click", function () {

    let newQuestion = prompt(
        "Edit question:",
        flashcards[currentCard].question
    );

    if (!newQuestion) {
        return;
    }

    let newAnswer = prompt(
        "Edit answer:",
        flashcards[currentCard].answer
    );

    if (!newAnswer) {
        return;
    }

    flashcards[currentCard].question = newQuestion;
    flashcards[currentCard].answer = newAnswer;

    saveCards();

    displayCard();

});


deleteButton.addEventListener("click", function () {

    if (flashcards.length === 1) {
        alert("You must keep at least one card.");
        return;
    }

    let confirmation = confirm(
        "Are you sure you want to delete this card?"
    );

    if (confirmation) {

        flashcards.splice(currentCard, 1);

        if (currentCard >= flashcards.length) {
            currentCard = flashcards.length - 1;
        }

        saveCards();

        displayCard();
    }

});


displayCard();