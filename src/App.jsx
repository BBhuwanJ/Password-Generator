import React, { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [chaAllowed, setChaAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += '0123456789'
    }
    if (chaAllowed) {
      str += '!@#$%^&*_-{}[]'
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)


  }, [length, numberAllowed, chaAllowed, setPassword])

  // const copyPasswrodToClipboard = useCallback(() => {
  //   passwordRef.current?.select()
  //   window.navigator.clipboard.writeText(password)
  // }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, chaAllowed, passwordGenerator])

  return (
    <div>
      <div className="w-200 max-w-md mx-auto flex flex-col gap-y-3 shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center text-4xl'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className='outline-none w-full bg-white py-1 px-3 text-2xl' placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswrodToClipboard} className='bg-blue-700 px-5 cursor-pointer text-white font-bold '>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={18}
              value={length}
              className='cursor-pointer accent-orange-00'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label> Length: {length}</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }} />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              id='charInput'
              onChange={() => {
                setChaAllowed((prev) => !prev)

              }} />
            <label >Characters</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App

