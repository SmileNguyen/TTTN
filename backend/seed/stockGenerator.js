// =====================================
// STOCK GENERATOR
// =====================================

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStock() {
  const chance = random(1, 100);

  // 5% hết hàng
  if (chance <= 5) {
    return 0;
  }

  // 10% sắp hết hàng
  if (chance <= 15) {
    return random(1, 5);
  }

  // 25% tồn kho thấp
  if (chance <= 40) {
    return random(6, 20);
  }

  // 60% tồn kho bình thường
  return random(21, 150);
}

module.exports = generateStock;
