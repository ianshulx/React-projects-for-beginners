import React, { useState, useCallback } from 'react';
import "./App.css"
const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Please select at least one character type.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    // Optional: Show a toast or alert for feedback
    alert('Password copied to clipboard!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Strong Password Generator</h2>
      
      <div>
        <label>
          Length: 
          <input 
            type="number" 
            value={length} 
            onChange={(e) => setLength(Math.max(1, parseInt(e.target.value) || 1))} 
            min="1" 
            max="50" 
            style={{ marginLeft: '10px' }} 
          />
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input 
            type="checkbox" 
            checked={includeUppercase} 
            onChange={(e) => setIncludeUppercase(e.target.checked)} 
          />
          Include Uppercase Letters
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input 
            type="checkbox" 
            checked={includeLowercase} 
            onChange={(e) => setIncludeLowercase(e.target.checked)} 
          />
          Include Lowercase Letters
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input 
            type="checkbox" 
            checked={includeNumbers} 
            onChange={(e) => setIncludeNumbers(e.target.checked)} 
          />
          Include Numbers
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          <input 
            type="checkbox" 
            checked={includeSymbols} 
            onChange={(e) => setIncludeSymbols(e.target.checked)} 
          />
          Include Symbols
        </label>
      </div>

      <button 
        onClick={generatePassword} 
        style={{ 
          width: '100%', 
          padding: '10px', 
          margin: '10px 0', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        Generate Password
      </button>

      {password && (
        <div style={{ margin: '10px 0' }}>
          <label>Generated Password: </label>
          <input 
            type="text" 
            value={password} 
            readOnly 
            style={{ 
              width: '70%', 
              padding: '5px', 
              marginLeft: '10px' 
            }} 
          />
          <button 
            onClick={copyToClipboard} 
            style={{ 
              padding: '5px 10px', 
              marginLeft: '5px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default App
