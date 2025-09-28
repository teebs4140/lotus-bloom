const state = {
  petals: 0,
  basePerClick: 1,
  petalsPerClick: 1,
  petalsPerSecond: 0,
  highScore: 0,
};

const upgrades = [
  {
    id: 'dew-drops',
    name: 'Morning Dew',
    description: 'Collect gentle dew for +1 petal per click.',
    baseCost: 15,
    costMultiplier: 1.15,
    type: 'perClickAdd',
    value: 1,
    count: 0,
  },
  {
    id: 'lanterns',
    name: 'Floating Lanterns',
    description: 'Illuminate the pond to harvest +0.5 petals per second.',
    baseCost: 60,
    costMultiplier: 1.18,
    type: 'perSecond',
    value: 0.5,
    count: 0,
  },
  {
    id: 'koi-pond',
    name: 'Koi Pond',
    description: 'Peaceful koi tend the garden for +3 petals per second.',
    baseCost: 275,
    costMultiplier: 1.22,
    type: 'perSecond',
    value: 3,
    count: 0,
  },
  {
    id: 'zen-master',
    name: 'Zen Mastery',
    description: 'Mindful breathing grants ×1.2 petals per click.',
    baseCost: 600,
    costMultiplier: 1.35,
    type: 'perClickMultiplier',
    value: 1.2,
    count: 0,
  },
  {
    id: 'lotus-orchard',
    name: 'Lotus Orchard',
    description: 'Expand the garden for +12 petals per second.',
    baseCost: 1500,
    costMultiplier: 1.25,
    type: 'perSecond',
    value: 12,
    count: 0,
  },
  {
    id: 'silk-weavers',
    name: 'Silk Weavers',
    description: 'Delicate threads add +5 petals per click.',
    baseCost: 4200,
    costMultiplier: 1.28,
    type: 'perClickAdd',
    value: 5,
    count: 0,
  },
  {
    id: 'wind-chimes',
    name: 'Wind Chimes',
    description: 'Soft melodies yield +20 petals per second.',
    baseCost: 7500,
    costMultiplier: 1.24,
    type: 'perSecond',
    value: 20,
    count: 0,
  },
  {
    id: 'tea-ritual',
    name: 'Tea Ritual',
    description: 'Ceremonial focus grants ×1.35 petals per click.',
    baseCost: 11000,
    costMultiplier: 1.38,
    type: 'perClickMultiplier',
    value: 1.35,
    count: 0,
  },
  {
    id: 'crane-keepers',
    name: 'Crane Keepers',
    description: 'Graceful cranes tend blooms for +55 petals per second.',
    baseCost: 18500,
    costMultiplier: 1.3,
    type: 'perSecond',
    value: 55,
    count: 0,
  },
  {
    id: 'starlit-grove',
    name: 'Starlit Grove',
    description: 'Celestial light blesses clicks with ×1.6 petals per click.',
    baseCost: 32000,
    costMultiplier: 1.45,
    type: 'perClickMultiplier',
    value: 1.6,
    count: 0,
  },
];

const lotusButton = document.getElementById('lotus-button');
const petalCountEl = document.getElementById('petal-count');
const petalRateEl = document.getElementById('petal-rate');
const petalClickEl = document.getElementById('petal-click');
const highScoreEl = document.getElementById('high-score');
const upgradeListEl = document.getElementById('upgrade-list');

const upgradeElements = new Map();

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

const HIGH_SCORE_STORAGE_KEY = 'lotusHighScore';
let canPersistHighScore = true;

function formatCost(value) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return Math.round(value).toString();
}

function getUpgradeCost(upgrade) {
  return Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
}

function recalculateRates() {
  let perClick = state.basePerClick;
  let clickMultiplier = 1;
  let passive = 0;

  for (const upgrade of upgrades) {
    if (upgrade.type === 'perClickAdd') {
      perClick += upgrade.count * upgrade.value;
    } else if (upgrade.type === 'perClickMultiplier') {
      clickMultiplier *= Math.pow(upgrade.value, upgrade.count);
    } else if (upgrade.type === 'perSecond') {
      passive += upgrade.count * upgrade.value;
    }
  }

  state.petalsPerClick = perClick * clickMultiplier;
  state.petalsPerSecond = passive;
}

