import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import NewsFeed from './screens/NewsFeed';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/newsfeed' component={NewsFeed} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/post/:id' component={PostScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
