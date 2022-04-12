import { FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IExerciseFromServer } from 'common';
import config from '~/config';

interface ExerciseAddProps {}

const ExerciseAdd: FC<ExerciseAddProps> = () => {
  const [activitiesList, setActivitiesList] = useState<IExerciseFromServer[]>(
    [],
  );
  const [activitiesListLoaded, setActivitiesListLoaded] = useState(false);

  // ================================================================

  const validationSchema = yup.object({
    activity: yup.number().required('Activity is required'),
    startTime: yup
      .date('Enter a start time')
      .min(new Date(), 'Cannot use past date')
      .required('Start time is required'),
    duration: yup.number('Enter a duration').required('Duration is required'),
  });

  const formik = useFormik({
    initialValues: {
      activity: '',
      startTime: '',
      duration: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  // ================================================================s

  useEffect(() => {
    getActivity();

    async function getActivity() {
      const res = await fetch(`${config.apiUrl}/exercises`);
      const data = await res.json();
      setActivitiesList(data);
      setActivitiesListLoaded(true);
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

            {/* TODO (hub33k): replace FormGroup */}
            <FormGroup sx={{ marginBottom: 4 }}>
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
            </FormGroup>

            <FormGroup sx={{ marginBottom: 4 }}>
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
            </FormGroup>

            <FormGroup sx={{ marginBottom: 4 }}>
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
            </FormGroup>

            <Button type="submit" variant="outlined" fullWidth>
              Add
            </Button>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ExerciseAdd;
