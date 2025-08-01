import { useState } from "react";
import SampleCond from "./SampleCond";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <SampleCond />
      </main>
    </>
  );
}

export default App;
