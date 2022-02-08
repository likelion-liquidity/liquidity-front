import { useState } from 'react';
import { getKaikasAccts } from './api/UseKaikas';
import './App.css';

function App() {
  const [obj, setObj] = useState("TEAM LIQUIDITY");
  getKaikasAccts().then(res => setObj(res));
  return (
    <div className="App">
      {obj}
    </div>
  );
}

export default App;