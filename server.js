const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();

const wss = new WebSocket.Server({ server });

const PAIRS = ["EURUSD", "GBPUSD", "USDJPY"];

function generatePrice(pair) {
  return {
    pair,
    bid: (Math.random() + 1).toFixed(5),
    ask: (Math.random() + 1.01).toFixed(5),
    time: new Date(),
  };
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    const data = PAIRS.map(generatePrice);
    ws.send(JSON.stringify(data));
  }, 1000);

  ws.on("close", () => {
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});