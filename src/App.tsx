import { useState } from 'react'
import { Button } from '@mui/material'
import './App.css'
import MainStore from './stores/MainStore';
import {Provider} from 'mobx-react';

class Store {
  mainStore: MainStore;
  
  constructor()
  {
    this.mainStore = new MainStore();
  }
}

const store = new Store();

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
       <Button variant="contained" onClick={()=>{
           setCount(count + 1);
         }}
       >
         Hello world {count}</Button>
    </Provider>
  )
}
export default App
