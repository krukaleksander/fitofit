import { FC, useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { IUserActivities, IUserActivity } from 'common';
import { fetchUserAllActivities } from '~/redux/ducks/userActivities';
import { useAppDispatch } from '~/redux/hooks';

interface UserActivitiesProps {}

const UserActivities: FC<UserActivitiesProps> = () => {
  const [userActivities, setUserActivities] = useState<IUserActivities>({
    totalDuration: 0,
    totalCalories: 0,
    caloriesToBurgers: 0,
    activities: [],
  });
  const [activitiesLoaded, setActivitiesLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    getActivities();

    async function getActivities() {
      try {
        // TODO (hub33k): rerender this component when new exercise is added
        // TODO (hub33k): for now use any; change it later
        const response: any = await dispatch(fetchUserAllActivities()).unwrap();
        setUserActivities(response);
        setActivitiesLoaded(true);
      } catch (err) {
        console.error(err);
        setErrorMessage('Failed to fetch data from server');
      }
    }
  }, [dispatch]);

  return (
    <>
      {activitiesLoaded ? (
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: 'center', margin: 4 }}
          >
            User Activities
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                marginBottom: 4,
              }}
            >
              <Paper
                sx={{
                  padding: 2,
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Summary
                </Typography>
                <List
                  sx={{
                    width: '100%',
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{/*<ImageIcon />*/}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${userActivities.totalCalories}`}
                      secondary="Total calories burnt"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{/*<ImageIcon />*/}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${userActivities.totalDuration}`}
                      secondary="Total workout time"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{/*<ImageIcon />*/}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${userActivities.caloriesToBurgers}`}
                      secondary="Calories to burgers"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Box>

            <Box>
              {userActivities.activities.length ? (
                <Paper>
                  <List>
                    {Array.from(userActivities.activities)
                      .sort((a: IUserActivity, b: IUserActivity) => {
                        return (
                          new Date(b.start).getTime() -
                          new Date(a.start).getTime()
                        );
                      })
                      .map((activity: IUserActivity) => {
                        const isPast =
                          new Date(activity.start).getTime() < Date.now();

                        return (
                          <ListItemButton
                            key={activity.activityID}
                            disabled={isPast}
                          >
                            <ListItemIcon sx={{ fontSize: 20 }}>
                              🔥
                            </ListItemIcon>
                            <ListItemText
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: 'medium',
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Box component="span">{activity.name}</Box>
                                <Box component="span">
                                  {new Date(activity.start).toLocaleString()}
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  color: 'text.secondary',
                                  marginTop: 0.5,
                                }}
                              >
                                {activity.durationInMinutes} minutes
                              </Box>
                            </ListItemText>
                          </ListItemButton>
                        );
                      })}
                  </List>
                </Paper>
              ) : (
                <>
                  <Alert severity="warning">
                    You have no exercises planned. Let&apos;s add one by
                    clicking &quot;Add exercise&quot; at the appbar.
                  </Alert>
                </>
              )}
            </Box>
          </Box>
        </Box>
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
            <Typography component="p" sx={{ marginBottom: 4, color: red[500] }}>
              {errorMessage}
            </Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
      )}
    </>
  );
};

export default UserActivities;
