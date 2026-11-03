import React, { useEffect, useMemo, useState } from "react";

import CategoryModal from "../components/CategoryModal";
import CategoryToolbar from "../components/CategoryToolbar";
import CategoryTable from "../components/CategoryTable";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  seedCategories,
} from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // ===========================
  // Load Categories
  // ===========================
  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);

      alert("Không thể tải danh mục.");
    }
  }

  // ===========================
  // Save
  // ===========================
  async function handleSave(category) {
    try {
      if (isEditing) {
        await updateCategory(editingCategory._id, category);

        alert("✅ Cập nhật danh mục thành công!");
      } else {
        await createCategory(category);

        alert("✅ Thêm danh mục thành công!");
      }

      await loadCategories();

      setOpenModal(false);

      setEditingCategory(null);

      setIsEditing(false);
    } catch (err) {
      console.error(err);

      alert("❌ Không thể lưu danh mục.");
    }
  }

  // ===========================
  // Edit
  // ===========================
  function handleEdit(category) {
    setEditingCategory(category);

    setIsEditing(true);

    setOpenModal(true);
  }

  // ===========================
  // Add
  // ===========================
  function handleAdd() {
    setEditingCategory(null);

    setIsEditing(false);

    setOpenModal(true);
  }

  // ===========================
  // Delete
  // ===========================
  async function handleDelete(id) {
    const ok = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");

    if (!ok) return;

    try {
      await deleteCategory(id);

      await loadCategories();

      alert("✅ Đã xóa danh mục.");
    } catch (err) {
      console.error(err);

      alert("❌ Không thể xóa.");
    }
  }

  // ===========================
  // Seed
  // ===========================
  async function handleSeed() {
    const ok = window.confirm("Khởi tạo 27 danh mục mặc định?");

    if (!ok) return;

    try {
      const result = await seedCategories();

      alert(`✅ Hoàn tất.\nĐã tạo thêm ${result.created} danh mục.`);

      await loadCategories();
    } catch (err) {
      console.error(err);

      alert("❌ Không thể khởi tạo.");
    }
  }

  // ===========================
  // Search
  // ===========================
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      return (
        (c.name || "").toLowerCase().includes(keyword.toLowerCase()) ||
        (c.code || "").toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }, [categories, keyword]);

  return (
    <div style={{ padding: "25px" }}>
      <h1 style={{ marginBottom: "25px" }}>📂 Quản lý danh mục</h1>

      <CategoryToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        onAdd={handleAdd}
        onSeed={handleSeed}
        onRefresh={loadCategories}
      />

      <CategoryTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div
        style={{
          marginTop: "20px",
          color: "#666",
        }}
      >
        Tổng số danh mục:
        <strong> {filteredCategories.length}</strong>
      </div>

      <CategoryModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);

          setEditingCategory(null);

          setIsEditing(false);
        }}
        onSave={handleSave}
        category={editingCategory}
        isEditing={isEditing}
      />
    </div>
  );
}
