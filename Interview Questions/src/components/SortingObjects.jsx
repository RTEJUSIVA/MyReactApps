import React, { useState } from "react";

const SortingObjects = () => {
  let [peoples, setPeoples] = useState([
    { Name: "Santhosh", age: 35 },
    { Name: "Revathi", age: 32 },
    { Name: "Tejaswini", age: 14 },
    { Name: "Sivarshan", age: 11 },
  ]);

  let objSort = () => {
    let arr = [...peoples];
    for (let i = 0; i <=arr.length-1; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j].age > arr[j + 1].age) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    setPeoples(arr);
  };

  return (
    <>
      <div>
        <h1>Objects in Array - Using sorting</h1>
      </div>
      <div>
        <ul>
          {peoples.map((people, index) => {
            return (
              <li key={index}>
                {people.Name} : {people.age}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button type="button" onClick={objSort}>
          Sort these Objects
        </button>
      </div>
    </>
  );
};

export default SortingObjects;
