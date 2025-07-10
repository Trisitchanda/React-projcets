import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [characterallowed, setCharacterallowed] = useState(false)
  const [passowrd, setPassowrd] = useState("")


  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789"
    if (characterallowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassowrd(pass)
  }, [length, numberallowed,characterallowed, setPassowrd])

  const copytoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(passowrd)
  },[passowrd])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberallowed,characterallowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white
      bg-gray-500'>
        <h1 className='mb-4 text-center'>Password Generator</h1>
        <div className='flex shadow-2xl text-black rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={passowrd}
            className=' outline-none bg-amber-50 w-full py-1 px-3'
            readOnly 
            ref={passwordRef}/>
          <button onClick={copytoClipboard} className='outline-none bg-red-600 text-white px-3 py-0.5 shrink-0 cursor-pointer'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id='numberInput'
              onChange={() => {
                setNumberallowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterallowed}
              id="characterInput"
              onChange={() => {
                setCharacterallowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
