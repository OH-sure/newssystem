// import {useEffect} from 'react';
// import axios from 'axios';
import IndexRouder from './router/indexRouder';
import './App.css'

function App(){
  // useEffect(
  //   ()=>{
  //     axios.get('api/mmdb/movie/v3/list/hot.json?ct=西安&ci=42&channelId=4').then(res=>{
  //       console.log(res);
  //     })
  //   }
  // )

  return <div id='rootBox'>
    <IndexRouder>

    </IndexRouder>
  </div>
}
export default App