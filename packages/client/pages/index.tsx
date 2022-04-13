import type { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import config from '~/config';
import Auth from '~/components/Auth/Auth';

const HomePage: NextPage = () => {
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

        <Auth />
      </Container>
    </>
  );
};

export default HomePage;
