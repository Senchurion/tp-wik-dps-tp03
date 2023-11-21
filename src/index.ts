import { createServer, IncomingMessage, ServerResponse } from "http"
import { hostname } from "os";

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method === "GET" && req.url === "/ping") {
      console.log(`Request received on host: ${hostname()}`);
      res.setHeader("Content-Type", "application/json")
      res.write(JSON.stringify(req.headers))
      res.end();
    } else {
      res.statusCode = 404
      res.end()
    }

  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.end()
  }
}

try {
  // Server creation
  const server = createServer(requestListener);
  server.listen(process.env.PING_LISTEN_PORT ?? 8080);
  const serverAddressInfo = server.address()
  if (!serverAddressInfo) {
    throw new Error("No server address info")
  }
  if (typeof serverAddressInfo === 'string') {
    console.log(`Server listening : ${serverAddressInfo}`)
  } else {
    console.log(`Server listening : ${serverAddressInfo.address}:${serverAddressInfo.port}`)
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
