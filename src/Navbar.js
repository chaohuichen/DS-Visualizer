import React from 'react';
import { Navbar } from 'react-bootstrap';

function MyNavbar() {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>DS-Visualizer</Navbar.Brand>
      </Navbar>
    </>
  );
}

export default MyNavbar;
