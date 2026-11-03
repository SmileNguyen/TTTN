import React, { useEffect, useMemo, useState } from "react";

import { getSuppliers, getProducts } from "../services/api";

const emptyPurchase = {
  supplier: "",
  note: "",
};

export default function PurchaseModal({
  isOpen,
  onClose,
  onSave,
  purchase,
  isEditing,
}) {
  // ===========================
  // STATE
  // ===========================

  const [form, setForm] = useState(emptyPurchase);

  const [suppliers, setSuppliers] = useState([]);

  const [products, setProducts] = useState([]);

  const [items, setItems] = useState([]);

  // ===========================
  // LOAD DATA
  // ===========================

  useEffect(() => {
    if (!isOpen) return;

    loadSuppliers();
    loadProducts();
  }, [isOpen]);

  async function loadSuppliers() {
    try {
      const data = await getSuppliers();

      setSuppliers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  // ===========================
  // EDIT DATA
  // ===========================

  useEffect(() => {
    if (purchase) {
      setForm({
        supplier: purchase.supplier || "",
        note: purchase.note || "",
      });

      setItems(
        Array.isArray(purchase.items)
          ? purchase.items.map((item) => ({
              product: item.product?._id || item.product,
              name: item.product_name,
              quantity: item.quantity,
              cost_price: item.cost_price,
            }))
          : []
      );
    } else {
      setForm(emptyPurchase);
      setItems([]);
    }
  }, [purchase]);

  // ===========================
  // FORM CHANGE
  // ===========================

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // ===========================
  // TOTAL
  // ===========================

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0) * Number(item.cost_price || 0);
    }, 0);
  }, [items]);

  // ===========================
  // CLOSE
  // ===========================

  if (!isOpen) return null;
  // ===========================
  // ADD PRODUCT
  // ===========================

  function addProduct(productId) {
    if (!productId) return;

    const product = products.find((p) => p._id === productId);

    if (!product) return;

    const exists = items.find((i) => i.product === productId);

    if (exists) {
      alert("Sản phẩm đã có trong phiếu nhập.");
      return;
    }

    setItems([
      ...items,
      {
        product: product._id,
        name: product.name,
        quantity: 1,
        cost_price: product.cost_price || 0,
      },
    ]);
  }

  // ===========================
  // UPDATE ITEM
  // ===========================

  function updateItem(index, field, value) {
    const list = [...items];

    list[index][field] = value;

    setItems(list);
  }

  // ===========================
  // REMOVE ITEM
  // ===========================

  function removeItem(index) {
    const list = [...items];

    list.splice(index, 1);

    setItems(list);
  }

  // ===========================
  // SAVE
  // ===========================

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.supplier) {
      alert("Vui lòng chọn nhà cung cấp.");
      return;
    }

    if (items.length === 0) {
      alert("Phiếu nhập chưa có sản phẩm.");
      return;
    }

    onSave({
      supplier: form.supplier,
      note: form.note,
      items,
    });
  }

  // ===========================
  // SELECTED PRODUCTS
  // ===========================

  const selectedProducts = items.map((i) => i.product);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: 950,
          maxWidth: "95%",
          background: "#fff",
          borderRadius: 12,
          padding: 25,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          {isEditing ? "✏️ Cập nhật Phiếu nhập" : "📥 Tạo Phiếu nhập"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* =========================== */}
          {/* SUPPLIER */}
          {/* =========================== */}

          <div style={{ marginBottom: 20 }}>
            <label>Nhà cung cấp</label>

            <select
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- Chọn nhà cung cấp --</option>

              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          {/* =========================== */}
          {/* ADD PRODUCT */}
          {/* =========================== */}

          <div style={{ marginBottom: 20 }}>
            <label>Thêm sản phẩm</label>

            <select
              defaultValue=""
              onChange={(e) => {
                addProduct(e.target.value);
                e.target.value = "";
              }}
              style={inputStyle}
            >
              <option value="">-- Chọn sản phẩm --</option>

              {products
                .filter((p) => !selectedProducts.includes(p._id))
                .map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>

          {/* =========================== */}
          {/* ITEMS */}
          {/* =========================== */}

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 20,
            }}
          >
            <thead>
              <tr>
                <th style={th}>Sản phẩm</th>
                <th style={th}>SL</th>
                <th style={th}>Giá nhập</th>
                <th style={th}>Thành tiền</th>
                <th style={th}></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td style={td}>{item.name}</td>

                  <td style={td}>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Number(e.target.value))
                      }
                      style={{
                        width: 70,
                      }}
                    />
                  </td>

                  <td style={td}>
                    <input
                      type="number"
                      min={0}
                      value={item.cost_price}
                      onChange={(e) =>
                        updateItem(index, "cost_price", Number(e.target.value))
                      }
                      style={{
                        width: 120,
                      }}
                    />
                  </td>

                  <td style={td}>
                    {(
                      Number(item.quantity) * Number(item.cost_price)
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </td>

                  <td style={td}>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* =========================== */}
          {/* NOTE */}
          {/* =========================== */}

          <div style={{ marginBottom: 20 }}>
            <label>Ghi chú</label>

            <textarea
              rows={3}
              name="note"
              value={form.note}
              onChange={handleChange}
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />
          </div>

          {/* =========================== */}
          {/* TOTAL */}
          {/* =========================== */}

          <h3
            style={{
              textAlign: "right",
              color: "#2563eb",
            }}
          >
            Tổng tiền: {total.toLocaleString("vi-VN")} đ
          </h3>

          {/* =========================== */}
          {/* BUTTON */}
          {/* =========================== */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 25,
            }}
          >
            <button type="button" onClick={onClose} style={cancelButton}>
              Hủy
            </button>

            <button type="submit" style={saveButton}>
              {isEditing ? "Cập nhật" : "Lưu Phiếu nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const th = {
  borderBottom: "1px solid #ddd",
  padding: 10,
  textAlign: "left",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: 10,
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
  marginTop: 6,
  boxSizing: "border-box",
};

const cancelButton = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "1px solid #ddd",
  cursor: "pointer",
};

const saveButton = {
  padding: "10px 18px",
  borderRadius: 8,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
