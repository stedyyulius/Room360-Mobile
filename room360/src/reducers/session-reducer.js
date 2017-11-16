const initialState = false

export default (state = initialState,action) =>{
    if(action.type === 'Session'){
      if(!action.payload){
        return initialState
      }
      return action.payload
    }
    else{
      return state
    }
}
