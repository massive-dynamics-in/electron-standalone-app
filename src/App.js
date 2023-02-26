import React from 'react';
import { HashRouter, Link, Routes, Route } from "react-router-dom";
const { ipcRenderer } = window.require('electron');

const Stand = () => {
	return (
		<>
			<h1>Stand</h1>
		</>
	)
}

const Sit = () => {
	return (
		<>
			<h1>Sit</h1>
		</>
	)
}

const Home = () => {



	return (
		<>
			<h1>Home</h1>

			<button onClick={() => {
				ipcRenderer.send('db', {
					collection: 'clients',
					operation: 'insert',
					data: {
						name: "John",
						age: 30
					}
				})

				ipcRenderer.once('db.response', (event, arg) => {
					console.log("db-response", arg)
				})
			}}>

				Insert

			</button>

			<button onClick={() => {
				ipcRenderer.send('db', {
					collection: 'clients',
					operation: 'count',
					query: {}
				})

				ipcRenderer.once('db.response', (event, arg) => {
					console.log("db-response", arg)
				})
			}}>
				Find
			</button>

		</>
	)
}

const App = (props) => {

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