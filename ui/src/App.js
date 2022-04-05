import logo from "./favicon.png";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
    const [state, setState] = useState([]);
    const webSocket = useRef(null); 

    console.log("hey now")
    
    console.log("something else")

    useEffect(() => {
        fetch("http://localhost:8000", {
        mode: "no-cors",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        }).then((res) => setState(res.data));
    });

    useEffect(() => {
        webSocket.current = new WebSocket("ws://localhost:8000/websockets");
        webSocket.current.onmessage = (message) => {
            console.log("message", message);
        };
        return () => webSocket.current.close();
    }, []);

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
          let's get Hyphae in here.
          {state}
        </p>
        <button onClick={publish}>Test Publish</button>
      </header>
    </div>
  );
}

export default App;
