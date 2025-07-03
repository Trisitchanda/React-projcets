import './App.css'
import { useState } from 'react'

function App() {

  let [count,setCount] = useState(5)

  const addValue = () => {
    if(count<20){
      setCount(count+=1)
    }
    else{
      document.querySelector("#msg").innerHTML = "Cant go above 20"
    }
    
  }
  const decValue = () => {
    if(count>0){
      setCount(count-=1)}
      else{
        document.querySelector("#msg").innerHTML = "Cant go below 0"
      }
    }
    

  return (
    <>
      <h1>Counter</h1>
      <h2>Counter value: {count}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={decValue}>Decrease value</button>
      <p id='msg'></p>
    </>
  )
}

export default App
