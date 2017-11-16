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

export{
  detailData,
  setSession
}
