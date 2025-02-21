import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
// import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState('');

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setMessage('Sending request...');
      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);  // Replace with deployed backend URL
      setResponse(res.data);
      setMessage('Request successful!');
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Invalid JSON or server error!');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="response-container">
        <h3>API Response:</h3>
        <p><strong>User ID:</strong> {response.user_id}</p>
        <p><strong>Email:</strong> {response.email}</p>
        <p><strong>Roll Number:</strong> {response.roll_number}</p>
        {selectedOptions.length > 0 && (
          <div className="filtered-response">
            <h4>Filtered Data:</h4>
            {selectedOptions.map((opt) => (
              <p key={opt.value}>
                <strong>{opt.label}:</strong> {response[opt.value]?.join(', ') || 'None'}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h2>BFHL Challenge</h2>
      <p>Enter a valid JSON payload as per the API requirements.</p>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON (e.g., { "data": ["A", "1", "B"] })'
      />
      <button onClick={handleSubmit}>Submit</button>
      {message && <p className="status-message">{message}</p>}
      <Select
        options={options}
        isMulti
        onChange={setSelectedOptions}
        placeholder="Select data to display"
      />
      {renderResponse()}
    </div>
  );
}

export default App;
