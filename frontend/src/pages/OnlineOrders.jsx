import React, { useEffect, useMemo, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/api";

const money = (value) => Number(value || 0).toLocaleString("vi-VN") + " ₫";
const statusText = {
  Pending: "Chờ xác nhận",
  Confirmed: "Đã xác nhận",
  Shipping: "Đang giao",
  Completed: "Hoàn tất",
  Cancelled: "Đã hủy",
};

export default function OnlineOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  async function loadOrders() {
    setLoading(true);
    setError("");
    try {
      const data = await getOrders();
      setOrders((Array.isArray(data) ? data : []).filter((order) => order.source === "Online"));
    } catch (err) {
      setError(err.message || "Không thể tải đơn hàng online");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadOrders(); }, []);

  const filtered = useMemo(() => orders.filter((order) => {
    const term = keyword.trim().toLocaleLowerCase("vi");
    const matchesText = !term || [order.invoice_code, order.customer_name, order.customer_phone]
      .some((value) => String(value || "").toLocaleLowerCase("vi").includes(term));
    const matchesStatus = filter === "all" || order.status === filter;
    return matchesText && matchesStatus;
  }), [orders, keyword, filter]);

  async function confirmOrder(order) {
    if (!window.confirm(`Xác nhận đơn hàng ${order.invoice_code}?`)) return;
    setBusyId(order._id);
    setError("");
    try {
      await updateOrderStatus(order._id, "Confirmed");
      await loadOrders();
      setSelected((current) => current?._id === order._id
        ? { ...current, status: "Confirmed" } : current);
    } catch (err) {
      setError(err.message || "Không thể xác nhận đơn hàng");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, color: "#172033" }}>🌐 Đơn hàng Online</h1>
          <p style={{ color: "#64748b", margin: "8px 0 0" }}>Theo dõi, xem thông tin và xác nhận đơn khách đặt trên website.</p>
        </div>
        <button onClick={loadOrders} style={buttonStyle("#2563eb")} disabled={loading}>↻ Làm mới</button>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
        <div style={statStyle}><small>Tổng đơn online</small><strong>{orders.length}</strong></div>
        <div style={statStyle}><small>Chờ xác nhận</small><strong style={{ color: "#d97706" }}>{orders.filter((o) => o.status === "Pending").length}</strong></div>
        <div style={statStyle}><small>Đã xác nhận</small><strong style={{ color: "#15803d" }}>{orders.filter((o) => o.status === "Confirmed").length}</strong></div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm mã đơn, tên hoặc số điện thoại..." style={inputStyle} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={inputStyle}>
          <option value="all">Tất cả trạng thái</option>
          <option value="Pending">Chờ xác nhận</option>
          <option value="Confirmed">Đã xác nhận</option>
          <option value="Shipping">Đang giao</option>
          <option value="Completed">Hoàn tất</option>
          <option value="Cancelled">Đã hủy</option>
        </select>
      </div>

      {error && <div style={{ padding: 12, background: "#fef2f2", color: "#b91c1c", borderRadius: 8, marginBottom: 12 }}>{error}</div>}

      <div style={{ background: "#fff", borderRadius: 12, overflowX: "auto", boxShadow: "0 2px 10px rgba(15,23,42,.06)" }}>
        <table style={{ width: "100%", minWidth: 850, borderCollapse: "collapse" }}>
          <thead style={{ background: "#1e293b", color: "#fff" }}>
            <tr>{["Mã đơn", "Khách hàng", "Số điện thoại", "Ngày đặt", "Tổng tiền", "Trạng thái", "Thao tác"].map((label) => <th key={label} style={{ padding: 13, textAlign: "left" }}>{label}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7} style={emptyCell}>Đang tải đơn hàng...</td></tr>
              : filtered.length === 0 ? <tr><td colSpan={7} style={emptyCell}>Chưa có đơn hàng online phù hợp.</td></tr>
              : filtered.map((order) => <tr key={order._id} style={{ borderBottom: "1px solid #edf0f4" }}>
                <td style={cellStyle}><b>{order.invoice_code}</b></td>
                <td style={cellStyle}>{order.customer_name}</td>
                <td style={cellStyle}>{order.customer_phone || "—"}</td>
                <td style={cellStyle}>{new Date(order.createdAt).toLocaleString("vi-VN")}</td>
                <td style={{ ...cellStyle, fontWeight: 800, color: "#1d4ed8" }}>{money(order.total)}</td>
                <td style={cellStyle}><span style={statusStyle(order.status)}>{statusText[order.status] || order.status}</span></td>
                <td style={cellStyle}>
                  <button onClick={() => setSelected(order)} style={{ ...buttonStyle("#475569"), marginRight: 6 }}>Chi tiết</button>
                  {order.status === "Pending" && <button disabled={busyId === order._id} onClick={() => confirmOrder(order)} style={buttonStyle("#15803d")}>{busyId === order._id ? "Đang xử lý..." : "Xác nhận"}</button>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

      {selected && <div onClick={() => setSelected(null)} style={overlayStyle}>
        <section onClick={(e) => e.stopPropagation()} style={modalStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <h2 style={{ margin: 0 }}>Chi tiết đơn hàng</h2>
            <button onClick={() => setSelected(null)} style={{ border: 0, background: "transparent", fontSize: 25, cursor: "pointer" }}>×</button>
          </div>
          <p><b>Mã đơn:</b> {selected.invoice_code}</p>
          <p><b>Thời gian:</b> {new Date(selected.createdAt).toLocaleString("vi-VN")}</p>
          <p><b>Trạng thái:</b> {statusText[selected.status] || selected.status}</p>
          <hr />
          <h3>Thông tin người nhận</h3>
          <p><b>Họ tên:</b> {selected.customer_name}</p>
          <p><b>Số điện thoại:</b> {selected.customer_phone || "—"}</p>
          <p><b>Email:</b> {selected.customer_email || "—"}</p>
          <p><b>Địa chỉ:</b> {selected.shipping_address || "—"}</p>
          <p><b>Ghi chú:</b> {selected.note || "Không có"}</p>
          <hr />
          <h3>Sản phẩm đặt mua</h3>
          <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
            <thead><tr style={{ background: "#f1f5f9" }}><th style={cellStyle}>Sản phẩm</th><th style={cellStyle}>SL</th><th style={cellStyle}>Đơn giá</th><th style={cellStyle}>Thành tiền</th></tr></thead>
            <tbody>{(selected.items || []).map((item, index) => <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}><td style={cellStyle}>{item.product_name}<small style={{ display: "block", color: "#64748b" }}>{item.sku}</small></td><td style={cellStyle}>{item.quantity}</td><td style={cellStyle}>{money(item.price)}</td><td style={cellStyle}>{money(item.total)}</td></tr>)}</tbody>
          </table></div>
          <div style={{ textAlign: "right", marginTop: 18 }}>
            <p>Tạm tính: <b>{money(selected.subtotal)}</b></p>
            <p>Giảm giá: <b>{money(selected.discount)}</b></p>
            <h2 style={{ color: "#1d4ed8" }}>Tổng tiền: {money(selected.total)}</h2>
            <p>Thanh toán: {selected.payment_method || "COD"}</p>
          </div>
          {selected.status === "Pending" && <button disabled={busyId === selected._id} onClick={() => confirmOrder(selected)} style={{ ...buttonStyle("#15803d"), width: "100%", padding: 12 }}>{busyId === selected._id ? "Đang xác nhận..." : "✓ Xác nhận đơn hàng"}</button>}
        </section>
      </div>}
    </div>
  );
}

const buttonStyle = (background) => ({ background, color: "#fff", border: 0, borderRadius: 7, padding: "8px 12px", fontWeight: 700, cursor: "pointer" });
const inputStyle = { minWidth: 230, padding: 11, border: "1px solid #cbd5e1", borderRadius: 8, background: "#fff" };
const statStyle = { minWidth: 150, background: "#fff", borderRadius: 10, padding: "14px 18px", boxShadow: "0 2px 8px rgba(15,23,42,.05)", display: "flex", flexDirection: "column", gap: 7 };
const cellStyle = { padding: 12, textAlign: "left", verticalAlign: "middle", fontSize: 13 };
const emptyCell = { padding: 40, textAlign: "center", color: "#64748b" };
const overlayStyle = { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,.58)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 };
const modalStyle = { width: "min(760px, 100%)", maxHeight: "90vh", overflowY: "auto", background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,.25)" };
const statusStyle = (status) => ({ display: "inline-block", borderRadius: 20, padding: "5px 9px", fontSize: 11, fontWeight: 800, background: status === "Pending" ? "#fef3c7" : status === "Confirmed" ? "#dcfce7" : "#e2e8f0", color: status === "Pending" ? "#92400e" : status === "Confirmed" ? "#166534" : "#334155" });
