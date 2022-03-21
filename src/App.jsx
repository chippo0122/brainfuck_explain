import { useState, useEffect } from 'react'
import Slots from './components/Slots'
import InputControl from './components/InputControl';
import './App.scss'

function App() {

  const [slots, setSlots] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [currentIndex, setIndex] = useState(0);

  return (
    <div className="App p-5 bg-dark">
      <h1 className='text-light text-center display-3'>Brainf*ck Explainer</h1>
      <Slots 
        slots={slots} 
        currentIndex={currentIndex}
      ></Slots>
      <InputControl 
        setSlots={setSlots} 
        setIndex={setIndex} 
        slots={slots}
        currentIndex={currentIndex}
      ></InputControl>
    </div>
  )
}

export default App
