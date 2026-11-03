import React, { useEffect, useMemo, useState } from "react";

import CustomerToolbar from "../components/CustomerToolbar";
import CustomerTable from "../components/CustomerTable";
import CustomerModal from "../components/CustomerModal";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/api";

export default function Customers() {
  // ============================
  // DATA
  // ============================

  const [customers, setCustomers] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // ============================
  // LOAD
  // ============================

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();

      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      alert("Không thể tải danh sách khách hàng");
    }
  }

  // ============================
  // ADD
  // ============================

  function handleAdd() {
    setEditingCustomer(null);

    setIsEditing(false);

    setOpenModal(true);
  }

  // ============================
  // EDIT
  // ============================

  function handleEdit(customer) {
    setEditingCustomer(customer);

    setIsEditing(true);

    setOpenModal(true);
  }

  // ============================
  // SAVE
  // ============================

  async function handleSave(customer) {
    try {
      if (isEditing) {
        await updateCustomer(editingCustomer._id, customer);

        alert("Cập nhật thành công");
      } else {
        await createCustomer(customer);

        alert("Thêm khách hàng thành công");
      }

      setOpenModal(false);

      setEditingCustomer(null);

      setIsEditing(false);

      await loadCustomers();
    } catch (err) {
      console.error(err);

      alert(err.message);
    }
  }

  // ============================
  // DELETE
  // ============================

  async function handleDelete(id) {
    const ok = window.confirm("Bạn có chắc muốn xóa khách hàng này?");

    if (!ok) return;

    try {
      await deleteCustomer(id);

      await loadCustomers();

      alert("Đã xóa khách hàng");
    } catch (err) {
      console.error(err);

      alert(err.message);
    }
  }

  // ============================
  // SEARCH
  // ============================

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      return (
        (customer.full_name || "")
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||
        (customer.phone || "").toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }, [customers, keyword]);

  // ============================
  // UI
  // ============================

  return (
    <div style={{ padding: 25 }}>
      <h1 style={{ marginBottom: 25 }}>👤 Quản lý khách hàng</h1>

      <CustomerToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        onAdd={handleAdd}
      />

      <CustomerTable
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div
        style={{
          marginTop: 20,
          color: "#666",
        }}
      >
        Tổng số khách hàng:
        <strong> {filteredCustomers.length}</strong>
      </div>

      <CustomerModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);

          setEditingCustomer(null);

          setIsEditing(false);
        }}
        onSave={handleSave}
        customer={editingCustomer}
        isEditing={isEditing}
      />
    </div>
  );
}
