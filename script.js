let startTime, updatedTime, interval;
let running = false;
let elapsedTime = 0;
let laps = [];


function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10); 
        running = true;
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (running) {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    elapsedTime = 0;
    laps = [];
    document.getElementById('timer').innerText = '00:00:00.000';
    document.getElementById('laps').innerHTML = '';
});

document.getElementById('lapBtn').addEventListener('click', () => {
    if (running) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        displayLaps();
    }
});

function updateTime() {
    updatedTime = Date.now() - startTime;
    document.getElementById('timer').innerText = formatTime(updatedTime);
}

function displayLaps() {
    const lapList = document.getElementById('laps');
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(li);
    });
}