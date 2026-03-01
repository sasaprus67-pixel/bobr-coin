const tg = window.Telegram.WebApp;
tg.expand();

let count = 0;
let pwr = 1;
let energy = 500;
const maxEnergy = 500;

const scoreDisplay = document.getElementById('score');
const energyBar = document.getElementById('energy-bar');
const energyText = document.getElementById('energy-text');
const bobrImg = document.getElementById('bobr');

// Завантаження даних з хмари Telegram
tg.CloudStorage.getItems(['score', 'pwr'], (err, values) => {
    if (!err) {
        count = parseInt(values.score) || 0;
        pwr = parseInt(values.pwr) || 1;
        updateDisplay();
    }
});

function updateDisplay() {
    scoreDisplay.innerText = Math.floor(count);
    if (energyBar) energyBar.style.width = (energy / maxEnergy) * 100 + '%';
    if (energyText) energyText.innerText = Енергія: ${Math.floor(energy)} / ${maxEnergy};
    
    const upBtn = document.getElementById('buy-upgrade');
    if (upBtn) {
        upBtn.disabled = count < 400;
        upBtn.innerText = Купити (+1) - 400;
    }
}

// Клік на Бобра
if (bobrImg) {
    bobrImg.onclick = () => {
        if (energy >= 1) {
            count += pwr;
            energy -= 1;
            updateDisplay();
            saveData();
        }
    };
}

// Регенерація енергії (+1 в секунду)
setInterval(() => {
    if (energy < maxEnergy) {
        energy = Math.min(maxEnergy, energy + 1);
        updateDisplay();
    }
}, 1000);

// Купівля в магазині
const upBtn = document.getElementById('buy-upgrade');
if (upBtn) {
    upBtn.onclick = () => {
        if (count >= 400) {
            count -= 400;
            pwr += 1;
            updateDisplay();
            saveData();
        }
    };
}

// Виконання місії
const t1Btn = document.getElementById('task1');
if (t1Btn) {
    t1Btn.onclick = function() {
        count += 100;
        this.disabled = true;
        this.innerText = "Отримано!";
        updateDisplay();
        saveData();
    };
}

function saveData() {
    tg.CloudStorage.setItem('score', count.toString());
    tg.CloudStorage.setItem('pwr', pwr.toString());
}

function showPage(pageId, navEl) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    navEl.classList.add('active');
}
