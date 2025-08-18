import React, { useState, useEffect } from "react";
import { API_URL } from "../Constants/URL";
import axios from "axios";

const ReadFile = () => {
  const [data, setData] = useState([]);

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
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.checked ? "ischecked" : "notchecked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReadFile;
