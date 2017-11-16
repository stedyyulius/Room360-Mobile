import { combineReducers } from 'redux'

import houses from './houses-reducers.js'
import detail from './detail-reducer.js'

export default combineReducers({
  houses: houses,
  detail : detail
})
