const detailData = (data) =>{
  return{
    type: 'Detail',
    payload: data
  }
}

const setSession = (status) =>{
  return{
    type: 'Session',
    payload: status
  }
}

const getLocation = (loc) =>{
  return{
    type: 'Location',
    payload: loc
  }
}

const searchType = (type) =>{
  return{
    type: 'Type',
    payload: type
  }
}

export{
  detailData,
  setSession,
  getLocation,
  searchType
}
