import React, { useState } from "react";

const ColorChange = () => {
  const [formdata, setFormData] = useState({
    uname: "",
    name: "",
    email: "",
  });

  const [submitteddata, setSubmittedData] = useState(null);
  const [displaycolor, setDisplayColor] = useState("text-gray-700");
  const colors = [
    "text-blue-500",
    "text-orange-700",
    "text-indigo-500",
    "text-red-500",
    "text-green-700",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formdata.uname && formdata.name && formdata.email) {
      setSubmittedData(formdata);

      const randomcolor = colors[Math.floor(Math.random() * colors.length)];
      setDisplayColor(randomcolor);
    }

    setFormData({
      uname: "",
      name: "",
      email: "",
    });
  };

  return (
    <>
      {submitteddata && (
        <div className={`${displaycolor}`}>
          <h1>Submitted Data - Color Change</h1>
          <div>Username: {submitteddata.uname}</div>
          <div>Username: {submitteddata.name}</div>
          <div>Username: {submitteddata.email}</div>
        </div>
      )}
      <label>Username</label>
      <input
        style={{ border: "1px solid #ccc", borderRadius: "20px" }}
        id="uname"
        value={formdata.uname}
        name="uname"
        placholder="Enter your Username"
        onChange={handleChange}
      />
      <label>Name</label>
      <input
        style={{ border: "1px solid #ccc", borderRadius: "20px" }}
        id="name"
        value={formdata.name}
        name="name"
        placholder="Enter your Name"
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        style={{ border: "1px solid #ccc", borderRadius: "20px" }}
        id="email"
        value={formdata.email}
        name="email"
        placholder="Enter your Email"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default ColorChange;
