import './App.css';

import RegistrationForm from './pages/Registration';

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
