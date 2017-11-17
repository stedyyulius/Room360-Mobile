const initialState = {
  image: {standard:null}
}

export default (state = initialState,action) =>{
    if(action.type === 'Detail'){
      if(!action.payload){
        return initialState
      }
      return action.payload
    }
    else{
      return state
    }
}
