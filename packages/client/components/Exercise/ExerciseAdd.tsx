import { FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IActivity, IExerciseFromServer } from 'common';
import config from '~/config';

interface ExerciseAddProps {
  handleClose: () => void;
}

const ExerciseAdd: FC<ExerciseAddProps> = ({ handleClose }) => {
  const [activitiesList, setActivitiesList] = useState<IExerciseFromServer[]>(
    [],
  );
  const [activitiesListLoaded, setActivitiesListLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  // ================================================================

  const validationSchema = yup.object({
    activity: yup.number().required('Activity is required'),
    startTime: yup
      .date()
      .min(new Date(), 'Cannot use past date')
      .required('Start time is required'),
    duration: yup.number().required('Duration is required'),
  });

  const formik = useFormik({
    initialValues: {
      activity: '',
      startTime: '',
      duration: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const activity = activitiesList.find(
        (activity) => activity.id === Number(values.activity),
      );

      if (!activity) {
        return;
      }

      const request: IActivity = {
        exerciseID: Number(values.activity),
        userID: 1, // NOTE (hub33k): for now hardcoded
        name: activity.name,
        start: new Date(values.startTime),
        durationInMinutes: Number(values.duration),
        isDone: false,
      };

      console.log(request);

      fetch(`${config.apiUrl}/exercises/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      // TODO (hub33k): reset form properly
      resetForm();

      handleClose();
    },
  });

  // ================================================================s

  useEffect(() => {
    getActivity();

    async function getActivity() {
      try {
        const res = await fetch(`${config.apiUrl}/exercises`);
        const data = await res.json();
        setActivitiesList(data);
        setActivitiesListLoaded(true);
      } catch (err) {
        setErrorMessage('Failed to fetch data from server');
      }
    }
  }, []);

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          margin: 4,
        }}
      >
        {activitiesListLoaded ? (
          <>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Add exercise
            </Typography>

            <Box
              sx={{
                marginBottom: 4,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
            >
              <Autocomplete
                disablePortal
                id="activities"
                options={activitiesList}
                getOptionLabel={(option) =>
                  `${option.name} (${option.cal} cal/h)`
                }
                onChange={(event, value) => {
                  formik.setFieldValue('activity', value?.id);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    id="activity"
                    name="activity"
                    label="Activity"
                    // formik stuff
                    value={formik.values.activity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.activity && Boolean(formik.errors.activity)
                    }
                    helperText={
                      formik.touched.activity && formik.errors.activity
                    }
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                marginBottom: 4,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start time"
                  value={formik.values.startTime}
                  onChange={(date) => {
                    if (!date) return;
                    formik.setFieldValue('startTime', date);
                  }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      // formik stuff
                      error={
                        formik.touched.startTime &&
                        Boolean(formik.errors.startTime)
                      }
                      helperText={
                        formik.touched.startTime && formik.errors.startTime
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box
              sx={{
                marginBottom: 4,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
            >
              <TextField
                fullWidth
                id="duration"
                name="duration"
                label="Duration (in minutes)"
                variant="outlined"
                type="number"
                // formik stuff
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </Box>

            <Button type="submit" variant="outlined" fullWidth>
              Add
            </Button>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {errorMessage ? (
              <Typography
                component="p"
                sx={{ marginBottom: 4, color: red[500] }}
              >
                {errorMessage}
              </Typography>
            ) : (
              <CircularProgress />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ExerciseAdd;
