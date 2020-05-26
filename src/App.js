import React from 'react';
import './App.css';
// import Treegraph from './Treegraph';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Navbar';
import D3Tree from './D3Tree';
function App() {
  return (
    <div>
      <MyNavbar />
      {/* <Treegraph /> */}
      <D3Tree />
    </div>
  );
}

export default App;
