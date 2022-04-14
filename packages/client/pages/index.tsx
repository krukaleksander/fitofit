import type { NextPage } from 'next';
import {
  alpha,
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';
import config from '~/config';
import Auth from '~/components/Auth';
import theme from '~/config/theme';
import { useState } from 'react';
import RegisterForm from '~/components/Auth/RegisterForm';
import LoginForm from '~/components/Auth/LoginForm';

const HomePage: NextPage = () => {
  // modal stuff
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setOpenRegisterModal(false);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

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
      <Box
        sx={{
          background:
            '#121212 url(https://picsum.photos/seed/picsum/1920/1080) no-repeat center',
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
          }}
        >
          <Box
            sx={{
              boxShadow: 4,
              bgcolor: `${alpha(theme.palette.background.paper, 0.4)}`,
              borderRadius: '4px',
              width: '100%',
              padding: 8,
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 8 }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                {config.app.name}
              </Typography>
              <Typography variant="h4">Best fit app in the world</Typography>
            </Box>

            <ButtonGroup
              size="large"
              variant="contained"
              aria-label="outlined button group"
              sx={{ boxShadow: 0 }}
            >
              <Button
                onClick={() => {
                  handleOpenLoginModal();
                }}
                sx={{ mr: 4 }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  handleOpenRegisterModal();
                }}
              >
                Join us now!
              </Button>
            </ButtonGroup>
          </Box>
        </Container>
      </Box>

      <Modal
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
        aria-labelledby="register-form-modal"
        aria-describedby="register-form-modal"
      >
        <Box sx={modalStyle}>
          <RegisterForm />
        </Box>
      </Modal>

      <Modal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        aria-labelledby="register-form-modal"
        aria-describedby="register-form-modal"
      >
        <Box sx={modalStyle}>
          <LoginForm />
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;
