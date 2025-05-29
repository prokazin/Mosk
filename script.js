vkBridge.send('VKWebAppInit');

let score = parseInt(localStorage.getItem('score')) || 0;
let perClick = parseInt(localStorage.getItem('perClick')) || 1;
let perSecond = parseInt(localStorage.getItem('perSecond')) || 0;
let lastWearCheck = parseInt(localStorage.getItem('lastWearCheck')) || 0;

// Локальный рейтинг в localStorage (массив объектов {name, score})
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

const scoreElement = document.getElementById('score');
const perSecondElement = document.getElementById('perSecond');
const clickBtn = document.getElementById('clickBtn');

const upgrade1Btn = document.getElementById('upgrade1');
const upgrade2Btn = document.getElementById('upgrade2');
const upgrade3Btn = document.getElementById('upgrade3');

const fixClutchBtn = document.getElementById('fixClutch');
const addCoolantBtn = document.getElementById('addCoolant');
const tuneJetsBtn = document.getElementById('tuneJets');

const notification = document.getElementById('notification');
const leaderList = document.getElementById('leaderList');
let notificationTimeout;

// Показ уведомления с плавным исчезновением
function showNotification(text) {
  clearTimeout(notificationTimeout);
  notification.textContent = text;
  notification.classList.add('show');
  notificationTimeout = setTimeout(() => {
    notification.classList.remove('show');
  }, 3500);
}

function updateUI() {
  scoreElement.textContent = Math.floor(score);
  perSecondElement.textContent = perSecond;
  upgrade1Btn.disabled = score < 10;
  upgrade2Btn.disabled = score < 50;
  upgrade3Btn.disabled = score < 200;

  fixClutchBtn.disabled = score < 100;
  addCoolantBtn.disabled = score < 150;
  tuneJetsBtn.disabled = score < 200;
}

function saveProgress() {
  localStorage.setItem('score', score);
  localStorage.setItem('perClick', perClick);
  localStorage.setItem('perSecond', perSecond);
  localStorage.setItem('lastWearCheck', lastWearCheck);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Износ сцепления: чем больше пробег, тем реже износ
function checkWear() {
  const wearThreshold = 500 + Math.floor(score / 1000) * 500;

  if (score - lastWearCheck >= wearThreshold) {
    lastWearCheck = score;
    perClick = Math.max(1, perClick - 1);
    perSecond = Math.max(0, perSecond - 2);
    showNotification("⚙️ Износ сцепления! Скорость и клики снижены.");
    updateUI();
    saveProgress();
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
    perClick += 1;
    perSecond += 3;
    showNotification("✅ Сцепление отрегулировано!");
    updateUI();
    saveProgress();
  }
});

addCoolantBtn.addEventListener('click', () => {
  if (score >= 150) {
    score -= 150;
    perClick += 1;
    showNotification("✅ Тосол залит, двигатель охлаждается!");
    updateUI();
    saveProgress();
  }
});

tuneJetsBtn.addEventListener('click', () => {
  if (score >= 200) {
    score -= 200;
    perSecond += 10;
    showNotification("✅ Жиклёры подкручены, мощность выросла!");
    updateUI();
    saveProgress();
  }
});

// Автоматический прирост очков по скорости
setInterval(() => {
  score += perSecond / 10;
  updateUI();
  saveProgress();
}, 1000);

// Вкладки
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

function activateTab(tabName) {
  contents.forEach(c => {
    c.classList.toggle('active', c.id === tabName);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    activateTab(tab.dataset.tab);
    if(tab.dataset.tab === 'leaders') {
      renderLeaderboard();
    }
  });
});

// Отрисовка локального рейтинга
function renderLeaderboard() {
  // Добавляем текущего пользователя (например, "Вы")
  const playerName = 'Вы';
  const playerScore = Math.floor(score);

  // Обновляем или добавляем игрока в лидерборд
  const existingIndex = leaderboard.findIndex(p => p.name === playerName);
  if(existingIndex >= 0) {
    if(playerScore > leaderboard[existingIndex].score) {
      leaderboard[existingIndex].score = playerScore;
    }
  } else {
    leaderboard.push({name: playerName, score: playerScore});
  }

  // Сортируем по убыванию очков и оставляем топ 10
  leaderboard.sort((a,b) => b.score - a.score);
  if(leaderboard.length > 10) leaderboard = leaderboard.slice(0,10);

  let health = parseFloat(localStorage.getItem('health')) || 100;
let distanceSinceLastHealthDrop = 0;

const healthValue = document.getElementById('healthValue');
const healthBar = document.getElementById('healthBar');
const healthText = document.getElementById('healthText');
  
  // Выводим список
  leaderList.innerHTML = '';
  leaderboard.forEach((player, i) => {
    let medal = '';
    switch(i){
      case 0: medal = '🥇'; break;
      case 1: medal = '🥈'; break;
      case 2: medal = '🥉'; break;
      default: medal = '🚗'; break;
    }
    const li = document.createElement('li');
    li.textContent = `${medal} ${player.name} — ${player.score} км`;
    leaderList.appendChild(li);
  });

  function updateUI() {
  scoreElement.textContent = Math.floor(score);
  perSecondElement.textContent = perSecond;
  coinsDisplay.textContent = coins;

  const progress = (clicksCount % GAME_BALANCE.coinsInterval) / GAME_BALANCE.coinsInterval * 100;
  const remaining = GAME_BALANCE.coinsInterval - (clicksCount % GAME_BALANCE.coinsInterval);
  coinProgress.style.width = `${progress}%`;
  progressText.textContent = `${GAME_BALANCE.coinsInterval - remaining}/${GAME_BALANCE.coinsInterval}`;

    function clickHandler() {
  if (health <= 0) return;

  score += perClick;
  clicksCount++;
  distanceSinceLastHealthDrop += perClick;

  // Снижение здоровья каждые 100 км
  if (distanceSinceLastHealthDrop >= 100) {
    const drops = Math.floor(distanceSinceLastHealthDrop / 100);
    health = Math.max(0, health - drops);
    distanceSinceLastHealthDrop %= 100;
  }

  if (clicksCount % GAME_BALANCE.coinsInterval === 0) {
    coins++;
    showNotification('🎉 Получена бонусная монета!');
  }

  updateUI();
  saveGame();

  clickBtn.classList.remove('jump');
  void clickBtn.offsetWidth;
  clickBtn.classList.add('jump');
}
    
  // Прогресс здоровья
  healthValue.textContent = `${Math.floor(health)}%`;
  healthBar.style.width = `${health}%`;
  healthText.textContent = `${Math.floor(health)}%`;
  healthBar.style.background = health > 50 
    ? 'linear-gradient(90deg, #00cc66, #009933)' 
    : (health > 20 
      ? 'linear-gradient(90deg, #ffcc00, #ffaa00)' 
      : 'linear-gradient(90deg, #ff4444, #cc0000)');

  // Блокировать кнопку при 0% здоровья
  clickBtn.style.opacity = health <= 0 ? 0.5 : 1;
  clickBtn.style.pointerEvents = health <= 0 ? 'none' : 'auto';

  // Улучшения и ремонт
  upgrade1Btn.disabled = score < 25;
  upgrade2Btn.disabled = score < 120;
  upgrade3Btn.disabled = score < 500;

  fixClutchBtn.disabled = score < 250;
  addCoolantBtn.disabled = score < 400;
  tuneJetsBtn.disabled = score < 600;
}
  saveProgress();
}

updateUI();
