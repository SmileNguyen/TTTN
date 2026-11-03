import React, { useState } from "react";

export default function ProductTable({
  products,
  formatPrice,
  onEdit,
  onDelete,
  apiBase,
}) {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <tr>
              <th style={{ padding: "14px" }}>ID</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>SKU</th>
              <th>Giá bán</th>
              <th>Tồn kho</th>
              <th>Danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#777",
                  }}
                >
                  Chưa có sản phẩm.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const imageUrl = product.image
                  ? `${apiBase}/${product.image}`
                  : null;

                return (
                  <tr
                    key={product._id}
                    style={{
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px",
                        textAlign: "center",
                      }}
                    >
                      {product._id.slice(-6)}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          onClick={() => setPreviewImage(imageUrl)}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 60,
                            height: 60,
                            margin: "auto",
                            borderRadius: 8,
                            background: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#999",
                            fontSize: 12,
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </td>

                    <td>{product.name}</td>

                    <td>{product.sku || "-"}</td>

                    <td>{formatPrice(product.sale_price)}</td>

                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {product.stock}
                    </td>

                    <td>
                      {product.category ? (
                        <>
                          {product.category.icon} {product.category.name}
                        </>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => onEdit(product)}
                        style={{
                          marginRight: 8,
                          background: "#f59e0b",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 12px",
                          cursor: "pointer",
                        }}
                      >
                        Sửa
                      </button>

                      <button
                        onClick={() => onDelete(product._id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 12px",
                          cursor: "pointer",
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 12,
              boxShadow: "0 0 20px rgba(255,255,255,.2)",
            }}
          />
        </div>
      )}
    </>
  );
}
