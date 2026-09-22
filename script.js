const POINTS_PER_QUESTION = 0.25;

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const leaderboardRef = db.collection("leaderboard");

let playerName = "";
let score = 0;
let remainingIndexes = [];
let canvas, ctx;
let currentRotation = 0;
let spinning = false;
let activeQuestionIndex = null;

const loginSection = document.getElementById("loginSection");
const gameSection = document.getElementById("gameSection");
const playerNameInput = document.getElementById("playerNameInput");
const startBtn = document.getElementById("startBtn");
const loginError = document.getElementById("loginError");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const remainingDisplay = document.getElementById("remainingDisplay");
const spinBtn = document.getElementById("spinBtn");
const finishedBox = document.getElementById("finishedBox");
const finalScoreText = document.getElementById("finalScoreText");
const playAgainBtn = document.getElementById("playAgainBtn");

const questionModal = document.getElementById("questionModal");
const modalQuestionNumber = document.getElementById("modalQuestionNumber");
const modalQuestionText = document.getElementById("modalQuestionText");
const modalOptions = document.getElementById("modalOptions");
const modalFeedback = document.getElementById("modalFeedback");
const modalContinueBtn = document.getElementById("modalContinueBtn");

const leaderboardBody = document.getElementById("leaderboardBody");
const leaderboardEmpty = document.getElementById("leaderboardEmpty");

function initGame() {
  canvas = document.getElementById("wheel");
  ctx = canvas.getContext("2d");
  remainingIndexes = QUESTIONS.map((_, i) => i);
  score = 0;
  currentRotation = 0;
  canvas.style.transform = "rotate(0deg)";
  drawWheel();
  updateHud();
  finishedBox.style.display = "none";
  spinBtn.disabled = false;
}

function updateHud() {
  playerNameDisplay.textContent = playerName;
  scoreDisplay.textContent = score.toFixed(2) + " / 5.0";
  remainingDisplay.textContent = String(remainingIndexes.length);
}

const COLOR_A = "#CECBF6";
const COLOR_B = "#9FE1CB";
const TEXT_A = "#26215C";
const TEXT_B = "#04342C";

function drawWheel() {
  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  ctx.clearRect(0, 0, size, size);

  const n = remainingIndexes.length;
  if (n === 0) return;
  const seg = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const start = i * seg - Math.PI / 2;
    const end = start + seg;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? COLOR_A : COLOR_B;
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + seg / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = i % 2 === 0 ? TEXT_A : TEXT_B;
    ctx.font = "600 14px sans-serif";
    const questionNumber = remainingIndexes[i] + 1;
    ctx.fillText(String(questionNumber), r - 14, 0);
    ctx.restore();
  }
}

function spin() {
  if (spinning || remainingIndexes.length === 0) return;
  spinning = true;
  spinBtn.disabled = true;

  const n = remainingIndexes.length;
  const segDeg = 360 / n;
  const chosenPosition = Math.floor(Math.random() * n);
  const targetCenterDeg = chosenPosition * segDeg + segDeg / 2;
  const extraTurns = 5 + Math.floor(Math.random() * 3);
  const finalRotation =
    currentRotation + extraTurns * 360 + (360 - targetCenterDeg) - (currentRotation % 360);

  canvas.style.transform = "rotate(" + finalRotation + "deg)";
  currentRotation = finalRotation;

  setTimeout(() => {
    spinning = false;
    activeQuestionIndex = remainingIndexes[chosenPosition];
    openQuestionModal(activeQuestionIndex);
  }, 4100);
}

function speakQuestion(q) {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no soporta la lectura en voz alta.");
    return;
  }
  window.speechSynthesis.cancel();
  const letters = ["A", "B", "C", "D"];
  const questionPart = q.text.replace(/_{3,}/g, " un espacio en blanco ");
  const optionsPart = q.options
    .map((opt, i) => "Opción " + letters[i] + ": " + opt)
    .join(". ");
  const fullText = questionPart + ". " + optionsPart;
  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.lang = "es-CO";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function openQuestionModal(qIndex) {
  const q = QUESTIONS[qIndex];
  const typeLabel = q.type === "fill_blank" ? "Completa la palabra" : "Opción múltiple";
  modalQuestionNumber.textContent = "Pregunta " + (qIndex + 1) + " · " + typeLabel;
  modalQuestionText.textContent = q.text;
  modalFeedback.style.display = "none";
  modalContinueBtn.style.display = "none";
  modalOptions.innerHTML = "";

  const existingAudioBtn = document.getElementById("audioBtn");
  if (existingAudioBtn) existingAudioBtn.remove();

  const audioBtn = document.createElement("button");
  audioBtn.id = "audioBtn";
  audioBtn.className = "audio-btn";
  audioBtn.type = "button";
  audioBtn.textContent = "🔊 Escuchar pregunta y opciones";
  audioBtn.addEventListener("click", () => speakQuestion(q));
  modalQuestionText.insertAdjacentElement("afterend", audioBtn);

  q.options.forEach((optionText, optionIndex) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = optionText;
    btn.addEventListener("click", () => answerQuestion(qIndex, optionIndex));
    modalOptions.appendChild(btn);
  });

  questionModal.style.display = "flex";
}

