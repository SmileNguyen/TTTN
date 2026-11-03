// =====================================================
// PERMISSIONS
// =====================================================

const PERMISSIONS = {
  // ==========================
  // Dashboard
  // ==========================
  DASHBOARD_VIEW: "dashboard.view",

  // ==========================
  // Products
  // ==========================
  PRODUCT_VIEW: "product.view",
  PRODUCT_CREATE: "product.create",
  PRODUCT_UPDATE: "product.update",
  PRODUCT_DELETE: "product.delete",

  // ==========================
  // Categories
  // ==========================
  CATEGORY_VIEW: "category.view",
  CATEGORY_CREATE: "category.create",
  CATEGORY_UPDATE: "category.update",
  CATEGORY_DELETE: "category.delete",

  // ==========================
  // Customers
  // ==========================
  CUSTOMER_VIEW: "customer.view",
  CUSTOMER_CREATE: "customer.create",
  CUSTOMER_UPDATE: "customer.update",
  CUSTOMER_DELETE: "customer.delete",

  // ==========================
  // Suppliers
  // ==========================
  SUPPLIER_VIEW: "supplier.view",
  SUPPLIER_CREATE: "supplier.create",
  SUPPLIER_UPDATE: "supplier.update",
  SUPPLIER_DELETE: "supplier.delete",

  // ==========================
  // Purchases
  // ==========================
  PURCHASE_VIEW: "purchase.view",
  PURCHASE_CREATE: "purchase.create",
  PURCHASE_UPDATE: "purchase.update",
  PURCHASE_DELETE: "purchase.delete",
  PURCHASE_RECEIVE: "purchase.receive",

  // ==========================
  // Orders
  // ==========================
  ORDER_VIEW: "order.view",
  ORDER_CREATE: "order.create",
  ORDER_DELETE: "order.delete",

  // ==========================
  // POS
  // ==========================
  POS_VIEW: "pos.view",
  POS_CHECKOUT: "pos.checkout",

  // ==========================
  // Statistics
  // ==========================
  STATISTICS_VIEW: "statistics.view",

  // ==========================
  // Users
  // ==========================
  USER_VIEW: "user.view",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",
  USER_RESET_PASSWORD: "user.reset_password",

  // ==========================
  // Activity Logs
  // ==========================
  LOG_VIEW: "log.view",
};

// =====================================================
// ROLE DEFAULT PERMISSIONS
// =====================================================

const ROLE_PERMISSIONS = {
  Admin: Object.values(PERMISSIONS),

  Manager: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_UPDATE,

    PERMISSIONS.CATEGORY_VIEW,

    PERMISSIONS.CUSTOMER_VIEW,
    PERMISSIONS.CUSTOMER_CREATE,
    PERMISSIONS.CUSTOMER_UPDATE,

    PERMISSIONS.SUPPLIER_VIEW,
    PERMISSIONS.SUPPLIER_CREATE,
    PERMISSIONS.SUPPLIER_UPDATE,

    PERMISSIONS.PURCHASE_VIEW,
    PERMISSIONS.PURCHASE_CREATE,
    PERMISSIONS.PURCHASE_UPDATE,
    PERMISSIONS.PURCHASE_RECEIVE,

    PERMISSIONS.ORDER_VIEW,

    PERMISSIONS.POS_VIEW,
    PERMISSIONS.POS_CHECKOUT,

    PERMISSIONS.STATISTICS_VIEW,

    PERMISSIONS.LOG_VIEW,
  ],

  Cashier: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.CATEGORY_VIEW,

    PERMISSIONS.CUSTOMER_VIEW,
    PERMISSIONS.CUSTOMER_CREATE,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,

    PERMISSIONS.POS_VIEW,
    PERMISSIONS.POS_CHECKOUT,
  ],

  Warehouse: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.SUPPLIER_VIEW,

    PERMISSIONS.PURCHASE_VIEW,
    PERMISSIONS.PURCHASE_CREATE,
    PERMISSIONS.PURCHASE_RECEIVE,
  ],
};

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSIONS,
};
