import { FC, useState } from 'react';
// import Router from 'next/router';
import { Box, Button, Modal, Typography } from '@mui/material';
import { login, logout, selectIsUserLoggedIn } from '~/redux/ducks/user';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '~/components/Auth/RegisterForm';

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
  // redux stuff
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const dispatch = useDispatch();

  // modal stuff
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button
        onClick={async () => {
          // if (isUserLoggedIn) {
          //   dispatch(logout());
          // } else {
          //   dispatch(login());
          //   // TODO (hub33k): uncomment
          //   // await Router.push('/dashboard');
          // }
        }}
      >
        {isUserLoggedIn ? 'Log out' : 'Log in'}
      </Button>
      <Button
        onClick={() => {
          handleOpen();
        }}
      >
        Register
      </Button>

      {isUserLoggedIn ? (
        <>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            You are logged in!
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            You are not logged in!
          </Typography>
          {/*<RegisterForm />*/}
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="register-form-modal"
        aria-describedby="register-form-modal"
      >
        <Box sx={modalStyle}>
          <RegisterForm />
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
