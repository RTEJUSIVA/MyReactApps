import { useState } from "react";

import Apple from "./apple";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>Which phone I can use today!</p>
        <Apple />
      </div>
    </>
  );
}

export default App;
