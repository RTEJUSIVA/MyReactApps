import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["Admin", "Super Admin", "User"], "Please select a valid role")
    .required("Role is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Please select a gender")
    .required("Gender is required"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

const savedData = JSON.parse(localStorage.getItem("registrationData"));
const initialValues = savedData || {
  name: "",
  username: "",
  password: "",
  role: "",
  email: "",
  gender: "",
  agreeTerms: false,
};

const Registration = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Form submitted with values:", values);
      // --- Option 2: Store multiple users
      let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(values);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Dispatch custom event for UserList
      window.dispatchEvent(new Event("usersUpdated"));
      // simulate API
      await new Promise((r) => setTimeout(r, 1000));
      alert("Form submitted successfully!");
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in all required fields
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    touched.name && errors.name
                      ? "border-red-300"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username *
                </label>
                <Field
                  type="text"
                  name="username"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    touched.username && errors.username
                      ? "border-red-300"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password *
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    touched.password && errors.password
                      ? "border-red-300"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    touched.email && errors.email
                      ? "border-red-300"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Role *
                </label>
                <Field
                  as="select"
                  name="role"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    touched.role && errors.role
                      ? "border-red-300"
                      : "border-gray-300"
                  } text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select a role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Female</span>
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start">
                  <Field
                    type="checkbox"
                    name="agreeTerms"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500 underline"
                    >
                      terms and conditions
                    </a>{" "}
                    *
                  </span>
                </label>
                <ErrorMessage
                  name="agreeTerms"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  } transition duration-150 ease-in-out`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
