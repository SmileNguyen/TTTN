const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  if (!API_URL) throw new Error("Chưa cấu hình VITE_API_URL");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Yêu cầu không thành công");
  return data;
}

export function getStoreProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.keyword) query.set("keyword", params.keyword);
  if (params.category) query.set("category", params.category);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request(`/storefront/products${suffix}`);
}

export function placeOnlineOrder(order) {
  return request("/storefront/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export function storeImageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `${API_URL}/${String(image).replace(/^\//, "")}`;
}

export function formatVnd(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")} ₫`;
}
