import React, { useState, useEffect } from "react";
import { API_URL } from "../Constants/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteFile = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const deleteUser = async (id) => {
    await axios.delete(API_URL + id);
    callgetAPI();
  };

  const updateUser = ({ firstname, lastname, checked, id }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("checked", checked);
    navigate("/Update");
  };

  const callgetAPI = async () => {
    const res = await axios.get(API_URL);
    setData(res.data);
  };

  useEffect(() => {
    callgetAPI();
  }, []);

  return (
    <>
      <h1>Read Operation</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Checked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.checked ? "ischecked" : "notchecked"}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(data.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      updateUser(data);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeleteFile;
