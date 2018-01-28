const Hapi = require("hapi")

const server = new Hapi.Server({
  port: process.env.PORT || 5555
})

server.route([
  {
    method: "GET",
    path: "/",
    handler(request, h) {
      return "Hello world"
    }
  }
])

server.start()

console.log("Server running: ", server.info.uri)
