import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          {userInfo ? (
            <>
              <LinkContainer to='/newsfeed'>
                <Navbar.Brand>
                  <i className='fab fa-instagram'></i> InstaClone
                </Navbar.Brand>
              </LinkContainer>
              <Nav>
                <LinkContainer to='/post/new'>
                  <Nav.Link>
                    <i className='far fa-plus-square'></i> New Post
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </>
          ) : (
            <LinkContainer to='/'>
              <Navbar.Brand>
                <i className='fab fa-instagram'></i> InstaClone
              </Navbar.Brand>
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox history={history} />
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='userName'>
                  <LinkContainer to={`/user/${userInfo._id}`}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/settings'>
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      {' '}
                      <i className='fas fa-sign-in-alt'></i> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
