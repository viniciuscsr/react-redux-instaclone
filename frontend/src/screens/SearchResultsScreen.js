import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardColumns } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { searchUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const SearchResultsScreen = ({ match }) => {
  const keyword = match.params.keyword;

  console.log(keyword);

  const dispatch = useDispatch();

  const userSearch = useSelector((state) => state.userSearch);
  const { loading, users, error } = userSearch;

  useEffect(() => {
    dispatch(searchUser(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <CardColumns>
        {users &&
          users.map((user) => (
            <Card key={user._id}>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.posts.length} Posts</Card.Text>
                <Card.Text>{user.followers.length} Followers</Card.Text>
                <Card.Text>{user.following.length} Following</Card.Text>
                <LinkContainer to={`/user/${user._id}`}>
                  <Button variant='primary'>View Profile</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          ))}
      </CardColumns>
    </>
  );
};

export default SearchResultsScreen;
