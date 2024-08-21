let pomodoroTime = document.getElementById('pomodoroTime').value * 60;
let remainingTime = pomodoroTime;
let timerInterval;
let isPaused = true;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const alarmSound = document.getElementById('alarmSound');

function startTimer() {
    if (isPaused) {
        isPaused = false;
        startPauseButton.textContent = 'Pause';
        timerInterval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay();
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                alarmSound.play();
                startPauseButton.textContent = 'Start';
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isPaused = true;
        startPauseButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    remainingTime = 25 * 60;
    updateTimerDisplay();
    startPauseButton.textContent = 'Start';
}

function updateTimerDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
}

document.getElementById('pomodoroTime').addEventListener('input', (event) => {
    pomodoroTime = event.target.value * 60;
    remainingTime = pomodoroTime;
    updateTimerDisplay();
});

document.getElementById('shortBreak').addEventListener('click', () => {
    remainingTime = 300 // seconds
    updateTimerDisplay();
});

document.getElementById('longBreak').addEventListener('click', () => {
    remainingTime = 900 // seconds
    updateTimerDisplay();
});

startPauseButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay();
