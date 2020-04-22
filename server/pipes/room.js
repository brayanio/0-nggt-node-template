const nggt = require('../utils/nggt.js')
const guid = require('../utils/guid.js')
const UserPipe = require('./user.js')

const QuePipe = nggt.pipe()
const RoomPipe = nggt.pipe()

const Room = class {
  constructor(que){
    this.id = guid()    
    this.meta = { connected: que.connected, gameType: que.name, playerCount: que.playerCount }
    this.data = {}
  }
  disconnect(username){
    this.meta.connected = this.meta.connected.filter(e => e !== username)
    UserPipe.getUser(username).disconnect()
  }
  packet(){
    return {
      packet: 'room',
      data: this.data
    }
  }
}

const Que = class {
  constructor(name, username, playerCount) {
    this.name = name
    this.playerCount = playerCount
    this.connected = []
    this.connect(username)
  }
  connect(username){
    const user = UserPipe.getUser(username)
    user.joinQue(this.name)
    this.connected.push(user)
  }
  checkFull(){
    if(this.connected.length >= parseInt('' + this.playerCount)){
      const roomCreated = new Room(this)
      RoomPipe[roomCreated.id] = nggt.dataObj(roomCreated)
      this.connected.forEach(user => user.joinRoom(roomCreated.id))
      return roomCreated
    }
  }
  disconnect(username){
    this.connected = this.connected.filter(u => u.username !== username)
    UserPipe.getUser(username).disconnect()
  }
  packet(){
    return {
      packet: 'que',
      playerAmount: this.connected.length,
      playerCount: this.playerCount
    }
  }
}

const joinQue = (username, queName, playerCount) => {
  const check = checkQue(username)
  if(!check.error) return check
  if(QuePipe[queName] && QuePipe[queName]){
    const que = QuePipe[queName].val()
    que.connect(username)
    const roomCreated = que.checkFull(username, playerCount)
    return roomCreated.packet()
  }
  const queCreated = new Que(queName, username, playerCount)
  QuePipe[queName] = nggt.dataObj(queCreated)
  return queCreated.packet()
}

const checkQue = username => {
  const user = UserPipe.getUser(username)
  if(QuePipe[user.queName])
    return QuePipe[user.queName].val().packet()
  else if(user.roomId && RoomPipe[user.roomId])
    return RoomPipe[user.roomId].val().packet()
  return {error: true, msg: 'User not in que or active room.'}
}

const leaveQue = username => {
  const user = UserPipe.getUser(username)
  if(user.queName)
    QuePipe[user.queName].val().disconnect(username)
  if(user.roomId)
    RoomPipe[user.roomId].val().disconnect(username)
  return {msg: 'User removed from any que or active room.', error: false}
}

module.exports = {joinQue, checkQue, leaveQue}