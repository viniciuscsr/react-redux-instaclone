import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i class='fab fa-instagram'></i> InstaClone
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/newsfeed'>
                <Nav.Link>News Feed</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-auto'>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i class='fas fa-sign-in-alt'></i> Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signup'>
                <Nav.Link>
                  <i class='fas fa-user-plus'></i> Sign Up
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
