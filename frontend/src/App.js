import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import PostScreen from './screens/PostScreen';
import NewsFeed from './screens/NewsFeed';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditPostScreen from './screens/EditPostScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/newsfeed' component={NewsFeed} />
            <Route path='/' component={LoginScreen} exact />
            <Route
              path='/search/:keyword'
              component={SearchResultsScreen}
              exact
            />
            <Route path='/post/new' component={CreatePostScreen} exact />
            <Route path='/post/:postId/edit' component={EditPostScreen} />
            <Route path='/post/:postId' component={PostScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/user/:userId' component={ProfileScreen} />
            <Route path='/settings' component={SettingsScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
