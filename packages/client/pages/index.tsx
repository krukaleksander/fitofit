import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import config from '~/config';

const HomePage: NextPage = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: 'center', margin: 4 }}
      >
        {config.app.name}
      </Typography>
    </>
  );
};

export default HomePage;
