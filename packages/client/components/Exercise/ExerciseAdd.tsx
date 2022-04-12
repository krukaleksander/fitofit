import * as React from 'react';
import { FC, FormEvent, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormGroup,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { IExerciseFromServer } from 'common';
import config from '~/config';

interface ExerciseAddProps {}

const ExerciseAdd: FC<ExerciseAddProps> = () => {
  const [activitiesList, setActivitiesList] = useState<IExerciseFromServer[]>(
    [],
  );
  const [activitiesListLoaded, setActivitiesListLoaded] = useState(false);

  // Stuff to send to the server
  const [activity, setActivity] = useState<number>(NaN);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(NaN);

  useEffect(() => {
    getActivity();

    async function getActivity() {
      const res = await fetch(`${config.apiUrl}/exercises`);
      const data = await res.json();
      setActivitiesList(data);
      setActivitiesListLoaded(true);
    }
  }, []);

  // TODO (hub33k): add validation
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(activity);
    console.log(startTime);
    console.log(duration);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          margin: 4,
        }}
      >
        {activitiesListLoaded ? (
          <>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Add exercise
            </Typography>

            <FormGroup sx={{ marginBottom: 4 }}>
              <Autocomplete
                disablePortal
                id="activities"
                options={activitiesList}
                getOptionLabel={(option) =>
                  `${option.name} (${option.cal} cal/h)`
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => {
                  if (value) {
                    setActivity(value?.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Activity" />
                )}
              />
            </FormGroup>

            <FormGroup sx={{ marginBottom: 4 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start time"
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                />
              </LocalizationProvider>
            </FormGroup>

            <FormGroup sx={{ marginBottom: 4 }}>
              <TextField
                id="duration"
                label="Duration (in minutes)"
                variant="outlined"
                onChange={(e) => {
                  setDuration(Number(e.target.value));
                }}
                type="number"
              />
            </FormGroup>

            <Button type="submit" variant="outlined" sx={{ width: '100%' }}>
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
