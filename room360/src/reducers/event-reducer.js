const initialState = [{
  address: 'Jl kesono ksini',
  _id: '1200',
  image: {standard:'https://i.ytimg.com/vi/Xx6t0gmQ_Tw/maxresdefault.jpg'},
  name: 'a',
  price: '2.000.000/bulan',
  location:{
    lat: defaultLocation.lat,
    lng: defaultLocation.lng - 0.0029,
  },
  type: 'party',
  url: 'qwffq'
},{
  address: 'Jl hello world',
  _id: '1500',
  name: 'b',
  image: {standard:'https://lh4.googleusercontent.com/_uWgFVtvSsek/TUUs53JDrCI/AAAAAAAAFCc/mXkdAs5Wdoo/s1200/Indosat.jpg'},
  price: '5.000.000/hari',
  location:{
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  },
  type: 'event',
  url: 'aqdjqwf'
}]

export default (state = initialState,action) =>{
    if(action.type === 'Events'){
      if(!action.payload){
        return initialState
      }
      return action.payload
    }
    else{
      return state
    }
}
