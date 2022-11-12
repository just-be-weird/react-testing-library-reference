// import logo from './logo.svg';
import './App.css';
import {useState} from "react";

export const camelCaseToCapitalLettersWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [color, setColor] = useState('red');
  const [checked, setChecked] = useState(false);
  return (
    <div className="App">
      <button disabled={checked} style={{backgroundColor: checked ? 'gray' : color}}
              onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>Change to
        {' '}{color === 'red' ? 'blue' : 'red'}
      </button>
      <input
        aria-checked={checked}
        id={'app-checkbox'}
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}/>
      <label htmlFor={'app-checkbox'}>Disable the button</label>
    </div>
  );
}

export default App;
