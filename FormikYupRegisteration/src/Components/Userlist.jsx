import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  };

  // Start editing
  const startEdit = (index) => {
    setEditIndex(index);
    setEditData(users[index]);
  };

  // Handle input change in edit mode
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const deleteUser = (index) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(savedUsers));
    setUsers(savedUsers);
    window.dispatchEvent(new Event("usersUpdated")); // sync
  };

  // Save edited user
  const saveEdit = (index) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers[index] = editData;
    localStorage.setItem("users", JSON.stringify(savedUsers));
    setUsers(savedUsers);
    setEditIndex(null);
    setEditData({});
    window.dispatchEvent(new Event("usersUpdated"));
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditIndex(null);
    setEditData({});
  };

  useEffect(() => {
    loadUsers();
    window.addEventListener("usersUpdated", loadUsers);
    return () => {
      window.removeEventListener("usersUpdated", loadUsers);
    };
  }, []);

  if (users.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-600">No users registered yet.</p>
    );
  }

  return (
    <>
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg shadow">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {editIndex === index ? (
                  <>
                    <td className="border px-2 py-1">
                      <input
                        name="name"
                        value={editData.name || ""}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="username"
                        value={editData.username || ""}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="email"
                        value={editData.email || ""}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="role"
                        value={editData.role || ""}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        name="gender"
                        value={editData.gender || ""}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-1 space-x-2">
                      <button
                        onClick={() => saveEdit(index)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">{user.gender}</td>
                    <td className="border px-2 py-1 space-x-2">
                      <button
                        onClick={() => startEdit(index)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Userlist;
