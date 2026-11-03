import React from "react";

export default function POSCart({
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
  formatPrice,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
          }}
        >
          🛒 Giỏ hàng
        </h2>

        <button
          onClick={clearCart}
          disabled={cart.length === 0}
          style={{
            border: "none",
            background: cart.length === 0 ? "#d1d5db" : "#dc2626",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: cart.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Xóa tất cả
        </button>
      </div>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "#777",
          }}
        >
          Chưa có sản phẩm trong giỏ.
        </div>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.name || "Không có tên"}
              </div>

              <div
                style={{
                  color: "#666",
                  fontSize: 14,
                  marginTop: 5,
                }}
              >
                {formatPrice(item.sale_price || 0)}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => decreaseQty(item._id)}
                  style={{
                    width: 32,
                    height: 32,
                    border: "none",
                    borderRadius: 6,
                    background: "#e5e7eb",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  −
                </button>

                <span
                  style={{
                    minWidth: 28,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  disabled={item.quantity >= item.stock}
                  style={{
                    width: 32,
                    height: 32,
                    border: "none",
                    borderRadius: 6,
                    background:
                      item.quantity >= item.stock ? "#d1d5db" : "#2563eb",
                    color: "#fff",
                    cursor:
                      item.quantity >= item.stock ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
                minWidth: 120,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: 10,
                }}
              >
                {formatPrice((item.sale_price || 0) * item.quantity)}
              </div>

              <button
                onClick={() => removeItem(item._id)}
                style={{
                  border: "none",
                  background: "#dc2626",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
