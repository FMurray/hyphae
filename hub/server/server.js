import mqtt from "mqtt";
import express from "express";
import websockets from "./websockets.js";

const client = mqtt.connect("tcp://localhost:1883");

const port = "8000";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


client.on("connect", function () {
  client.subscribe("presence", function (err) {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

websockets(app);

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.post("/publish", (req, res) => {
    console.log("req", req.body);
    client.publish("presence", req.body.message);
    res.send("Published");
})

app.listen(port, '0.0.0.0', () => { console.log("Server running on port " + port); });
