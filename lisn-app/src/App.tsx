import {useState, useEffect} from 'react';
import Home from './Components/Home/Home';
import ThemeToggle from './Components/Toggle/ThemeToggle';

function App() {
  useEffect(() => {
    localStorage.setItem('theme', 'dark')
  },[])
  return (
    <>
      <Home/>
      <ThemeToggle/>
    </>
  );
}

export default App;
