/* STORAGE */
const storage = require('./utils/storage.js')
storage.load()

/* SERVER */
const server = require('./utils/server.js')
require('./routes/join-room.js')
require('./routes/leave-que.js')
require('./routes/que.js')
server.serve(4200)