const Hapi = require('hapi')

const server = Hapi.Server({
  port: process.env.PORT || 5555
})

const messages = []

server.route({
  method: 'GET',
  path: '/',
  handler(request, h) {
    const timestamp = Number(request.query.timestamp)

    if (Number.isNaN(timestamp)) {
      return messages
    } else {
      return messages.filter(m => m.timestamp > timestamp)
    }
  }
})

server.route({
  method: 'POST',
  path: '/',
  handler(request) {
    const newMessage = {
      ...request.payload,
      timestamp: Date.now()
    }
    messages.push(newMessage)
    return messages
  }
})

server.start()

console.log('Server running at: ', server.info.uri)