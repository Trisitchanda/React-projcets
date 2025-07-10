import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-amber-500 p-7 rounded-2xl'>my cards</h1>
      <div class="flex gap-5 ">
        <Card cityName="Paris"/>
        <Card cityName="Kolkata"/>
      </div>
    </>
  )
}

export default App
