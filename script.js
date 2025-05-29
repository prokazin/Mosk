let score = parseInt(localStorage.getItem('score')) || 0;
let perClick = parseInt(localStorage.getItem('perClick')) || 1;
let perSecond = parseInt(localStorage.getItem('perSecond')) || 0;
let lastWearCheck = parseInt(localStorage.getItem('lastWearCheck')) || 0;

const scoreElement = document.getElementById('score');
const perSecondElement = document.getElementById('perSecond');
const clickBtn = document.getElementById('clickBtn');

const upgrade1Btn = document.getElementById('upgrade1');
const upgrade2Btn = document.getElementById('upgrade2');
const upgrade3Btn = document.getElementById('upgrade3');

const fixClutchBtn = document.getElementById('fixClutch');
const addCoolantBtn = document.getElementById('addCoolant');
const tuneJetsBtn = document.getElementById('tuneJets');

vkBridge.send('VKWebAppInit');

function updateUI() {
  scoreElement.textContent = Math.floor(score);
  perSecondElement.textContent = perSecond;
  upgrade1Btn.disabled = score < 10;
  upgrade2Btn.disabled = score < 50;
  upgrade3Btn.disabled = score < 200;
}

function saveProgress() {
  localStorage.setItem('score', score);
  localStorage.setItem('perClick', perClick);
  localStorage.setItem('perSecond', perSecond);
  localStorage.setItem('lastWearCheck', lastWearCheck);
}

function checkWear() {
  if (score - lastWearCheck >= 500) {
    lastWearCheck = score;
    perClick = Math.max(1, perClick - 1);
    perSecond = Math.max(0, perSecond - 2);
    alert("⚙️ Износ сцепления! Скорость и клики снижены.");
    updateUI();
  }
}

function addScore() {
  score += perClick;
  checkWear();
  updateUI();
  saveProgress();
}

clickBtn.addEventListener('click', addScore);

upgrade1Btn.addEventListener('click', () => {
  if (score >= 10) {
    score -= 10;
    perSecond += 5;
    updateUI();
    saveProgress();
  }
});

upgrade2Btn.addEventListener('click', () => {
  if (score >= 50) {
    score -= 50;
    perClick += 2;
    updateUI();
    saveProgress();
  }
});

upgrade3Btn.addEventListener('click', () => {
  if (score >= 200) {
    score -= 200;
    perSecond += 20;
    updateUI();
    saveProgress();
  }
});

fixClutchBtn.addEventListener('click', () => {
  if (score >= 100) {
    score -= 100;
    perSecond += 2;
    alert("✅ Сцепление отрегулировано!");
    updateUI();
    saveProgress();
  }
});

addCoolantBtn.addEventListener('click', () => {
  if (score >= 150) {
    score -= 150;
    perClick += 1;
    alert("✅ Тосол залит!");
    updateUI();
    saveProgress();
  }
});

tuneJetsBtn.addEventListener('click', () => {
  if (score >= 200) {
    score -= 200;
    perClick += 1;
    perSecond += 1;
    alert("✅ Жиклёры подкручены!");
    updateUI();
    saveProgress();
  }
});

setInterval(() => {
  score += perSecond;
  checkWear();
  updateUI();
  saveProgress();
}, 1000);

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

updateUI();
