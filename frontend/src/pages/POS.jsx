import React, { useEffect, useMemo, useState } from "react";

import POSSearch from "../components/POSSearch";
import POSProductList from "../components/POSProductList";
import POSCart from "../components/POSCart";
import POSSummary from "../components/POSSummary";
import POSPayment from "../components/POSPayment";
import ReceiptModal from "../components/ReceiptModal";

import {
  getProducts,
  getCategories,
  getCustomers,
  createOrder,
} from "../services/api";

export default function POS() {
  // ============================
  // DATA
  // ============================

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  // ============================
  // CUSTOMER
  // ============================

  const [customers, setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [cart, setCart] = useState([]);
  // Popup hóa đơn
  const [printedOrder, setPrintedOrder] = useState(null);

  // ============================
  // SEARCH
  // ============================

  const [keyword, setKeyword] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  // ============================
  // PAYMENT
  // ============================

  const [discount, setDiscount] = useState(0);

  const [paid, setPaid] = useState(0);

  // ============================
  // LOAD DATA
  // ============================

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadCustomers();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadCustomers() {
    try {
      const data = await getCustomers();

      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }
  // ============================
  // FILTER PRODUCT
  // ============================

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchKeyword = (item.name || "")
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchCategory =
        !selectedCategory || item.category?._id === selectedCategory;

      return matchKeyword && matchCategory;
    });
  }, [products, keyword, selectedCategory]);

  // ============================
  // ADD TO CART
  // ============================

  function addToCart(product) {
    setCart((prev) => {
      const index = prev.findIndex((item) => item._id === product._id);

      if (index !== -1) {
        const newCart = [...prev];

        if (newCart[index].quantity < product.stock) {
          newCart[index].quantity += 1;
        }

        return newCart;
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // ============================
  // INCREASE QTY
  // ============================

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item;

        if (item.quantity >= item.stock) return item;

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  // ============================
  // DECREASE QTY
  // ============================

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id !== id) return item;

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  // ============================
  // REMOVE ITEM
  // ============================

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item._id !== id));
  }

  // ============================
  // CLEAR CART
  // ============================

  function clearCart() {
    const ok = window.confirm("Bạn muốn xóa toàn bộ giỏ hàng?");

    if (!ok) return;

    setCart([]);
  }

  // ============================
  // TOTAL
  // ============================
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + item.sale_price * item.quantity;
    }, 0);
  }, [cart]);

  const total = Math.max(subtotal - Number(discount || 0), 0);

  const change = Number(paid || 0) >= total ? Number(paid || 0) - total : 0;

  // ============================
  // FORMAT PRICE
  // ============================

  function formatPrice(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " đ";
  }

  // ============================
  // CHECKOUT
  // ============================

  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Giỏ hàng đang trống.");
      return;
    }

    if (Number(paid) < total) {
      alert("Tiền khách đưa chưa đủ.");
      return;
    }

    // Khách hàng được chọn
    const customer = customers.find((item) => item._id === selectedCustomer);

    try {
      const order = {
        customer: customer?._id || null,

        customer_name: customer?.full_name || "Khách lẻ",

        employee_name: "Admin",

        payment_method: "Tiền mặt",

        discount: Number(discount),

        paid: Number(paid),

        note: "",

        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };

      const savedOrder = await createOrder(order);

      // Hiển thị popup hóa đơn
      setPrintedOrder(savedOrder);

      // Reload tồn kho
      await loadProducts();

      // Reset POS
      setCart([]);
      setDiscount(0);
      setPaid(0);
      setSelectedCustomer("");
    } catch (err) {
      console.error(err);

      alert(err.message || "Thanh toán thất bại.");
    }
  }

  // ============================
  // UI
  // ============================
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          padding: 20,
        }}
      >
        {/* ========================= */}
        {/* LEFT */}
        {/* ========================= */}

        <div>
          <POSSearch
            keyword={keyword}
            setKeyword={setKeyword}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <POSProductList
            products={filteredProducts}
            onAdd={addToCart}
            formatPrice={formatPrice}
          />
        </div>

        {/* ========================= */}
        {/* RIGHT */}
        {/* ========================= */}

        <div>
          <POSCart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
            clearCart={clearCart}
            formatPrice={formatPrice}
          />

          {/* =========================
    CUSTOMER
========================= */}

          <div
            style={{
              background: "#fff",
              padding: 15,
              borderRadius: 12,
              marginTop: 15,
              marginBottom: 15,
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: "bold",
              }}
            >
              👤 Khách hàng
            </label>

            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            >
              <option value="">Khách lẻ</option>

              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.full_name} ({customer.phone})
                </option>
              ))}
            </select>
          </div>

          <POSSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
            formatPrice={formatPrice}
          />

          <POSPayment
            paid={paid}
            setPaid={setPaid}
            discount={discount}
            setDiscount={setDiscount}
            change={change}
            total={total}
            formatPrice={formatPrice}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* ========================= */}
      {/* RECEIPT MODAL */}
      {/* ========================= */}

      {printedOrder && (
        <ReceiptModal
          order={printedOrder}
          onClose={() => setPrintedOrder(null)}
        />
      )}
    </>
  );
}
