import React, { useEffect, useState } from "react";

import SupplierToolbar from "../components/SupplierToolbar";
import SupplierTable from "../components/SupplierTable";
import SupplierModal from "../components/SupplierModal";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/api";

export default function Suppliers() {
  // ==========================
  // DATA
  // ==========================
  const [suppliers, setSuppliers] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================
  // MODAL
  // ==========================
  const [isOpen, setIsOpen] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState(null);

  // ==========================
  // LOAD
  // ==========================
  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers(search = "") {
    try {
      setLoading(true);

      const data = await getSuppliers(search);

      setSuppliers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // SEARCH
  // ==========================
  async function handleSearch() {
    await loadSuppliers(keyword);
  }

  // ==========================
  // ADD
  // ==========================
  function handleAdd() {
    setEditingSupplier(null);

    setIsOpen(true);
  }

  // ==========================
  // EDIT
  // ==========================
  function handleEdit(supplier) {
    setEditingSupplier(supplier);

    setIsOpen(true);
  }

  // ==========================
  // SAVE
  // ==========================
  async function handleSave(data) {
    try {
      if (editingSupplier) {
        await updateSupplier(editingSupplier._id, data);
      } else {
        await createSupplier(data);
      }

      setIsOpen(false);

      loadSuppliers(keyword);
    } catch (err) {
      console.error(err);

      alert(err.message || "Lưu thất bại");
    }
  }

  // ==========================
  // DELETE
  // ==========================
  async function handleDelete(supplier) {
    const ok = window.confirm(`Bạn có muốn xóa "${supplier.name}" ?`);

    if (!ok) return;

    try {
      await deleteSupplier(supplier._id);

      loadSuppliers(keyword);
    } catch (err) {
      console.error(err);

      alert(err.message || "Không thể xóa");
    }
  }

  // ==========================
  // UI
  // ==========================
  return (
    <div style={{ padding: 25 }}>
      <h1 style={{ marginBottom: 20 }}>🏭 Quản lý Nhà cung cấp</h1>

      <SupplierToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
        onAdd={handleAdd}
      />

      <SupplierTable
        suppliers={suppliers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SupplierModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        supplier={editingSupplier}
        isEditing={!!editingSupplier}
      />
    </div>
  );
}
