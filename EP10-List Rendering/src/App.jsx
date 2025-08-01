import { useState } from "react";
import Content from "./Components/Content";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Content />
    </main>
  );
}

export default App;
