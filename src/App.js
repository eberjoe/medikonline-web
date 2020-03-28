import React, { useState } from 'react';
import Header from './Header';

function App() {
  // Array [value, function]
  let [counter, setCounter] = useState(0);

  function increment(){
    setCounter (counter + 1);
    console.log(counter);
  }
  return (
    <div>
      <Header>
        Counter: {counter}
      </Header>
      <button onClick={increment}>
        Incrementar
      </button>
    </div>
  );
}

export default App;
