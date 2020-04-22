/* STORAGE */
const storage = require('./server/utils/storage.js')
storage.load()

/* SERVER */
const server = require('./server/utils/server.js')
require('./server/routes/join-room.js')
require('./server/routes/leave-que.js')
require('./server/routes/que.js')
server.serve(4200)