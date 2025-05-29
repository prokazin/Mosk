let score = 1000;  // Начальное значение, чтобы можно было уменьшать сразу
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

clickBtn.addEventListener('click', () => reduceScore());
manualClickBtn.addEventListener('click', () => reduceScore());

function reduceScore() {
    if (score >= perClick) {
        score -= perClick;  // уменьшаем пробег при клике
        updateUI();
    } else {
        alert('Недостаточно пробега для клика!');
    }
}

upgrade1Btn.addEventListener('click', () => {
    if (score >= 10) {
        score -= 10;
        perSecond = Math.max(0, perSecond - 5);  // уменьшаем скорость, минимум 0
        updateUI();
    } else {
        alert('Недостаточно пробега!');
    }
});

upgrade2Btn.addEventListener('click', () => {
    if (score >= 50) {
        score -= 50;
        perClick = Math.max(0, perClick - 2);  // уменьшаем пробег за клик, минимум 0
        updateUI();
    } else {
        alert('Недостаточно пробега!');
    }
});

upgrade3Btn.addEventListener('click', () => {
    if (score >= 200) {
        score -= 200;
        perSecond = Math.max(0, perSecond - 20);  // уменьшаем скорость, минимум 0
        updateUI();
    } else {
        alert('Недостаточно пробега!');
    }
});

setInterval(() => {
    if (score >= perSecond) {
      score -= perSecond; // уменьшаем пробег каждую секунду на скорость
    } else {
      score = 0;
    }
    updateUI();
}, 1000);

function updateUI() {
    scoreElement.textContent = Math.floor(score);
    perSecondElement.textContent = perSecond;
    upgrade1Btn.disabled = score < 10;
    upgrade2Btn.disabled = score < 50;
    upgrade3Btn.disabled = score < 200;
}
