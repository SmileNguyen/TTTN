// =====================================
// PRICE GENERATOR
// =====================================

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PRICE = {
  CPU: [1800000, 28000000],
  MAINBOARD: [1500000, 12000000],
  RAM: [350000, 4500000],
  SSD: [450000, 9000000],
  HDD: [900000, 6500000],
  VGA: [3500000, 85000000],
  PSU: [600000, 7000000],
  CASE: [500000, 6000000],
  COOLER: [300000, 4500000],
  FAN: [80000, 650000],
  MONITOR: [1800000, 18000000],
  KEYBOARD: [150000, 4500000],
  MOUSE: [100000, 3500000],
  HEADSET: [200000, 6000000],
  SPEAKER: [250000, 8500000],
  WEBCAM: [300000, 4500000],
  MICROPHONE: [500000, 12000000],
  LAPTOP: [9000000, 65000000],
  ACCESSORY: [30000, 1200000],
};

function generatePrice(category) {
  const range = PRICE[category] || [100000, 1000000];

  const cost = random(range[0], range[1]);

  const profit = random(10, 25);

  const sale = Math.round(cost * (1 + profit / 100));

  return {
    cost_price: cost,
    sale_price: sale,
  };
}

module.exports = generatePrice;
