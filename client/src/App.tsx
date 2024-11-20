// Imports
import { useEffect } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  // Event handler to perform action upon the apps initial render
  useEffect(() => {
    document.body.classList.add('body-page-center');
  }, []);
  return (
    <div style={{
      minWidth: "100%",
      maxWidth: "800px",
    }}>
      <h1>TestVar</h1>
      <h3>API URL: {import.meta.env.API_URL}</h3>
    </div>
  )
}

export default App;
