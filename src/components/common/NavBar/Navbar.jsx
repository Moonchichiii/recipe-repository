import React, { Suspense, lazy, useState, useContext } from 'react';
import { Button, Container, Navbar, Nav, Form, Offcanvas } from 'react-bootstrap';
import { AuthContext }  from '../..//../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faHeart, faPlusSquare, faUserCircle, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import './NavBar.module.css'; 


const AuthModal = lazy(() => import('../Modal/AuthModal'));

function NavBar() {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
   
   
    return (
        <>
          {[false,  'xxl'].map((expand) => (
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
              <Container fluid>
              <Navbar.Brand className='navbar-brand' href="/"><strong>Recipe Repository</strong></Navbar.Brand> 
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='navbar-brand' href="/">
                 <strong>Recipe Repository</strong>
                </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">

                    <Nav.Link href="#feed"><FontAwesomeIcon icon={faHome}  className='me-1' />Home</Nav.Link>
                  <Nav.Link href="#home">About</Nav.Link>
                  <Nav.Link href="#home">Contact</Nav.Link>
                  {isAuthenticated && (
                    <>
                      <Nav.Link href="#feed"><FontAwesomeIcon icon={faHome}  className='me-1' />Home</Nav.Link>
                      <Nav.Link href="#liked"><FontAwesomeIcon icon={faList} className='me-1' />Feed</Nav.Link>
                      <Nav.Link href="#liked"><FontAwesomeIcon icon={faHeart} className='me-1' />Liked</Nav.Link>
                      <Nav.Link href="#liked"><FontAwesomeIcon icon={faPlusSquare} className='me-1' />Add Post</Nav.Link>
                      <Nav.Link href="#liked"><FontAwesomeIcon icon={faUserCircle} className='me-1' /> Profile</Nav.Link>                  
                      
                    </>
                  )}                  
                    </Nav>
                    <Form className="d-flex search-container">
                
                <Form.Control
                    type="search"
                    placeholder="Search..."                    
                    aria-label="Search"
                />
                <Button className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </Button>            
        </Form>      
    
            {isAuthenticated ? (
                
                 <Nav.Link onClick={handleLogout} className='accounts-link'><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</Nav.Link>    
                
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} className='accounts-link'><FontAwesomeIcon icon={faUserCircle} className='me-1' /> Accounts</Nav.Link>
                
              )}
             
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Suspense fallback={<div>Loading...</div>}>
            {showModal && (
              <AuthModal show={showModal} handleClose={() => setShowModal(false)} />
            )}
            </Suspense>
              </Container>
            </Navbar>
          ))}
        </>
      );
    }
    
    export default NavBar;