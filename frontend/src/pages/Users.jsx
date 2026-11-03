import React, { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  resetPassword,
  toggleUserStatus,
} from "../services/api";

import { useAuth } from "../contexts/AuthContext";

export default function Users() {
  const { hasRole } = useAuth();

  // ==============================
  // STATE
  // ==============================

  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const emptyUser = {
    username: "",
    password: "",
    full_name: "",
    email: "",
    phone: "",
    role: "Cashier",
  };

  const [formData, setFormData] = useState(emptyUser);

  // ==============================
  // LOAD USERS
  // ==============================

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  async function loadUsers() {
    try {
      const data = await getUsers(keyword);
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách người dùng.");
    }
  }

  // ==============================
  // FORM
  // ==============================

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function openAdd() {
    setFormData(emptyUser);
    setShowAdd(true);
  }

  function openEdit(user) {
    setSelectedUser(user);

    setFormData({
      username: user.username,
      password: "",
      full_name: user.full_name,
      email: user.email || "",
      phone: user.phone || "",
      role: user.role,
    });

    setShowEdit(true);
  }

  // ==============================
  // ACTIONS
  // ==============================

  async function addUser() {
    try {
      await createUser(formData);

      alert("Thêm người dùng thành công.");

      setShowAdd(false);

      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function saveEditedUser() {
    try {
      await updateUser(selectedUser._id, formData);

      alert("Cập nhật thành công.");

      setShowEdit(false);

      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function removeUser(user) {
    if (!window.confirm(`Xóa "${user.full_name}" ?`)) return;

    try {
      await deleteUser(user._id);

      alert("Đã xóa.");

      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function resetPasswordUser(user) {
    if (!window.confirm(`Reset mật khẩu của ${user.full_name}?`)) return;

    try {
      await resetPassword(user._id);

      alert("Đã reset mật khẩu về 123456.");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function toggleStatus(user) {
    try {
      await toggleUserStatus(user._id);

      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div style={{ padding: 25 }}>
      {/* ==========================
          HEADER
      ========================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>👥 Quản lý người dùng</h2>

          <p
            style={{
              marginTop: 6,
              color: "#64748b",
            }}
          >
            Quản lý tài khoản đăng nhập và phân quyền hệ thống
          </p>
        </div>

        {hasRole("Admin") && (
          <button
            onClick={openAdd}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ➕ Thêm người dùng
          </button>
        )}
      </div>

      {/* ==========================
          SEARCH
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="🔍 Tìm theo tên, username hoặc email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            outline: "none",
            fontSize: 15,
          }}
        />
      </div>

      {/* ==========================
          TABLE
      ========================== */}

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
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
              <th style={{ padding: 14 }}>Họ tên</th>
              <th>Username</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th width="270">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    padding: 35,
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: 14 }}>
                    <strong>{u.full_name}</strong>
                  </td>

                  <td>{u.username}</td>

                  <td>{u.email || "-"}</td>

                  <td>{u.phone || "-"}</td>

                  <td>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: 20,
                        color: "#fff",
                        fontSize: 13,
                        background:
                          u.role === "Admin"
                            ? "#dc2626"
                            : u.role === "Manager"
                            ? "#2563eb"
                            : u.role === "Warehouse"
                            ? "#16a34a"
                            : "#f59e0b",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td>
                    {u.is_active ? (
                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: "bold",
                        }}
                      >
                        ● Hoạt động
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#dc2626",
                          fontWeight: "bold",
                        }}
                      >
                        ● Đã khóa
                      </span>
                    )}
                  </td>

                  <td>{new Date(u.createdAt).toLocaleDateString("vi-VN")}</td>

                  <td>
                    {hasRole("Admin") && (
                      <>
                        <button
                          onClick={() => openEdit(u)}
                          style={{
                            marginRight: 6,
                            border: "none",
                            borderRadius: 6,
                            padding: "6px 10px",
                            cursor: "pointer",
                            background: "#2563eb",
                            color: "#fff",
                          }}
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => resetPasswordUser(u)}
                          style={{
                            marginRight: 6,
                            border: "none",
                            borderRadius: 6,
                            padding: "6px 10px",
                            cursor: "pointer",
                            background: "#f59e0b",
                            color: "#fff",
                          }}
                        >
                          🔑
                        </button>

                        <button
                          onClick={() => toggleStatus(u)}
                          style={{
                            marginRight: 6,
                            border: "none",
                            borderRadius: 6,
                            padding: "6px 10px",
                            cursor: "pointer",
                            background: u.is_active ? "#dc2626" : "#16a34a",
                            color: "#fff",
                          }}
                        >
                          {u.is_active ? "🔒" : "🔓"}
                        </button>

                        <button
                          onClick={() => removeUser(u)}
                          style={{
                            border: "none",
                            borderRadius: 6,
                            padding: "6px 10px",
                            cursor: "pointer",
                            background: "#991b1b",
                            color: "#fff",
                          }}
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ==========================
          ADD USER
      ========================== */}

      {showAdd && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>➕ Thêm người dùng</h2>

            <input
              name="full_name"
              placeholder="Họ và tên"
              value={formData.full_name}
              onChange={handleChange}
            />

            <input
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
            />

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Cashier">Cashier</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 20,
              }}
            >
              <button onClick={() => setShowAdd(false)}>Hủy</button>

              <button onClick={addUser}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================
          EDIT USER
      ========================== */}

      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>✏️ Cập nhật người dùng</h2>

            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />

            <input value={formData.username} disabled />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Cashier">Cashier</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 20,
              }}
            >
              <button onClick={() => setShowEdit(false)}>Hủy</button>

              <button onClick={saveEditedUser}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================
          STYLE
      ========================== */}

      <style>{`
        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.45);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:999;
        }

        .modal-box{
          width:420px;
          background:#fff;
          border-radius:12px;
          padding:25px;
          box-shadow:0 8px 30px rgba(0,0,0,.25);
        }

        .modal-box h2{
          margin-top:0;
          margin-bottom:20px;
        }

        .modal-box input,
        .modal-box select{
          width:100%;
          padding:10px;
          margin-bottom:12px;
          border:1px solid #ddd;
          border-radius:8px;
          box-sizing:border-box;
          outline:none;
        }

        .modal-box input:focus,
        .modal-box select:focus{
          border-color:#2563eb;
        }

        .modal-box button{
          padding:10px 18px;
          border:none;
          border-radius:8px;
          cursor:pointer;
          font-weight:bold;
        }

        .modal-box button:first-child{
          background:#94a3b8;
          color:#fff;
        }

        .modal-box button:last-child{
          background:#2563eb;
          color:#fff;
        }

        table th{
          padding:14px;
        }

        table td{
          padding:12px;
        }

        tbody tr:hover{
          background:#f8fafc;
        }
      `}</style>
    </div>
  );
}
