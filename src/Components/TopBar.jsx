import React from 'react'
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import UseLogout from '../Hooks/UseLogout';

function TopBar() {
  let logout = UseLogout();
  return <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand  style={{marginLeft: '10px'}}><Link to='/home' className='non-link'>URL Shortner</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to='/month' className='non-link'>Month Data</Link></Nav.Link>
            <Nav.Link><Link to='/date' className='non-link'>Day Data</Link></Nav.Link>
          </Nav>
          <Button variant='danger' className='mr-10' onClick={()=>logout()}>Logout</Button>
        </Navbar.Collapse>
    </Navbar>
  </>
}

export default TopBar