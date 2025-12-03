import React, { useState } from "react";

const Register = () => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formdata.name.trim()) newErrors.name = "Name is Required";
    if (!formdata.email.trim()) newErrors.email = "Email is Required";
    if (!formdata.username.trim()) newErrors.username = "Username is Required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  return (
    <div className="h-screen min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </div>
          <div className="text-gray-600">
            Please fill the Following Details To Register
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="fullname"
              className="block font-medium text-sm text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formdata.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.name ? "border-red-500" : "border-gray-500"
              } `}
            />
            {errors.name && (
              <p className="block text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formdata.username}
              name="username"
              id="username"
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.username ? "border-red-500" : "border-gray-500"
              }`}
            />
            {errors.username && (
              <p className="block text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formdata.email}
              name="email"
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.email ? "border-red-500" : "border-gray-500"
              }`}
            />
            {errors.email && (
              <p className="block text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="font-medium text-sm text-grey-700 block mb-2 ">
              Gender
            </label>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-500 border-gray-300 rounded focus:ring-blue-500"
              type="checkbox"
              name="gender"
              value="male"
              checked={formdata.gender === "male"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData((prev) => ({ ...prev, gender: "male" }));
                  if (errors.gender) {
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }
                } else {
                  setFormData((prev) => ({ ...prev, gender: "" }));
                }
              }}
            />
            <span className="text-sm font-medium text-gray-700 ml-2">Male</span>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-500 border-gray-300 rounded focus:ring-blue-500 ml-4"
              type="checkbox"
              name="gender"
              value="female"
              checked={formdata.gender === "female"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData((prev) => ({ ...prev, gender: "female" }));
                  if (errors.gender) {
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }
                } else {
                  setFormData((prev) => ({ ...prev, gender: "" }));
                }
              }}
            />
            <span className="text-sm font-medium text-gray-700 ml-2">
              Female
            </span>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-100 transition-all duration-200 shadow-lg"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
