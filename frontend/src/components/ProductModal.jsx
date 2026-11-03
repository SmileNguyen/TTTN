import React, { useEffect, useState } from "react";

import { getCategories, getImageUrl } from "../services/api";

const emptyProduct = {
  name: "",
  sku: "",
  barcode: "",
  category: "",
  cost_price: "",
  sale_price: "",
  stock: "",
  image: null,
  description: "",
  status: true,
};

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
  isEditing,
}) {
  const [formData, setFormData] = useState(emptyProduct);

  const [categories, setCategories] = useState([]);

  const [preview, setPreview] = useState("");

  // =====================================
  // Load Categories
  // =====================================
  useEffect(() => {
    if (!isOpen) return;

    async function loadCategories() {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, [isOpen]);

  // =====================================
  // Load Product
  // =====================================
  useEffect(() => {
    if (!isOpen) return;

    if (isEditing && product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        barcode: product.barcode || "",

        category: product.category?._id || product.category || "",

        cost_price: product.cost_price || "",
        sale_price: product.sale_price || "",
        stock: product.stock || "",

        image: null,

        description: product.description || "",

        status: product.status === undefined ? true : product.status,
      });

      if (product.image) {
        setPreview(getImageUrl(product.image));
      } else {
        setPreview("");
      }
    } else {
      setFormData(emptyProduct);

      setPreview("");
    }
  }, [isOpen, isEditing, product]);

  if (!isOpen) return null;

  // =====================================
  // Input
  // =====================================
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // =====================================
  // Image
  // =====================================
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,

      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  }

  // =====================================
  // Submit
  // =====================================
  function handleSubmit() {
    if (!formData.name.trim()) {
      alert("Tên sản phẩm không được để trống.");

      return;
    }

    if (!formData.category) {
      alert("Vui lòng chọn danh mục.");

      return;
    }

    onSave({
      ...formData,

      cost_price: Number(formData.cost_price || 0),

      sale_price: Number(formData.sale_price || 0),

      stock: Number(formData.stock || 0),
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,

        background: "rgba(0,0,0,.45)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "760px",

          maxHeight: "90vh",

          overflowY: "auto",

          background: "#fff",

          borderRadius: "12px",

          padding: "25px",

          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          {isEditing ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}
        </h2>
        <label>Tên sản phẩm</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <label>SKU</label>
        <input
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          style={inputStyle}
        />
        <label>Barcode</label>
        <input
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          style={inputStyle}
        />
        <label>Danh mục</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">-- Chọn danh mục --</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.icon} {item.name}
            </option>
          ))}
        </select>{" "}
        <label>Giá nhập</label>
        <input
          type="number"
          name="cost_price"
          value={formData.cost_price}
          onChange={handleChange}
          style={inputStyle}
        />
        <label>Giá bán</label>
        <input
          type="number"
          name="sale_price"
          value={formData.sale_price}
          onChange={handleChange}
          style={inputStyle}
        />
        <label>Tồn kho</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          style={inputStyle}
        />
        <label>Ảnh sản phẩm</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            marginTop: 8,
            marginBottom: 15,
          }}
        />
        {preview && (
          <div
            style={{
              marginBottom: 20,
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                width: 180,
                height: 180,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}
        <label>Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: 120,
            resize: "vertical",
          }}
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
            marginBottom: 20,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Đang kinh doanh
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 25,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 22px",
              border: "none",
              borderRadius: 8,
              background: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {isEditing ? "💾 Cập nhật" : "➕ Thêm sản phẩm"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginTop: "6px",
  marginBottom: "16px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  fontSize: "14px",
};
