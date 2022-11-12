// import logo from './logo.svg';
import './App.css';
import {useState} from "react";

export const camelCaseToCapitalLettersWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [color, setColor] = useState('MediumVioletRed');
  const [checked, setChecked] = useState(false);
  return (
    <div className="App">
      <button disabled={checked} style={{backgroundColor: checked ? 'gray' : color}}
              onClick={() => setColor(color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed')}>Change to
        {' '}{color === 'MediumVioletRed' ? 'midnight blue' : 'medium violet red'}
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
