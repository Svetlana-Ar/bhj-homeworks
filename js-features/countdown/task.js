const timerElement = document.getElementById("timer");
let timeLeft = parseInt(timerElement.textContent); 

function updateTimerDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  timerElement.textContent = `${hh}:${mm}:${ss}`;
}

updateTimerDisplay();

const countdown = setInterval(() => {
  timeLeft--;
  updateTimerDisplay();

  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert("Вы победили в конкурсе!");
  }
}, 1000); 