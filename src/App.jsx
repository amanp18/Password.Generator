import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [password, setpassword] = useState("")
  const [charallowed, setcharallowed]= useState(false)
  const [numberallowed, setnumberallowed]= useState(true)
const [length,setlength]= useState(8)

const password_generator= useCallback(()=>{
  let pass=""
  let  str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

  if (charallowed) str += "!@#$%^&*-+="
  if (numberallowed) str+= "1234567890"

  for (let i = 1; i <length; i++){
   let char= Math.floor(Math.random()* str.length+1)
1   
pass += str.charAt(char)
  }
    setpassword(pass)
 
},[length,charallowed,numberallowed,setpassword])

const passwordref= useRef(null)

const copypass =useCallback(()=>{
  passwordref.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  password_generator()
  },[length, charallowed, numberallowed,password_generator])

  return (
<div className=' h-screen w-screen flex-wrap bg-black'>
      <div className='w-screen h-screen max-w-md mx-auto overflow-hidden shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-900'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly 
      ref={passwordref}/>
      <button onClick={copypass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-black'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}} />
        <label>length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={numberallowed}
        id='numberInput'
        onChange={()=>{setnumberallowed((prev)=>!prev);
}}/>
<label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={charallowed}
        id='charInput'
        onChange={()=>{setcharallowed((prev)=>!prev);
}}/>
<label htmlFor="charInput">Charecter</label>
      </div>
    </div>
    </div>
    </div>
  )
}

export default App
