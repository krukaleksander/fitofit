import type { NextPage } from 'next';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Modal,
} from '@mui/material';
import config from '~/config';
import ExerciseAdd from '~/components/Exercise/ExerciseAdd';

const DashboardPage: NextPage = () => {
  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Container maxWidth="lg">
              <Typography>{config.app.name}</Typography>
            </Container>

            <Button onClick={handleOpen}>Add exercise</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute' as 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <ExerciseAdd handleClose={handleClose} />
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="md"
          sx={{
            padding: 4,
          }}
        >
          <Typography component="p" variant="h5" sx={{ textAlign: 'center' }}>
            This is awesome dashboard
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default DashboardPage;
