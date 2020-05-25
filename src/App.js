import React from 'react';
import './App.css';
import Treegraph from './Treegraph';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Navbar';
function App() {
  return (
    <div>
      <MyNavbar />
      <Treegraph />
    </div>
  );
}

export default App;
