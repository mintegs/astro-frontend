/** @jsxImportSource react */
import { useState } from "react";
export default function ReactComponent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>react component</h1>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>click</button>
    </>
  );
}
