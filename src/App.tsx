import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Main } from './chip-8';
import EventEmitter from "eventemitter3";
import { Events } from './Events';

function App() {
  const [count, setCount] = useState(0);

  const [chipEvents, setChipEvents] = useState<EventEmitter>();
  const [screen, setScreen] = useState<Array<Array<number>>>();

  useEffect(() => {
    const events = Main();
    setChipEvents(events.Events);

  }, []);

  Events.on("screen:draw", (screen: Array<Array<number>>) => {
    console.log("PRINT SCREEN")
    setScreen(screen);
  });

  useEffect(() => {
    console.log("Screen: ", screen)
  }, [screen]);

  return (
    <div className="App">
      <div>

        {
          screen && screen.map((row, i) => {
            return <div key={i}>
              {
                row.map((pixel, j) => {
                  return <div key={j + "-" + j} style={{marginLeft: "5px", fontSize: "10px", width: "15px", height: "15px", backgroundColor: pixel ? "orange" : "none", outline: "1px solid grey", display: "inline-block" }}>
                    {j}
                  </div>
                })
              }
              </div>
          })
        }

      </div>
    </div>
  )
}

export default App
