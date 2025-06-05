import { useState } from 'react'
import { Button } from '@mui/material'
import './App.css'
import MainStore from './stores/MainStore';
import {Provider} from 'mobx-react';
import ListPorts from './components/ListPorts';
import MainLayout from "./layouts/MainLayout";

export class Store {
  mainStore: MainStore;
  
  constructor()
  {
    this.mainStore = new MainStore();
  }
}

const store = new Store();

function App() {
  
  if (!('serial' in navigator)) {
    console.warn('Web Serial API is not supported in this browser');
  }
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <MainLayout/>
    </Provider>
  )
}
export default App