function answerQuestion(qIndex, chosenOptionIndex) {
  const q = QUESTIONS[qIndex];
  const optionButtons = modalOptions.querySelectorAll(".option-btn");
  optionButtons.forEach((btn) => (btn.disabled = true));

  const isCorrect = chosenOptionIndex === q.correctIndex;
  optionButtons[chosenOptionIndex].classList.add(isCorrect ? "correct" : "incorrect");
  if (!isCorrect) {
    optionButtons[q.correctIndex].classList.add("correct");
  }

  modalFeedback.style.display = "block";
  modalFeedback.className = "modal-feedback " + (isCorrect ? "correct-text" : "incorrect-text");
  modalFeedback.textContent = isCorrect
    ? "Correcto. Sumaste " + POINTS_PER_QUESTION.toFixed(2) + " puntos."
    : "Incorrecto. La respuesta correcta está marcada en verde.";

  if (isCorrect) {
    score = Math.min(5, score + POINTS_PER_QUESTION);
  }

  remainingIndexes = remainingIndexes.filter((i) => i !== qIndex);
  updateHud();

  modalContinueBtn.style.display = "inline-block";
}

function closeModalAndContinue() {
  questionModal.style.display = "none";
  drawWheel();
  currentRotation = 0;
  canvas.style.transform = "rotate(0deg)";

  if (remainingIndexes.length === 0) {
    finishGame();
  } else {
    spinBtn.disabled = false;
  }
}

function finishGame() {
  finalScoreText.textContent = score.toFixed(2) + " / 5.0";
  finishedBox.style.display = "block";
  spinBtn.disabled = true;
  saveScore(playerName, score);
}

function saveScore(name, finalScore) {
  leaderboardRef
    .add({
      name: name,
      score: Number(finalScore.toFixed(2)),
      date: new Date().toLocaleDateString("es-CO"),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch((err) => {
      console.error("No se pudo guardar el puntaje:", err);
      alert("No se pudo guardar tu puntaje en la base de datos. Revisa tu conexión e inténtalo de nuevo.");
    });
}

function subscribeToLeaderboard() {
  leaderboardRef.orderBy("score", "desc").limit(100).onSnapshot(
    (snapshot) => {
      renderLeaderboard(snapshot.docs.map((doc) => doc.data()));
    },
    (err) => {
      console.error("No se pudo cargar la tabla de posiciones:", err);
      leaderboardEmpty.style.display = "block";
      leaderboardEmpty.textContent = "No se pudo cargar la tabla de posiciones. Revisa la configuración de Firebase.";
    }
  );
}

function renderLeaderboard(entries) {
  leaderboardBody.innerHTML = "";

  if (!entries || entries.length === 0) {
    leaderboardEmpty.style.display = "block";
    return;
  }
  leaderboardEmpty.style.display = "none";

  entries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + (index + 1) + "</td>" +
      "<td>" + escapeHtml(entry.name) + "</td>" +
      "<td>" + Number(entry.score).toFixed(2) + "</td>" +
      "<td>" + escapeHtml(entry.date) + "</td>";
    leaderboardBody.appendChild(row);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    loginError.style.display = "block";
    return;
  }
  loginError.style.display = "none";
  playerName = name;
  loginSection.style.display = "none";
  gameSection.style.display = "block";
  initGame();
});

spinBtn.addEventListener("click", spin);
modalContinueBtn.addEventListener("click", closeModalAndContinue);

playAgainBtn.addEventListener("click", () => {
  loginSection.style.display = "block";
  gameSection.style.display = "none";
  playerNameInput.value = "";
  playerNameInput.focus();
});

subscribeToLeaderboard();
