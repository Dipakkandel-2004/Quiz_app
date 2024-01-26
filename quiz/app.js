const questions = [
    {
        question: `How do you write "hello world " in alert box?`,
        answer: [
            { text: `alert("Hello world");`, correct: true },
            { text: `msg("Hello world");`, correct: false },
            { text: `msgbox("Hello world");`, correct: false },
            { text: `alertbox("Hello world");`, correct: false },
        ]
    },
    {
        question: "How to write an IF statement in javascipt?",
        answer: [
            { text: `if i=5 then`, correct: false },
            { text: `if i=5`, correct: false },
            { text: `if(i==5)`, correct: true },
            { text: `if i==5`, correct: false },
        ]
    },
    {
        question: "How do you find the number with the higest value of X and Y?",
        answer: [
            { text: `Math.ceil(x,y)`, correct: false },
            { text: `Math.max(x,y)`, correct: true },
            { text: `Ceil(x,y)`, correct: false },
            { text: `Top(x,y)`, correct: false },
        ]
    },
    {
        question: "which event occurs when the user clicks on an HTML element?",
        answer: [
            { text: "onchange", correct: false },
            { text: "onmouseover", correct: false },
            { text: "onmouseclick", correct: false },
            { text: "onclick", correct: true },
        ]
    },
    {
        question: "which operator is used to assign a value to a veriable?",
        answer: [
            { text: "=", correct: true },
            { text: ">", correct: false },
            { text: "<", correct: false },
            { text: "-", correct: false },
        ]
    },
]
const mainquestion = document.querySelector("#question");
const buttonanswer = document.querySelector("#button-answer");
const next = document.querySelector("#nextbtn");

let score = 0;
let currentquestionindex = 0;
function startquiz() {
    score = 0;
    currentquestionindex = 0;
    next.innerHTML = "Next";
    showanswer();
}
function showanswer() {
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionnumber = currentquestionindex + 1;
    mainquestion.innerHTML = questionnumber + "." + currentquestion.question;
    currentquestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text
        button.classList.add("btn");
        buttonanswer.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectanswer)
    });
}
function resetstate() {
    next.style.display = "none"
    while (buttonanswer.firstChild) {
        buttonanswer.removeChild(buttonanswer.firstChild);
    }

}
function selectanswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++


    }
    else {
        selectedbtn.classList.add("incorrect");


    }
    Array.from(buttonanswer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    next.style.display = "block";

}
function handlenextbtn() {
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
        console.log(currentquestionindex)
        showanswer()
    }
    else {
        showscore();
    }
}
function showscore() {
    resetstate();
    mainquestion.innerHTML = `you scored ${score} out of ${questions.length}`
    next.innerHTML = "play again"
    next.style.display = "block"
}
next.addEventListener("click", () => {
    if (currentquestionindex < questions.length) {
        handlenextbtn();
    }
    else {
        startquiz();
    }
})
startquiz();