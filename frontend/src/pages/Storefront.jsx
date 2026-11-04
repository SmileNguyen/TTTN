import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoreProducts, placeOnlineOrder, storeImageUrl, formatVnd } from "../services/storefront";
import "./Storefront.css";

const CART_KEY = "peko_store_cart";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function Storefront() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(readCart);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("catalog");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    shipping_address: "",
    note: "",
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getStoreProducts()
      .then((data) => { if (active) setProducts(Array.isArray(data) ? data : []); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => {
    const unique = new Map();
    products.forEach((p) => {
      if (p.category?._id) unique.set(p.category._id, p.category.name);
    });
    return Array.from(unique, ([id, name]) => ({ id, name }));
  }, [products]);

  const visibleProducts = useMemo(() => {
    const term = keyword.trim().toLocaleLowerCase("vi");
    return products.filter((p) => {
      const matchText = !term || [p.name, p.sku, p.description]
        .some((v) => String(v || "").toLocaleLowerCase("vi").includes(term));
      const matchCategory = category === "all" || p.category?._id === category;
      return matchText && matchCategory;
    });
  }, [products, keyword, category]);

  const cartItems = useMemo(() => cart.map((item) => {
    const product = products.find((p) => p._id === item.product);
    return product ? { ...item, product } : null;
  }).filter(Boolean), [cart, products]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.product.sale_price * item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.product === product._id);
      if (found) return current.map((item) => item.product === product._id
        ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item);
      return [...current, { product: product._id, quantity: 1 }];
    });
  }

  function changeQuantity(id, quantity) {
    if (quantity < 1) {
      setCart((current) => current.filter((item) => item.product !== id));
      return;
    }
    setCart((current) => current.map((item) => item.product === id
      ? { ...item, quantity: Math.min(Number(quantity), 99) } : item));
  }

  async function submitOrder(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await placeOnlineOrder({
        ...form,
        items: cart.map(({ product, quantity }) => ({ product, quantity })),
      });
      setSuccess(result.order);
      setCart([]);
      setView("success");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="store-page">
      <header className="store-header">
        <Link to="/shop" className="store-brand"><span className="brand-mark">T</span><span>TAI <span className="brand-light">TECH</span><small>LINH KIỆN MÁY TÍNH</small></span></Link>
        <nav className="store-nav">
          <button className={view === "catalog" ? "active" : ""} onClick={() => setView("catalog")}>Cửa hàng</button>
          <button className={view === "cart" ? "active" : ""} onClick={() => setView("cart")}>Giỏ hàng <b>{totalQuantity}</b></button>
        </nav>
        <Link to="/login" className="store-support">Đăng nhập nhân viên</Link>
      </header>

      {view === "catalog" && <>
        <section className="store-hero">
          <div><span className="eyebrow">NÂNG CẤP GÓC MÁY CỦA BẠN</span><h1>Linh kiện chuẩn.<br /><em>Hiệu năng vượt trội.</em></h1><p>Khám phá CPU, GPU, RAM, SSD và nhiều linh kiện máy tính chính hãng.</p><button onClick={() => document.getElementById("product-list")?.scrollIntoView({ behavior: "smooth" })}>Khám phá sản phẩm <span>↘</span></button></div>
          <div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="chip-art"><span>TAI</span><strong>TECH</strong><small>PERFORMANCE</small></div><div className="hero-tag">BUILD YOUR<br />NEXT LEVEL</div></div>
        </section>

        <main className="store-main" id="product-list">
          <div className="section-heading"><div><span className="eyebrow">DANH MỤC CỬA HÀNG</span><h2>Sản phẩm linh kiện</h2></div><span>{visibleProducts.length} sản phẩm</span></div>
          <div className="store-toolbar">
            <div className="store-search"><span>⌕</span><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm tên sản phẩm, mã SKU..." /></div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Tất cả danh mục</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          </div>
          {error && <div className="store-alert">{error}</div>}
          {loading ? <div className="store-empty">Đang tải sản phẩm...</div> : visibleProducts.length === 0 ? <div className="store-empty">Không tìm thấy sản phẩm phù hợp.</div> : (
            <div className="product-grid">
              {visibleProducts.map((p) => <article className="product-card" key={p._id}>
                <div className="product-image">{p.image ? <img src={storeImageUrl(p.image)} alt={p.name} /> : <div className="image-placeholder">TAI<span>TECH</span></div>}<span className={p.stock > 0 ? "stock-badge" : "stock-badge out"}>{p.stock > 0 ? "Còn hàng" : "Hết hàng"}</span></div>
                <div className="product-info"><span className="product-category">{p.category?.name || "Linh kiện"}</span><h3>{p.name}</h3><small>SKU: {p.sku}</small><div className="product-bottom"><strong>{formatVnd(p.sale_price)}</strong><button disabled={p.stock < 1} onClick={() => addToCart(p)} aria-label="Thêm vào giỏ hàng">＋</button></div></div>
              </article>)}
            </div>
          )}
        </main>
      </>}

      {view === "cart" && <main className="store-main checkout-main"><div className="section-heading"><div><span className="eyebrow">ĐƠN HÀNG CỦA BẠN</span><h2>Giỏ hàng</h2></div><button className="text-button" onClick={() => setView("catalog")}>← Tiếp tục mua sắm</button></div>
        {cartItems.length === 0 ? <div className="store-empty">Giỏ hàng đang trống. Hãy chọn vài linh kiện bạn cần nhé!</div> : <div className="cart-layout"><div className="cart-list">{cartItems.map((item) => <div className="cart-row" key={item.product}><div className="cart-thumb">{item.product.image ? <img src={storeImageUrl(item.product.image)} alt="" /> : "P"}</div><div className="cart-product"><b>{item.product.name}</b><small>{formatVnd(item.product.sale_price)}</small></div><div className="quantity-control"><button onClick={() => changeQuantity(item.product, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product, item.quantity + 1)}>＋</button></div><strong>{formatVnd(item.product.sale_price * item.quantity)}</strong><button className="remove-item" onClick={() => changeQuantity(item.product, 0)}>×</button></div>)}</div><aside className="cart-summary"><h3>Tóm tắt đơn hàng</h3><div><span>Tạm tính</span><b>{formatVnd(total)}</b></div><div><span>Phí vận chuyển</span><b>Được xác nhận sau</b></div><hr /><div className="summary-total"><span>Tổng cộng</span><strong>{formatVnd(total)}</strong></div><button className="primary-button" onClick={() => { setError(""); setView("checkout"); }}>Tiến hành đặt hàng</button><small>Thanh toán khi nhận hàng (COD)</small></aside></div>}
      </main>}

      {view === "checkout" && <main className="store-main checkout-main"><div className="section-heading"><div><span className="eyebrow">HOÀN TẤT MUA SẮM</span><h2>Thông tin đặt hàng</h2></div><button className="text-button" onClick={() => setView("cart")}>← Quay lại giỏ hàng</button></div>
        {error && <div className="store-alert">{error}</div>}
        <div className="cart-layout"><form className="checkout-form" onSubmit={submitOrder}><h3>Thông tin người nhận</h3><label>Họ và tên *<input required maxLength="100" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /></label><div className="form-two"><label>Số điện thoại *<input required type="tel" maxLength="20" value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} /></label><label>Email<input type="email" maxLength="120" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} /></label></div><label>Địa chỉ nhận hàng *<textarea required rows="3" maxLength="500" value={form.shipping_address} onChange={(e) => setForm({ ...form, shipping_address: e.target.value })} /></label><label>Ghi chú<textarea rows="2" maxLength="500" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label><button className="primary-button" disabled={submitting || cartItems.length === 0}>{submitting ? "Đang gửi đơn..." : "Xác nhận đặt hàng"}</button></form><aside className="cart-summary"><h3>Đơn hàng ({totalQuantity} sản phẩm)</h3>{cartItems.map((item) => <div className="order-mini" key={item.product}><span>{item.product.name} × {item.quantity}</span><b>{formatVnd(item.product.sale_price * item.quantity)}</b></div>)}<hr /><div className="summary-total"><span>Tổng thanh toán</span><strong>{formatVnd(total)}</strong></div><small>Phương thức: Thanh toán khi nhận hàng (COD)</small></aside></div>
      </main>}

      {view === "success" && success && <main className="store-main success-panel"><div className="success-icon">✓</div><span className="eyebrow">ĐẶT HÀNG THÀNH CÔNG</span><h2>Cảm ơn bạn đã mua hàng!</h2><p>Đơn hàng <b>{success.invoice_code}</b> đã được ghi nhận.</p><p>Tổng giá trị: <strong>{formatVnd(success.total)}</strong></p><p>Trạng thái: Chờ xác nhận</p><button className="primary-button" onClick={() => { setSuccess(null); setView("catalog"); }}>Tiếp tục mua sắm</button></main>}

      <footer className="store-footer"><div className="store-brand"><span className="brand-mark">T</span><span>TAI <span className="brand-light">TECH</span><small>LINH KIỆN MÁY TÍNH</small></span></div><p>Website kinh doanh linh kiện máy tính</p><small>© {new Date().getFullYear()} TAI TECH. All rights reserved.</small></footer>
    </div>
  );
}
