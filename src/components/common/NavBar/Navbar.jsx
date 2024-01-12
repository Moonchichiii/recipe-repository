import React, { Suspense, lazy, useState, useContext } from 'react';
import { Button, Container, Navbar, Nav, Form } from 'react-bootstrap';
import { AuthContext }  from '../..//../context/AuthContext';
import './NavBar.module.css'; 


const AuthModal = lazy(() => import('../Modal/AuthModal'));

function NavBar() {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    
   
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">Recipe Repository</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#home">About</Nav.Link>
              <Nav.Link href="#home">Contact</Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link href="#feed">Home</Nav.Link>
                  <Nav.Link href="#liked">Feed</Nav.Link>
                  <Nav.Link href="#liked">Liked</Nav.Link>
                  <Nav.Link href="#liked">Add Post</Nav.Link>
                  <Nav.Link href="#liked">Profile</Nav.Link>
                  <Nav.Link href="#liked">Sign out</Nav.Link>
                  
                </>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            {isAuthenticated ? (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Account
            </Button>
          )}
        </Navbar.Collapse>      
      <Suspense fallback={<div>Loading...</div>}>
        {showModal && (
          <AuthModal show={showModal} handleClose={() => setShowModal(false)} />
        )}
        </Suspense>
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;