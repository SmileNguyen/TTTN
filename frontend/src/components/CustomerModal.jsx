import React, { useEffect, useState } from "react";

const emptyCustomer = {
  full_name: "",
  phone: "",
  email: "",
  address: "",
  birthday: "",
  gender: "Khác",
  note: "",
};

export default function CustomerModal({
  isOpen,
  onClose,
  onSave,
  customer,
  isEditing,
}) {
  const [formData, setFormData] = useState(emptyCustomer);

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing && customer) {
      setFormData({
        full_name: customer.full_name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || "",
        birthday: customer.birthday ? customer.birthday.substring(0, 10) : "",
        gender: customer.gender || "Khác",
        note: customer.note || "",
      });
    } else {
      setFormData(emptyCustomer);
    }
  }, [isOpen, customer, isEditing]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (!formData.full_name.trim()) {
      alert("Vui lòng nhập họ tên.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Email không hợp lệ.");
      return;
    }

    onSave(formData);
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
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 650,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 12,
          padding: 25,
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          {isEditing ? "✏️ Chỉnh sửa khách hàng" : "➕ Thêm khách hàng"}
        </h2>

        <label>Họ và tên *</label>
        <input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Số điện thoại *</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Địa chỉ</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Ngày sinh</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Giới tính</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>

        <label>Ghi chú</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: 120,
            resize: "vertical",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 25,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
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
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isEditing ? "💾 Cập nhật" : "➕ Lưu khách hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxSizing: "border-box",
};
