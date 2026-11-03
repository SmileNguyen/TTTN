import React, { useEffect, useState } from "react";

const defaultData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  tax_code: "",
  contact_person: "",
  bank_name: "",
  bank_account: "",
  note: "",
  status: "Active",
};

export default function SupplierModal({
  isOpen,
  onClose,
  onSave,
  supplier,
  isEditing,
}) {
  const [form, setForm] = useState(defaultData);

  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        address: supplier.address || "",
        tax_code: supplier.tax_code || "",
        contact_person: supplier.contact_person || "",
        bank_name: supplier.bank_name || "",
        bank_account: supplier.bank_account || "",
        note: supplier.note || "",
        status: supplier.status || "Active",
      });
    } else {
      setForm(defaultData);
    }
  }, [supplier]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Vui lòng nhập tên nhà cung cấp.");
      return;
    }

    onSave(form);
  }

  if (!isOpen) return null;

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
          width: 700,
          maxWidth: "95%",
          background: "#fff",
          borderRadius: 12,
          padding: 25,
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          {isEditing
            ? "✏️ Cập nhật Nhà cung cấp"
            : "➕ Thêm Nhà cung cấp"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 15,
            }}
          >
            <Input
              label="Tên nhà cung cấp *"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Người liên hệ"
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
            />

            <Input
              label="Mã số thuế"
              name="tax_code"
              value={form.tax_code}
              onChange={handleChange}
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Active">Hoạt động</option>
              <option value="Inactive">Ngừng hoạt động</option>
            </select>

            <Input
              label="Ngân hàng"
              name="bank_name"
              value={form.bank_name}
              onChange={handleChange}
            />

            <Input
              label="Số tài khoản"
              name="bank_account"
              value={form.bank_account}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: 15 }}>
            <label>Địa chỉ</label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              style={{
                ...inputStyle,
                width: "100%",
                resize: "none",
              }}
            />
          </div>

          <div style={{ marginTop: 15 }}>
            <label>Ghi chú</label>

            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={3}
              style={{
                ...inputStyle,
                width: "100%",
                resize: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 25,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              Hủy
            </button>

            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {isEditing ? "Cập nhật" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label>{label}</label>

      <input
        {...props}
        style={{
          ...inputStyle,
          width: "100%",
        }}
      />
    </div>
  );
}

const inputStyle = {
  marginTop: 6,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
  outline: "none",
  boxSizing: "border-box",
};