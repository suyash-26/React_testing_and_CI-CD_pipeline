// Testing user interactions

// Counter.jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
       <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </>
  );
}