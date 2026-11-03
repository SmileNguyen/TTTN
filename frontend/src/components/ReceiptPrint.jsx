import React from "react";

export default function ReceiptPrint({ order }) {
  if (!order) return null;

  function money(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " đ";
  }

  function printReceipt() {
    window.print();
  }

  return (
    <div
      id="receipt-print"
      style={{
        background: "#fff",
        width: 360,
        margin: "20px auto",
        padding: 20,
        fontFamily: "monospace",
        color: "#000",
        border: "1px solid #ddd",
      }}
    >
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          🛒 POS SYSTEM
        </h2>

        <div>CỬA HÀNG BÁN LẺ</div>

        <div>Địa chỉ: 123 ABC - TP.HCM</div>

        <div>Hotline: 0123 456 789</div>

        <hr />
      </div>

      {/* ========================= */}
      {/* INFO */}
      {/* ========================= */}

      <div>
        <p>
          <b>Mã HĐ:</b> {order.invoice_code}
        </p>

        <p>
          <b>Ngày:</b> {new Date(order.createdAt).toLocaleString("vi-VN")}
        </p>

        <p>
          <b>Khách:</b> {order.customer_name}
        </p>

        <p>
          <b>Thu ngân:</b> {order.employee_name}
        </p>

        <p>
          <b>Thanh toán:</b> {order.payment_method}
        </p>
      </div>

      <hr />

      {/* ========================= */}
      {/* PRODUCT */}
      {/* ========================= */}

      <table
        style={{
          width: "100%",
          fontSize: 13,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Tên</th>
            <th align="center">SL</th>
            <th align="right">Giá</th>
            <th align="right">TT</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.product_name}</td>

              <td align="center">{item.quantity}</td>

              <td align="right">{money(item.price)}</td>

              <td align="right">{money(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* ========================= */}
      {/* TOTAL */}
      {/* ========================= */}

      <table
        style={{
          width: "100%",
          fontSize: 14,
        }}
      >
        <tbody>
          <tr>
            <td>Tạm tính</td>

            <td align="right">{money(order.subtotal)}</td>
          </tr>

          <tr>
            <td>Giảm giá</td>

            <td align="right">{money(order.discount)}</td>
          </tr>

          <tr>
            <td>
              <b>Tổng cộng</b>
            </td>

            <td
              align="right"
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {money(order.total)}
            </td>
          </tr>

          <tr>
            <td>Khách đưa</td>

            <td align="right">{money(order.paid)}</td>
          </tr>

          <tr>
            <td>Tiền thừa</td>

            <td align="right">{money(order.change)}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <div
        style={{
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <h4
          style={{
            margin: 0,
          }}
        >
          ❤️ Cảm ơn Quý khách ❤️
        </h4>

        <div>Hẹn gặp lại!</div>

        <div
          style={{
            marginTop: 15,
            fontSize: 12,
            color: "#555",
          }}
        >
          Powered by React POS System
        </div>
      </div>

      {/* ========================= */}
      {/* BUTTON */}
      {/* ========================= */}

      <div
        style={{
          marginTop: 25,
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={printReceipt}
          style={{
            flex: 1,
            padding: 12,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          🖨 In hóa đơn
        </button>
      </div>
    </div>
  );
}
