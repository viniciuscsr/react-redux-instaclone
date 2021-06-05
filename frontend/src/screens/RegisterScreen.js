import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { registerUser } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/newsfeed';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUser(name, email, password));
    } else {
      setMessage('Passwords do not match');
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={6} lg={4} className='visible-lg'>
          <Image
            src='/images/mobile-app-image-login-page.png'
            id='login-page-image'
          />
        </Col>
        <Col xs={12} md={6} lg={4} className='border p-4 white-background'>
          <Image
            className='img-fluid mx-auto d-block py-3'
            src='/images/instaclone-logo-dark.png'
            style={{ width: '12rem' }}
          />
          <h5 className='text-center my-3 '>Sign Up</h5>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Control
                style={{ backgroundColor: 'WhiteSmoke' }}
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Control
                style={{ backgroundColor: 'WhiteSmoke' }}
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control
                style={{ backgroundColor: 'WhiteSmoke' }}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Control
                style={{ backgroundColor: 'WhiteSmoke' }}
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' block>
              Sign up
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                <strong>Login</strong>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className='text-center'>OR </p>
              <Link to='/newsfeed'>
                <Button variant='secondary' block>
                  Continue as a Guest
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
