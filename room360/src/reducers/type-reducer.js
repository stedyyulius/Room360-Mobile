const initialState = 'All'

export default (state = initialState,action) =>{
    if(action.type === 'Type'){
      if(!action.payload){
        return initialState
      }
      return action.payload
    }
    else{
      return state
    }
}
