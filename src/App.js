// import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [color, setColor] = useState('red');
  return (
    <div className="App">
      <button style={{backgroundColor: color}} onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>Change to
        {color === 'red' ? 'Change to blue' : 'Change to red'}
      </button>
    </div>
  );
}

export default App;
