import nggt from '../nggt.js'
import Data from '../data/module.js'
import Prefabs from '../prefabs/module.js'
import GamePipe from '../pipes/game.js'
import RoomService from '../services/room.js'

const RoomPipe = RoomService.pipe

export default () => nggt.create({
  isRoot: true,
  classList: ['game', 'gl-scene_mobile_pro'],
  template: Prefabs.Card(
    Prefabs.CardHeader(
      Prefabs.DataObj(GamePipe.title, text => Prefabs.Bold(text))
    ),
    Prefabs.Btn(['gl-btn_icon'], 'Change Title', () => GamePipe.title.change('Works!'))
  ),
  run: () => {
    if(!RoomPipe.room.val()) location.hash = '#/'
  },
  cleanup: () => GamePipe.cleanup()
})
