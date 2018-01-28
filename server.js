const Hapi = require('hapi')

const server = Hapi.Server({
  port: process.env.PORT || 5555,
  routes: { cors: true }
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

    if (
      typeof newMessage.name === 'string'
      && typeof newMessage.message === 'string'
      && newMessage.name.length > 0
      && newMessage.message.length > 0
    ) {
      messages.push(newMessage)
    }
    return ""
  }
})

server.start()

console.log('Server running at: ', server.info.uri)