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
import UserActivities from '~/components/UserActivities';

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
            <Container
              maxWidth="sm"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{config.app.name}</Typography>
              <Button onClick={handleOpen}>Add exercise</Button>
            </Container>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="sm"
          sx={{
            padding: 4,
          }}
        >
          <UserActivities />
        </Container>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            <ExerciseAdd handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DashboardPage;
