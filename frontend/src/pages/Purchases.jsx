import React, { useEffect, useState } from "react";

import PurchaseToolbar from "../components/PurchaseToolbar";
import PurchaseTable from "../components/PurchaseTable";
import PurchaseModal from "../components/PurchaseModal";

import {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  receivePurchase,
} from "../services/api";

export default function Purchases() {
  // ==========================
  // DATA
  // ==========================

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  // ==========================
  // MODAL
  // ==========================

  const [isOpen, setIsOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);

  // ==========================
  // LOAD
  // ==========================

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases(search = "") {
    try {
      setLoading(true);

      const data = await getPurchases(search);

      setPurchases(Array.isArray(data) ? data : []);
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
    await loadPurchases(keyword);
  }

  // ==========================
  // ADD
  // ==========================

  function handleAdd() {
    setEditingPurchase(null);
    setIsOpen(true);
  }

  // ==========================
  // VIEW
  // ==========================

  function handleView(purchase) {
    setEditingPurchase(purchase);
    setIsOpen(true);
  }

  // ==========================
  // EDIT
  // ==========================

  function handleEdit(purchase) {
    if (purchase.status === "Received") {
      alert("Phiếu đã nhập kho không thể chỉnh sửa.");
      return;
    }

    setEditingPurchase(purchase);
    setIsOpen(true);
  }

  // ==========================
  // SAVE
  // ==========================

  async function handleSave(data) {
    try {
      if (editingPurchase) {
        await updatePurchase(editingPurchase._id, data);
      } else {
        await createPurchase(data);
      }

      setIsOpen(false);
      setEditingPurchase(null);

      await loadPurchases(keyword);
    } catch (err) {
      console.error(err);
      alert(err.message || "Lưu thất bại");
    }
  }

  // ==========================
  // DELETE
  // ==========================

  async function handleDelete(purchase) {
    const ok = window.confirm(
      `Bạn có muốn xóa phiếu ${purchase.purchase_code} ?`
    );

    if (!ok) return;

    try {
      await deletePurchase(purchase._id);

      await loadPurchases(keyword);
    } catch (err) {
      console.error(err);

      alert(err.message || "Không thể xóa");
    }
  }

  // ==========================
  // RECEIVE
  // ==========================

  async function handleReceive(purchase) {
    if (purchase.status === "Received") {
      alert("Phiếu này đã nhập kho.");
      return;
    }

    const ok = window.confirm(
      `Xác nhận nhập kho phiếu ${purchase.purchase_code}?`
    );

    if (!ok) return;

    try {
      await receivePurchase(purchase._id);

      await loadPurchases(keyword);

      alert("Nhập kho thành công.");
    } catch (err) {
      console.error(err);

      alert(err.message || "Không thể nhập kho");
    }
  }

  // ==========================
  // UI
  // ==========================

  return (
    <div style={{ padding: 25 }}>
      <h1 style={{ marginBottom: 20 }}>📥 Quản lý Phiếu nhập</h1>

      <PurchaseToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
        onAdd={handleAdd}
      />

      <PurchaseTable
        purchases={purchases}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReceive={handleReceive}
      />

      <PurchaseModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingPurchase(null);
        }}
        onSave={handleSave}
        purchase={editingPurchase}
        isEditing={!!editingPurchase}
      />
    </div>
  );
}
