// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { HashRouter, Link, Routes, Route } from "react-router-dom";
const { ipcRenderer } = window.require('electron');
// const { ipcRenderer } = require('electron')
console.log(ipcRenderer)
// const electron = window.require('electron');
// console.log("Electron", electron);

const Stand = ()=>{
  return(
    <>
      <h1>Stand</h1>
    </>
  )
}

const Sit = ()=>{
  return(
    <>
      <h1>Sit</h1>
    </>
  )
}

const Home = ()=>{

  

  return(
    <>
      <h1>Home</h1>

      <button onClick={()=>{
          ipcRenderer.send('asynchronous-request', 'ping')
          //reply
          ipcRenderer.once('asynchronous-reply', (event, arg) => {
            console.log("asynchronous-reply",arg) // prints "Hiii pong"
          })
      }}>
        
      Async

      </button>


      <button onClick={()=>{
          console.log('sync',ipcRenderer.sendSync('synchronous-request', 'ping')) 
      }}>
      Sync
      </button>

    </>
  )
}
    
const App = (props)=> {
 
  return (
    <HashRouter>
    <div className="App">
      <div className="menu">
        <Link to="/"><h2>Home</h2></Link>
        <Link to="/one"><h2>Stand</h2></Link>
        <Link to="/two"><h2>Sit</h2></Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/one' element={<Stand />} />
        <Route path='/two' element={<Sit />} />
      </Routes>
    </div>
    </HashRouter>    
  );
}

export default App;