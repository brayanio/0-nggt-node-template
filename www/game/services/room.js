import nggt from '../nggt.js'

const pipe = nggt.service('room', {checkQue: false})

const QUE_TIME = 5000

const joinQue = async (username, gameType, playerCount) => {
  let obj = await pipe.post('room', 'join-room', {username, que: gameType, playerCount}, true)
  console.log('obj', obj)
  if(obj.id)
    location.hash = '#/game'
  else {
    pipe.checkQue.change(true)
    setTimeout(() => checkQue(username), QUE_TIME)
  }
}

const checkQue = async username => {
  if(pipe.checkQue.val()){
    await pipe.post('room', 'que', {username}, true)
    let obj = pipe.room.val()
    console.log('obj', obj)
    if(obj.packet && obj.packet === 'room'){
      pipe.checkQue.change(false)      
      location.hash = '#/game'
    } else if(obj.error){
      pipe.checkQue.change(false) 
      console.error('[Game Error]', obj.error, obj.msg)
    } else 
      setTimeout(() => checkQue(username), QUE_TIME)
  }
}

const leaveQue = async username => {
  pipe.checkQue.change(false)
  pipe.send('leave-que', {username}, true)
  pipe.room.change(null)
}

export default {pipe, joinQue, leaveQue}