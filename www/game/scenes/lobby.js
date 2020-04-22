// imports
import nggt from '../nggt.js'
import Data from '../data/module.js'
import Prefabs from '../prefabs/module.js'
import GamePipe from '../pipes/game.js'
import RoomService from '../services/room.js'

// consts
const RoomPipe = RoomService.pipe

// fns
const joinQue = () => RoomService.joinQue('Admin', 'pve', 2)
const joinQue2 = () => RoomService.joinQue('Admin2', 'pve', 2)
const leaveQue = () => RoomService.leaveQue('Admin')
const tab = nggt.dataObj('btn')

// nggt
export default () => nggt.create({
  isRoot: true,
  classList: ['game', 'gl-scene_mobile_pro'],
  template: Prefabs.Card(
    Prefabs.CardHeader('Lobby'),
    Prefabs.Tabs( tab,
      Prefabs.Tab( 'btn',
        Prefabs.Btn(['gl-btn_icon'], 'Play Now', joinQue),
        Prefabs.Btn(['gl-btn_icon'], 'Player 2', joinQue2)
      ),
      Prefabs.Tab( 'loading',
        Prefabs.Container('div', ['pad_thick'],
          Prefabs.Bold('Loading...'),
          `<br>`,
          Prefabs.Btn(['gl-btn_icon'], 'Cancel', leaveQue)
        )
      )
    )
  ),
  run: () => 
    RoomPipe.checkQue.onChange(v =>
      tab.change(v ? 'loading' : 'btn')
    ),
  cleanup: () => {
    GamePipe.cleanup()
    RoomPipe.checkQue.clear()
  }
})
