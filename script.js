const quizData = [
  {
    question: "What is the SI unit of electric charge?",
    options: ["Ampere", "Coulomb", "Ohm", "Volt"],
    correct: 1
  },
  {
    question: "The resistance of a conductor depends on:",
    options: ["Length", "Area of cross-section", "Material", "All of the above"],
    correct: 3
  },
  {
    question: "Which law relates electric flux to enclosed charge?",
    options: ["Ampere’s Law", "Ohm’s Law", "Gauss’s Law", "Faraday’s Law"],
    correct: 2
  },
  {
    question: "Which mirror is used in car rear-view mirrors?",
    options: ["Plane mirror", "Concave mirror", "Convex mirror", "None"],
    correct: 2
  },
  {
    question: "Which lens corrects myopia (short-sightedness)?",
    options: ["Convex lens", "Concave lens", "Biconvex lens", "Cylindrical lens"],
    correct: 1
  },
  {
    question: "The unit of magnetic field (B) is:",
    options: ["Tesla", "Weber", "Henry", "Coulomb"],
    correct: 0
  },
  {
    question: "Which quantity remains constant in a series circuit?",
    options: ["Voltage", "Current", "Resistance", "Power"],
    correct: 1
  },
  {
    question: "Faraday’s laws are related to:",
    options: ["Magnetic field", "Induced EMF", "Resistance", "Capacitance"],
    correct: 1
  },
  {
    question: "In photoelectric effect, number of electrons depends on:",
    options: ["Frequency of light", "Intensity of light", "Wavelength of light", "Work function"],
    correct: 1
  },
  {
    question: "Which of these is not an electromagnetic wave?",
    options: ["X-rays", "Sound waves", "Microwaves", "UV rays"],
    correct: 1
  }
];

const nav = document.getElementById("nav")
const hero = document.getElementById("hero");
const quizForm = document.getElementById("quiz-form");
const questionBox = document.getElementById("question-box");
const quiz = document.getElementById("quiz");
const resultDiv = document.getElementById("result");  
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const footer = document.getElementById("footer");
let currentQuestion = 0;
let userAnswers = [];

startBtn.addEventListener("click", () => {
  hero.style.display = "none";
  nav.style.display = "none";
  footer.style.display = "none";
  quizForm.style.display = "block";
  quiz.style.display = "block";
  currentQuestion = 0;
  userAnswers = [];
  loadQuestion();
});

function loadQuestion() {
  const q = quizData[currentQuestion];

  userAnswers[currentQuestion] = null;

  let optionsHtml = "";
  for (let i = 0; i < q.options.length; i++) {
    optionsHtml += `<div class="option"><label ><input type="radio" name="option" value="${i}"> ${q.options[i]}</label></div>`;
  }

  questionBox.innerHTML = `
    <div class="question">
      <p><strong>Q${currentQuestion + 1}:</strong> ${q.question}</p>
    </div>
    <div class="options">
      ${optionsHtml}
    </div>
  `;

if (currentQuestion === quizData.length - 1) {
  nextBtn.style.display = "none";
  submitBtn.style.display = "inline-block";
} else {
  nextBtn.style.display = "inline-block";
  submitBtn.style.display = "none";
}
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = parseInt(selected.value);
  } else {
    userAnswers[currentQuestion] = null;
  }

  currentQuestion++;
  loadQuestion(); // Load next question
});

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = parseInt(selected.value);
  } else {
    userAnswers[currentQuestion] = null;
  }

  showResult();
});

function showResult() {
  quizForm.style.display = "none";
  resultDiv.style.display = "block";
  let correct = 0;
  let incorrect = 0;

  quizData.forEach((q, i) => {
    const answer = userAnswers[i];
    if (answer === q.correct) {
      correct++;
    } else if (answer !== null) {
      incorrect++;
    }
  });

  resultDiv.innerHTML = `
    <h2>Result Summary</h2>
    <p>Total Questions: ${quizData.length}</p>
    <p>Correct: ${correct}</p>
    <p>Incorrect: ${incorrect}</p>
    <p><strong>Score: ${correct * 4 - incorrect}</strong></p>
  `;
  resultDiv.innerHTML += `<button id="restart-btn">Restart Quiz</button>`;

 document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    userAnswers = [];
    resultDiv.style.display = "none";
    hero.style.display = "block";
    nav.style.display = "flex";
    quizForm.style.display = "none";
    quiz.style.display = "none";
    footer.style.display = "block";
    nextBtn.innerText = "Next Question"; // Reset button text
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  });
}
