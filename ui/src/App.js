import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// const socket = new WebSocket('ws://localhost:8000/websockets');
// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Hello Server!');
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

function App() {
    const [state, setState] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000", {
        mode: "no-cors",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        }).then((res) => setState(res.data));
    });

    console.log("hey")

	const publish = () => {
		fetch("http://localhost:8000/publish", {
			mode: "no-cors",
			method: "POST",
			headers: {
				Accept: "application/json",
			},
            body: {
                "hi": "DAN"
            }
		});
	}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {state}
        </p>
        <button onClick={publish}>Test Publish</button>
      </header>
    </div>
  );
}

export default App;
