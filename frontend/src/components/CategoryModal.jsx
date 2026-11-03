import React, { useEffect, useState } from "react";

const emptyCategory = {
  name: "",
  code: "",
  description: "",
  status: true,
  sortOrder: 0,
};

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
  isEditing,
}) {
  const [formData, setFormData] = useState(emptyCategory);

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing && category) {
      setFormData({
        name: category.name || "",
        code: category.code || "",
        description: category.description || "",
        status: category.status ?? true,
        sortOrder: category.sortOrder || 0,
      });
    } else {
      setFormData(emptyCategory);
    }
  }, [isOpen, isEditing, category]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit() {
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên danh mục.");
      return;
    }

    if (!formData.code.trim()) {
      alert("Vui lòng nhập mã danh mục.");
      return;
    }

    onSave({
      ...formData,
      sortOrder: Number(formData.sortOrder || 0),
    });
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 20 }}>
          {isEditing ? "✏️ Chỉnh sửa danh mục" : "➕ Thêm danh mục"}
        </h2>

        <label>Tên danh mục</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Mã danh mục</label>
        <input
          name="code"
          value={formData.code}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: 100,
            resize: "vertical",
          }}
        />

        <label>Thứ tự hiển thị</label>
        <input
          type="number"
          name="sortOrder"
          value={formData.sortOrder}
          onChange={handleChange}
          style={inputStyle}
        />

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Đang sử dụng
        </label>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 30,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isEditing ? "Cập nhật" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  width: 600,
  background: "#fff",
  borderRadius: 12,
  padding: 25,
  boxShadow: "0 10px 30px rgba(0,0,0,.2)",
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 5,
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ddd",
  boxSizing: "border-box",
};
