// =====================================
// SKU GENERATOR
// =====================================

const counters = {};

function generateSKU(category) {
  if (!counters[category]) {
    counters[category] = 1;
  }

  const number = String(counters[category]).padStart(4, "0");

  counters[category]++;

  return `${category.toUpperCase()}-${number}`;
}

module.exports = generateSKU;
