import { combineReducers } from 'redux'

import houses from './houses-reducers.js'
import image from './image-reducer.js'

export default combineReducers({
  houses: houses,
  image : image
})
