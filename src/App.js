// import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [color, setColor] = useState('red');
  const [checked, setChecked] = useState(false);
  return (
    <div className="App">
      <button disabled={checked} style={{backgroundColor: color}}
              onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>Change to
        {color === 'red' ? 'Change to blue' : 'Change to red'}
      </button>
      <input
        aria-checked={checked}
        id={'app-checkbox'}
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}/>
    </div>
  );
}

export default App;