function loadHighScore() {
  if (!canPersistHighScore) {
    return;
  }

  if (typeof localStorage === 'undefined') {
    canPersistHighScore = false;
    return;
  }

  try {
    const saved = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
    if (saved !== null) {
      const value = Number(saved);
      if (Number.isFinite(value)) {
        state.highScore = Math.max(state.highScore, value);
      }
    }
  } catch (error) {
    canPersistHighScore = false;
  }
}

function saveHighScore() {
  if (!canPersistHighScore) {
    return;
  }

  if (typeof localStorage === 'undefined') {
    canPersistHighScore = false;
    return;
  }

  try {
    localStorage.setItem(HIGH_SCORE_STORAGE_KEY, String(state.highScore));
  } catch (error) {
    canPersistHighScore = false;
  }
}

function checkHighScore() {
  if (state.petals <= state.highScore) {
    return;
  }

  state.highScore = state.petals;
  saveHighScore();
  highScoreEl.textContent = numberFormatter.format(state.highScore);
}

function updateCounters() {
  petalCountEl.textContent = numberFormatter.format(state.petals);
  petalRateEl.textContent = numberFormatter.format(state.petalsPerSecond);
  petalClickEl.textContent = numberFormatter.format(state.petalsPerClick);
  highScoreEl.textContent = numberFormatter.format(state.highScore);
}

function createUpgradeCards() {
  upgrades.forEach((upgrade) => {
    const card = document.createElement('article');
    card.className = 'upgrade-card';

    const info = document.createElement('div');
    info.className = 'upgrade-info';

    const title = document.createElement('h3');
    title.textContent = upgrade.name;

    const description = document.createElement('p');
    description.textContent = upgrade.description;

    const count = document.createElement('div');
    count.className = 'upgrade-count';

    info.append(title, description, count);

    const action = document.createElement('div');
    action.className = 'upgrade-action';

    const costEl = document.createElement('div');
    costEl.className = 'upgrade-cost';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'upgrade-button';
    button.dataset.upgrade = upgrade.id;
    button.textContent = 'Nurture';

    action.append(costEl, button);
    card.append(info, action);
    upgradeListEl.appendChild(card);

    upgradeElements.set(upgrade.id, {
      cardEl: card,
      countEl: count,
      costEl,
      buttonEl: button,
    });
  });

  updateUpgradeDisplays();
}

function updateUpgradeDisplays() {
  upgrades.forEach((upgrade) => {
    const refs = upgradeElements.get(upgrade.id);
    if (!refs) return;

    const cost = getUpgradeCost(upgrade);
    const affordable = state.petals >= cost;

    refs.countEl.textContent = `Owned: ${upgrade.count}`;
    refs.costEl.textContent = `Cost: ${formatCost(cost)}`;
    refs.buttonEl.disabled = !affordable;
    refs.cardEl.classList.toggle('deactivated', !affordable);
  });
}

function handleLotusClick() {
  state.petals += state.petalsPerClick;
  playBloomPulse();
  checkHighScore();
  updateCounters();
  updateUpgradeDisplays();
}

function playBloomPulse() {
  lotusButton.classList.remove('is-pulsing');
  void lotusButton.offsetWidth;
  lotusButton.classList.add('is-pulsing');
}

function handleUpgradeClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const upgradeId = target.dataset.upgrade;
  if (!upgradeId) return;

  const upgrade = upgrades.find((item) => item.id === upgradeId);
  if (!upgrade) return;

  const cost = getUpgradeCost(upgrade);
  if (state.petals < cost) return;

  state.petals -= cost;
  upgrade.count += 1;

  recalculateRates();
  updateCounters();
  updateUpgradeDisplays();
}

function startPassiveGrowth() {
  const ticksPerSecond = 10;
  setInterval(() => {
    if (state.petalsPerSecond <= 0) {
      return;
    }

    state.petals += state.petalsPerSecond / ticksPerSecond;
    checkHighScore();
    updateCounters();
    updateUpgradeDisplays();
  }, 1000 / ticksPerSecond);
}

function init() {
  lotusButton.addEventListener('click', handleLotusClick);
  upgradeListEl.addEventListener('click', handleUpgradeClick);
  recalculateRates();
  createUpgradeCards();
  loadHighScore();
  updateCounters();
  startPassiveGrowth();
}

window.addEventListener('DOMContentLoaded', init);
