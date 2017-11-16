const initialState = {
  lat: 6.1751,
  lng: 106.8650
}

export default (state = initialState,action) =>{
    if(action.type === 'Location'){
      if(!action.payload){
        return initialState
      }
      return action.payload
    }
    else{
      return state
    }
}
