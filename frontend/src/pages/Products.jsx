import React, { useEffect, useMemo, useState } from "react";

import ProductModal from "../components/ProductModal";
import ProductToolbar from "../components/ProductToolbar";
import ProductTable from "../components/ProductTable";

import API_URL, {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // ==========================
  // Load Products
  // ==========================
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      console.error(err);

      alert("Không thể tải danh sách sản phẩm");
    }
  }

  // ==========================
  // Add
  // ==========================
  function handleAdd() {
    setEditingProduct(null);

    setIsEditing(false);

    setOpenModal(true);
  }

  // ==========================
  // Edit
  // ==========================
  function handleEdit(product) {
    setEditingProduct(product);

    setIsEditing(true);

    setOpenModal(true);
  }

  // ==========================
  // Save
  // ==========================
  async function handleSave(product) {
    try {
      if (isEditing) {
        await updateProduct(editingProduct._id, product);

        alert("✅ Cập nhật thành công");
      } else {
        await createProduct(product);

        alert("✅ Thêm sản phẩm thành công");
      }

      setOpenModal(false);

      setEditingProduct(null);

      setIsEditing(false);

      await loadProducts();
    } catch (err) {
      console.error(err);

      alert("❌ Không thể lưu sản phẩm");
    }
  }

  // ==========================
  // Delete
  // ==========================
  async function handleDelete(id) {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm?")) return;

    try {
      await deleteProduct(id);

      await loadProducts();

      alert("✅ Đã xóa sản phẩm");
    } catch (err) {
      console.error(err);

      alert("❌ Không thể xóa sản phẩm");
    }
  }

  // ==========================
  // Search
  // ==========================
  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.name?.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [products, keyword]);

  // ==========================
  // Format Price
  // ==========================
  function formatPrice(price) {
    return Number(price || 0).toLocaleString("vi-VN") + " đ";
  }

  return (
    <div style={{ padding: 25 }}>
      <h1
        style={{
          marginBottom: 25,
        }}
      >
        📦 Quản lý sản phẩm
      </h1>

      <ProductToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        onAdd={handleAdd}
      />

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        formatPrice={formatPrice}
        apiBase={API_URL}
      />

      <div
        style={{
          marginTop: 20,
          color: "#666",
        }}
      >
        Tổng số sản phẩm : <strong>{filteredProducts.length}</strong>
      </div>

      <ProductModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);

          setEditingProduct(null);

          setIsEditing(false);
        }}
        onSave={handleSave}
        product={editingProduct}
        isEditing={isEditing}
      />
    </div>
  );
}
