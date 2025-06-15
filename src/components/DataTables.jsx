import {
  Plus,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import React from "react";

const DataTables = () => {
  const { isDark } = useTheme();
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('usersData');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    localStorage.setItem('usersData', JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([
        ...users,
        {
          id: Date.now(),
          ...newUser,
          status: "Active",
          joinDate: new Date().toLocaleDateString(),
        },
      ]);
      setNewUser({ name: "", email: "", role: "" });
      setShowAddModal(false);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          User Management
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add User
        </button>
      </div>

      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm border ${
          isDark ? "border-gray-700" : "border-gray-200"
        } overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Name
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Email
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Role
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDark ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className={`px-6 py-8 text-center ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No users found. Click "Add User" to get started.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className={`${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user.name}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {user.email}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          className={`p-1 rounded ${
                            isDark
                              ? "text-blue-400 hover:bg-gray-700"
                              : "text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className={`p-1 rounded ${
                            isDark
                              ? "text-yellow-400 hover:bg-gray-700"
                              : "text-yellow-600 hover:bg-yellow-50"
                          }`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className={`p-1 rounded ${
                            isDark
                              ? "text-red-400 hover:bg-gray-700"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-xl w-96`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Add New User
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={addUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DataTables;