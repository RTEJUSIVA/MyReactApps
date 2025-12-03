import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";

const StudentCRUD = () => {
  // Initial 5 students data
  const initialStudents = [
    {
      id: 1,
      name: "John Doe",
      age: 20,
      email: "john@example.com",
      course: "Computer Science",
      grade: "A",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 19,
      email: "jane@example.com",
      course: "Mathematics",
      grade: "B+",
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 21,
      email: "mike@example.com",
      course: "Physics",
      grade: "A-",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      age: 20,
      email: "sarah@example.com",
      course: "Chemistry",
      grade: "B",
    },
    {
      id: 5,
      name: "David Brown",
      age: 22,
      email: "david@example.com",
      course: "Biology",
      grade: "A+",
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
    grade: "",
  });

  // Simulate API delay
  const simulateApiDelay = () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  // GET - Fetch all students
  const getAllStudents = async () => {
    setIsLoading(true);
    try {
      await simulateApiDelay();
      // In real app, this would be: const response = await fetch('/api/students');
      console.log("GET API called - Fetching all students");
      setStudents([...initialStudents]);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // POST - Add new student
  const addStudent = async (newStudent) => {
    setIsLoading(true);
    try {
      await simulateApiDelay();
      const studentWithId = {
        ...newStudent,
        id: Math.max(...students.map((s) => s.id), 0) + 1,
        age: parseInt(newStudent.age),
      };
      // In real app: const response = await fetch('/api/students', { method: 'POST', body: JSON.stringify(studentWithId) });
      console.log("POST API called - Adding new student:", studentWithId);
      setStudents((prev) => [...prev, studentWithId]);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // PUT - Update student
  const updateStudent = async (id, updatedData) => {
    setIsLoading(true);
    try {
      await simulateApiDelay();
      const updatedStudent = {
        ...updatedData,
        id,
        age: parseInt(updatedData.age),
      };
      // In real app: const response = await fetch(`/api/students/${id}`, { method: 'PUT', body: JSON.stringify(updatedStudent) });
      console.log("PUT API called - Updating student:", updatedStudent);
      setStudents((prev) =>
        prev.map((student) => (student.id === id ? updatedStudent : student))
      );
      setEditingStudent(null);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE - Remove student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    setIsLoading(true);
    try {
      await simulateApiDelay();
      // In real app: const response = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      console.log("DELETE API called - Removing student with ID:", id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      email: "",
      course: "",
      grade: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.email ||
      !formData.course ||
      !formData.grade
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
  };

  const startEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      age: student.age.toString(),
      email: student.email,
      course: student.course,
      grade: student.grade,
    });
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingStudent(null);
    resetForm();
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                Student Management System
              </h1>
              <div className="space-x-2">
                <button
                  onClick={getAllStudents}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Refresh (GET)"}
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add Student</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="border-b bg-gray-50 px-6 py-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {editingStudent ? "Edit Student" : "Add New Student"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div className="md:col-span-2 lg:col-span-5 flex space-x-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    disabled={isLoading}
                  >
                    <Save size={16} />
                    <span>{editingStudent ? "Update" : "Add"} Student</span>
                  </button>
                  <button
                    onClick={cancelForm}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading students...
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => startEdit(student)}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center space-x-1"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center space-x-1"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* API Status */}
          <div className="bg-gray-100 px-6 py-3 border-t">
            <p className="text-sm text-gray-600">
              Total Students:{" "}
              <span className="font-semibold">{students.length}</span>
              {isLoading && (
                <span className="ml-4 text-blue-600">
                  Processing API request...
                </span>
              )}
            </p>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            API Operations Implemented
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800">GET</h3>
              <p className="text-sm text-green-700">
                Fetch all students from JSON
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800">POST</h3>
              <p className="text-sm text-blue-700">Add new student to JSON</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-800">PUT</h3>
              <p className="text-sm text-yellow-700">
                Update existing student data
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800">DELETE</h3>
              <p className="text-sm text-red-700">Remove student from JSON</p>
            </div>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="mt-8 bg-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-800 mb-4">How to Use</h2>
          <div className="text-blue-700 space-y-2">
            <p>
              <strong>GET:</strong> Click "Refresh (GET)" to reload all students
            </p>
            <p>
              <strong>POST:</strong> Click "Add Student" to create new records
            </p>
            <p>
              <strong>PUT:</strong> Click "Edit" on any row to modify student
              data
            </p>
            <p>
              <strong>DELETE:</strong> Click "Delete" to remove students (with
              confirmation)
            </p>
            <p className="text-sm mt-4 text-blue-600">
              Check the browser console to see API method calls in action!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCRUD;
