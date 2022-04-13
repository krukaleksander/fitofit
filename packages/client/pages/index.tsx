import type { NextPage } from 'next';
import Router from 'next/router';
import { Button, Container, Typography } from '@mui/material';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectIsUserLoggedIn } from '~/redux/ducks/user';

const HomePage: NextPage = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const dispatch = useDispatch();

  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: 'center', margin: 4 }}
        >
          {config.app.name}
        </Typography>

        <Button
          onClick={async () => {
            if (isUserLoggedIn) {
              dispatch(logout());
            } else {
              dispatch(login());
              await Router.push('/dashboard');
            }
          }}
        >
          {isUserLoggedIn ? 'Log out' : 'Log in'}
        </Button>
        <Button disabled>Register</Button>

        {isUserLoggedIn ? (
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            You are logged in!
          </Typography>
        ) : (
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            You are not logged in!
          </Typography>
        )}
      </Container>
    </>
  );
};

export default HomePage;
