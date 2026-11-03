// =====================================
// API CONFIG
// =====================================
const API_URL = import.meta.env.VITE_API_URL;

// =====================================
// AUTH FETCH
// =====================================

function getToken() {
  return localStorage.getItem("token");
}

async function apiFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}

// =====================================
// PRODUCT APIs
// =====================================

// GET ALL PRODUCTS
export async function getProducts() {
  const response = await apiFetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách sản phẩm");
  }

  return await response.json();
}

// CREATE PRODUCT
export async function createProduct(product) {
  const formData = new FormData();

  Object.keys(product).forEach((key) => {
    if (product[key] !== null && product[key] !== undefined) {
      formData.append(key, product[key]);
    }
  });

  const response = await apiFetch(`${API_URL}/products`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Không thể tạo sản phẩm");
  }

  return await response.json();
}

// UPDATE PRODUCT
export async function updateProduct(id, product) {
  const formData = new FormData();

  Object.keys(product).forEach((key) => {
    if (product[key] !== null && product[key] !== undefined) {
      formData.append(key, product[key]);
    }
  });

  const response = await apiFetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật sản phẩm");
  }

  return await response.json();
}

// DELETE PRODUCT
export async function deleteProduct(id) {
  const response = await apiFetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa sản phẩm");
  }

  return await response.json();
}

// =====================================
// CATEGORY APIs
// =====================================

// GET ALL CATEGORIES
export async function getCategories() {
  const response = await apiFetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách danh mục");
  }

  return await response.json();
}

// CREATE CATEGORY
export async function createCategory(category) {
  const response = await apiFetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Không thể tạo danh mục");
  }

  return await response.json();
}

// UPDATE CATEGORY
export async function updateCategory(id, category) {
  const response = await apiFetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật danh mục");
  }

  return await response.json();
}

// DELETE CATEGORY
export async function deleteCategory(id) {
  const response = await apiFetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa danh mục");
  }

  return await response.json();
}

// SEED CATEGORY
export async function seedCategories() {
  const response = await apiFetch(`${API_URL}/categories/seed`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Không thể khởi tạo danh mục");
  }

  return await response.json();
}

// =====================================
// ORDER APIs
// =====================================

// GET ALL ORDERS
export async function getOrders() {
  const response = await apiFetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách hóa đơn");
  }

  return await response.json();
}

// GET ORDER
export async function getOrder(id) {
  const response = await apiFetch(`${API_URL}/orders/${id}`);

  if (!response.ok) {
    throw new Error("Không thể tải hóa đơn");
  }

  return await response.json();
}

// CREATE ORDER
export async function createOrder(order) {
  const response = await apiFetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    let message = "Không thể tạo hóa đơn";

    try {
      const err = await response.json();
      message = err.message || message;
    } catch {}

    throw new Error(message);
  }

  return await response.json();
}

// DELETE ORDER
export async function deleteOrder(id) {
  const response = await apiFetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa hóa đơn");
  }

  return await response.json();
}

// =====================================
// IMAGE URL
// =====================================

export function getImageUrl(image) {
  if (!image) return "";

  return `${API_URL}/${image}`;
}

// =====================================
// EXPORT
// =====================================

export default API_URL;

// =====================================
// CUSTOMER APIs
// =====================================

// GET ALL CUSTOMERS
export async function getCustomers() {
  const response = await apiFetch(`${API_URL}/customers`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách khách hàng");
  }

  return await response.json();
}

// GET CUSTOMER
export async function getCustomer(id) {
  const response = await apiFetch(`${API_URL}/customers/${id}`);

  if (!response.ok) {
    throw new Error("Không thể tải khách hàng");
  }

  return await response.json();
}

// CREATE CUSTOMER
export async function createCustomer(customer) {
  const response = await apiFetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Không thể tạo khách hàng");
  }

  return await response.json();
}

// UPDATE CUSTOMER
export async function updateCustomer(id, customer) {
  const response = await apiFetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật khách hàng");
  }

  return await response.json();
}

// DELETE CUSTOMER
export async function deleteCustomer(id) {
  const response = await apiFetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa khách hàng");
  }

  return await response.json();
}

// =====================================
// STATISTICS APIs
// =====================================

// Dashboard
export async function getDashboardStatistics() {
  const response = await apiFetch(`${API_URL}/statistics/dashboard`);

  if (!response.ok) {
    throw new Error("Không thể tải Dashboard");
  }

  return await response.json();
}

// Sales Chart
export async function getSalesChart() {
  const response = await apiFetch(`${API_URL}/statistics/sales-chart`);

  if (!response.ok) {
    throw new Error("Không thể tải biểu đồ");
  }

  return await response.json();
}

// Top Products
export async function getTopProducts() {
  const response = await apiFetch(`${API_URL}/statistics/top-products`);

  if (!response.ok) {
    throw new Error("Không thể tải Top sản phẩm");
  }

  return await response.json();
}

