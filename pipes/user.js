const nggt = require('../utils/nggt.js')

const cachePipe = nggt.pipe()

const User = class {
  constructor(username){
    this.username = username
  }
  joinQue(name){
    this.queName = name
  }
  joinRoom(id){
    this.roomId = id
    this.queName = null
    delete this.queName
  }
  disconnect(){
    delete this.queName
    delete this.roomId
  }
}

const getUser = username => {
  let userObj = cachePipe[username]
  if(!userObj) cachePipe[username] = userObj = nggt.dataObj(new User(username))
  return userObj.val()
}

module.exports = { getUser, ...cachePipe }