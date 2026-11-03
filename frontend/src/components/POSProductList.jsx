import React from "react";
import { getImageUrl } from "../services/api";

export default function POSProductList({ products, onAdd, formatPrice }) {
  if (!products.length) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 40,
          textAlign: "center",
          color: "#777",
          marginTop: 20,
        }}
      >
        Không có sản phẩm.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
        gap: 20,
        marginTop: 20,
      }}
    >
      {products.map((product) => {
        const image = product.image ? getImageUrl(product.image) : "";

        return (
          <div
            key={product._id}
            style={{
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
              transition: "all .2s ease",
            }}
          >
            <div
              style={{
                height: 180,
                background: "#f4f4f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={product.name || "Product"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: "#999",
                  }}
                >
                  No Image
                </span>
              )}
            </div>

            <div
              style={{
                padding: 15,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                }}
              >
                {product.name || "Không có tên"}
              </h3>

              <p
                style={{
                  color: "#666",
                  marginTop: 6,
                  marginBottom: 10,
                }}
              >
                {product.category?.name || "-"}
              </p>

              <div
                style={{
                  fontWeight: "bold",
                  color: "#2563eb",
                  fontSize: 18,
                }}
              >
                {formatPrice(product.sale_price || 0)}
              </div>

              <div
                style={{
                  marginTop: 10,
                  marginBottom: 15,
                  color:
                    product.stock > 10
                      ? "#16a34a"
                      : product.stock > 0
                      ? "#d97706"
                      : "#dc2626",
                  fontWeight: "bold",
                }}
              >
                {product.stock > 0 ? `Tồn kho: ${product.stock}` : "Hết hàng"}
              </div>

              <button
                onClick={() => onAdd(product)}
                disabled={product.stock <= 0}
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                  border: "none",
                  borderRadius: 8,
                  cursor: product.stock > 0 ? "pointer" : "not-allowed",
                  background: product.stock > 0 ? "#2563eb" : "#d1d5db",
                  color: "#fff",
                  fontWeight: "bold",
                  transition: ".2s",
                }}
              >
                {product.stock > 0 ? "➕ Thêm vào giỏ" : "Hết hàng"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
