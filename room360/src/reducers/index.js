import { combineReducers } from 'redux'

import houses from './houses-reducers.js'

export default combineReducers({
  houses: houses
})
