import { combineReducers } from 'redux'

import houses from './houses-reducers'
import detail from './detail-reducer'
import session from './session-reducer'

export default combineReducers({
  houses: houses,
  detail : detail,
  session: session
})
