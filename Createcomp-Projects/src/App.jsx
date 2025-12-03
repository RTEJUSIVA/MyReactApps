import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


let author = "Santhosh";

let isLogged = true;
function App() {
  

  return (
    <>
      <div>
      <h1 style={{fontSize:"12px"}}>Welcome to React Js</h1>
      <label htmlFor='text'>UserName:</label>
      <input id='user' type='text'/>
      <p>{author}</p>
      {
        isLogged && <p>Welcome to Our Project</p>
      }
      </div>
      
    </>
  )
}

export default App
