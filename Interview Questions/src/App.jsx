import React, { useState } from "react";
import InputText from "./components/InputText";
import Sorting from "./components/Sorting";
import SortingObjects from "./components/SortingObjects";
import DragnDrop from "./components/DragnDrop";

const InputDisplay = () => {
  return (
    <>
      {/* <InputText />
      <Sorting />
      <SortingObjects /> */}
      <DragnDrop />
    </>
  );
};

export default InputDisplay;
