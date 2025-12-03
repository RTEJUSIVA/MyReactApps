import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "Ram Kumar",
    age: 25,
    gender: "male",
    isMarried: true,
    country: "India",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <table className="table-auto">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{user.age}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>
          <tr>
            <td>IsMarried</td>
            <td>{user.isMarried ? "Married" : "Not Married"}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{user.country}</td>
          </tr>
        </tbody>
      </table>
      <form>
        <div>
          <input
            type="text"
            value={user.name}
            placeholder="Enter the Name"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div>
          <input
            type="text"
            value={user.age}
            placeholder="Enter Age"
            onChange={handleChange}
            name="age"
          />
        </div>
        <div>
          <label htmlFor="male">
            <input
              type="radio"
              name="gender"
              id="male"
              checked={user.gender == "male"}
              value="male"
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label htmlFor="female">
            <input
              type="radio"
              name="gender"
              id="female"
              checked={user.gender == "female"}
              value="female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
        <div>
          <label htmlFor="isMarried">
            <input
              type="checkbox"
              id="isMarried"
              checked={user.isMarried}
              onChange={handleChange}
              name="isMarried"
            />{" "}
            isMarried
          </label>
        </div>
        <div>
          <label htmlFor="country">Select Country:</label>
          <select
            name="country"
            id="country"
            value={user.country}
            onChange={handleChange}
          >
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Register;
