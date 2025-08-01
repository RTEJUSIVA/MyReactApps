import React from "react";

const Register = () => {
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
      </div>
    </div>
  );
};

export default Register;
