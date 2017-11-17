import axios from 'axios'
const api = `https://vision-server.herokuapp.com/graphql`

const headers = {
  'Content-Type': 'application/json'
}

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

const getEvents = () =>{
  let query = `events(approved:1, tipe:"hackathon"){name, location{name},tipe, approved}`
  return(dispatch)=>{
    axios.get(`${api}?${query}`)
    .then(res=>{
      dispatch({
        type: 'Events',
        payload: res.data
      })
    })
  }
}

export{
  detailData,
  setSession,
  getLocation,
  searchType,
  getEvents
}
