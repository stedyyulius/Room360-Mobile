import { combineReducers } from 'redux'

import houses from './houses-reducers'
import detail from './detail-reducer'
import session from './session-reducer'
import location from './location-reducer'
import type from './type-reducer'

export default combineReducers({
  houses: houses,
  detail : detail,
  session: session,
  location: location,
  type: type
})
