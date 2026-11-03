const API_URL = "https://vrz7z2-3000.csb.app/products";

// ===============================
// GET PRODUCTS
// ===============================
export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return await response.json();
}

// ===============================
// CREATE PRODUCT
// ===============================
export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Create product failed");
  }

  return await response.json();
}

// ===============================
// UPDATE PRODUCT
// ===============================
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Update product failed");
  }

  return await response.json();
}

// ===============================
// DELETE PRODUCT
// ===============================
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete product failed");
  }

  return await response.json();
}
