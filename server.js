const WebSocket = require("ws")

const PORT = 8080
const wss = new WebSocket.Server({ port: PORT })

const PAIRS = ["EURUSD", "GBPUSD", "USDJPY"]

function generatePrice(pair) {
  return {
    pair,
    bid: (Math.random() + 1).toFixed(5),
    ask: (Math.random() + 1.002).toFixed(5),
    time: new Date()
  }
}

wss.on("connection", (ws) => {
  console.log("Client connected")

  const interval = setInterval(() => {
    const data = PAIRS.map(generatePrice)
    ws.send(JSON.stringify(data))
  }, 1000)

  ws.on("close", () => clearInterval(interval))
})

console.log("WebSocket running on port 8080")
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  setInterval(() => {
    ws.send(JSON.stringify({
      pair: "EURUSD",
      price: (1 + Math.random()).toFixed(5)
    }));
  }, 1000);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});