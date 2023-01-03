import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Main } from './chip-8';

function App() {
  const [count, setCount] = useState(0);

  const [chip8, setChip8] = useState<() => void>();

  useEffect(() => {
    Main();
  
  }, []);

  const handleClick = () => {
    console.log("Click")
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleClick}>Start</button>
      </div>
    </div>
  )
}

export default App
