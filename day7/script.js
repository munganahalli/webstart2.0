const questions = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Rome"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars"
  },
  {
    question: "What is the largest mammal?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    correct: "Blue Whale"
  }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${answer}"> ${answer}
    `;
    answersEl.appendChild(label);
  });

  feedbackEl.textContent = "";
}

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    feedbackEl.textContent = "Please select an answer.";
    return;
  }

  const userAnswer = selected.value;
  const correctAnswer = questions[currentQuestion].correct;

  if (userAnswer === correctAnswer) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Wrong! The correct answer is: ${correctAnswer}`;
    feedbackEl.style.color = "red";
  }

  // Move to the next question after 1.5 seconds
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showFinalMessage();
    }
  }, 1500);
});

function showFinalMessage() {
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = "";
  feedbackEl.textContent = "Thanks for playing!";
  submitBtn.style.display = "none";
}

loadQuestion(); // Load first question
