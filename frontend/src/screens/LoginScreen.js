import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { loginUser } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

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
    dispatch(loginUser(email, password));
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
            className='img-fluid mx-auto d-block py-5'
            src='/images/instaclone-logo-dark.png'
            style={{ width: '12rem' }}
          />
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Control
                style={{ backgroundColor: 'WhiteSmoke' }}
                type='email'
                placeholder='Email'
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
            <Button type='submit' variant='primary' block>
              Sign in
            </Button>
          </Form>
          <Row className='py-5'>
            <Col>
              Don't have an account?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                <strong>Sign Up</strong>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              or{' '}
              <Link to='/newsfeed'>
                <strong>Continue as a Guest</strong>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