// Recent Orders
export async function getRecentOrders() {
  const response = await apiFetch(`${API_URL}/statistics/recent-orders`);

  if (!response.ok) {
    throw new Error("Không thể tải hóa đơn");
  }

  return await response.json();
}

// Low Stock
export async function getLowStock() {
  const response = await apiFetch(`${API_URL}/statistics/low-stock`);

  if (!response.ok) {
    throw new Error("Không thể tải tồn kho");
  }

  return await response.json();
}

// Top Customers
export async function getTopCustomers() {
  const response = await apiFetch(`${API_URL}/statistics/top-customers`);

  if (!response.ok) {
    throw new Error("Không thể tải khách hàng");
  }

  return await response.json();
}

// =====================================================
// SUPPLIER APIs
// =====================================================

// GET ALL SUPPLIERS
export async function getSuppliers(keyword = "") {
  const url = keyword
    ? `${API_URL}/suppliers?keyword=${encodeURIComponent(keyword)}`
    : `${API_URL}/suppliers`;

  const response = await apiFetch(url);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách nhà cung cấp");
  }

  return await response.json();
}

// GET SUPPLIER
export async function getSupplier(id) {
  const response = await apiFetch(`${API_URL}/suppliers/${id}`);

  if (!response.ok) {
    throw new Error("Không thể tải nhà cung cấp");
  }

  return await response.json();
}

// CREATE SUPPLIER
export async function createSupplier(data) {
  const response = await apiFetch(`${API_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể tạo nhà cung cấp");
  }

  return await response.json();
}

// UPDATE SUPPLIER
export async function updateSupplier(id, data) {
  const response = await apiFetch(`${API_URL}/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể cập nhật nhà cung cấp");
  }

  return await response.json();
}

// DELETE SUPPLIER
export async function deleteSupplier(id) {
  const response = await apiFetch(`${API_URL}/suppliers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể xóa nhà cung cấp");
  }

  return await response.json();
}

// =====================================
// PURCHASE APIs
// =====================================

// GET ALL PURCHASES
export async function getPurchases(keyword = "") {
  const url = keyword
    ? `${API_URL}/purchases?keyword=${encodeURIComponent(keyword)}`
    : `${API_URL}/purchases`;

  const response = await apiFetch(url);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách phiếu nhập");
  }

  return await response.json();
}

// GET PURCHASE
export async function getPurchase(id) {
  const response = await apiFetch(`${API_URL}/purchases/${id}`);

  if (!response.ok) {
    throw new Error("Không thể tải phiếu nhập");
  }

  return await response.json();
}

// CREATE PURCHASE
export async function createPurchase(data) {
  const response = await apiFetch(`${API_URL}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể tạo phiếu nhập");
  }

  return await response.json();
}

// UPDATE PURCHASE
export async function updatePurchase(id, data) {
  const response = await apiFetch(`${API_URL}/purchases/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể cập nhật phiếu nhập");
  }

  return await response.json();
}

// DELETE PURCHASE
export async function deletePurchase(id) {
  const response = await apiFetch(`${API_URL}/purchases/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể xóa phiếu nhập");
  }

  return await response.json();
}

// RECEIVE PURCHASE (Nhập kho)
export async function receivePurchase(id) {
  const response = await apiFetch(`${API_URL}/purchases/${id}/receive`, {
    method: "PUT",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể nhập kho");
  }

  return await response.json();
}

// =====================================
// USER APIs
// =====================================

// GET ALL USERS
export async function getUsers(keyword = "") {
  const url = keyword
    ? `${API_URL}/users?keyword=${encodeURIComponent(keyword)}`
    : `${API_URL}/users`;

  const response = await apiFetch(url);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Không thể tải danh sách người dùng");
  }

  return await response.json();
}

// GET ALL USERS
// GET USER
export async function getUser(id) {
  const response = await apiFetch(`${API_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("Không thể tải người dùng");
  }

  return await response.json();
}

// CREATE USER
export async function createUser(data) {
  const response = await apiFetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể tạo người dùng");
  }

  return await response.json();
}

// UPDATE USER
export async function updateUser(id, data) {
  const response = await apiFetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể cập nhật người dùng");
  }

  return await response.json();
}

// DELETE USER
export async function deleteUser(id) {
  const response = await apiFetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể xóa người dùng");
  }

  return await response.json();
}

// RESET PASSWORD
export async function resetPassword(id) {
  const response = await apiFetch(`${API_URL}/users/${id}/reset-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "123456",
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể reset mật khẩu");
  }

  return await response.json();
}

// LOCK / UNLOCK USER
export async function toggleUserStatus(id) {
  const response = await apiFetch(`${API_URL}/users/${id}/toggle-status`, {
    method: "PUT",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Không thể cập nhật trạng thái");
  }

  return await response.json();
}
