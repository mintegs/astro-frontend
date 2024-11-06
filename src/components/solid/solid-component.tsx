import { createSignal } from "solid-js";
export default function SolidComponent() {
  const [count, setCount] = createSignal(0);
  return (
    <>
      <h1>solid component</h1>
      <h1>count: {count()}</h1>
      <button onClick={() => setCount(count() + 1)}>click</button>
    </>
  );
}
