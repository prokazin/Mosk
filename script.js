let score = 0;
let perClick = 1;
let perSecond = 0;

const scoreElement = document.getElementById('score');
const perSecondElement = document.getElementById('perSecond');
const clickBtn = document.getElementById('clickBtn');
const manualClickBtn = document.getElementById('manualClickBtn');
const upgrade1Btn = document.getElementById('upgrade1');
const upgrade2Btn = document.getElementById('upgrade2');
const upgrade3Btn = document.getElementById('upgrade3');

vkBridge.send('VKWebAppInit');

clickBtn.addEventListener('click', () => addScore());
manualClickBtn.addEventListener('click', () => addScore());

function addScore() {
    score += perClick;
    updateUI();
}

upgrade1Btn.addEventListener('click', () => {
    if (score >= 10) {
        score -= 10;
        perSecond += 5;
        updateUI();
    } else {
        alert('Недостаточно пробега!');
    }
});

upgrade2Btn.addEventListener('click', () => {
    if (score >= 50) {
        score -= 50;
        perClick += 2;
        updateUI();
    } else {
        alert('Недостаточно пробега!');
    }
});

upgrade3Btn.addEventListener('click', () => {
    if (score >= 200) {
        score -= 200;
        perSecond += 20;
        updateUI();
    } else {
        alert('Недостаточно пробега!');
    }
});

setInterval(() => {
    score += perSecond;
    updateUI();
}, 1000);

function updateUI() {
    scoreElement.textContent = Math.floor(score);
    perSecondElement.textContent = perSecond;
    upgrade1Btn.disabled = score < 10;
    upgrade2Btn.disabled = score < 50;
    upgrade3Btn.disabled = score < 200;
}
