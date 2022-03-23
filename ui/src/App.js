import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

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

	const publish = () => {
		fetch("http://localhost:8000/publish", {
			mode: "no-cors",
			method: "POST",
			headers: {
				Accept: "application/json",
			},
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
