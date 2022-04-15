import { FC } from 'react';
import {
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
import config from '~/config';
import { useQuery } from 'react-query';

interface UserActivitiesProps {}

const UserActivities: FC<UserActivitiesProps> = () => {
  const { isLoading, error, data, status } = useQuery<IUserActivities, Error>(
    'userActivities',
    async () => {
      try {
        const res = await fetch(`${config.apiUrl}/exercises/user/activity`);
        return await res.json();
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  );

  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <Typography component="p" sx={{ marginBottom: 4, color: red[500] }}>
          An error has occurred: &quot;{error.message}&quot;
        </Typography>
      </>
    );
  }

  return (
    <>
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
                    primary={`${data?.totalCalories}`}
                    secondary="Total calories burnt"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{/*<ImageIcon />*/}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${data?.totalDuration}`}
                    secondary="Total workout time"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{/*<ImageIcon />*/}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${data?.caloriesToBurgers}`}
                    secondary="Calories to burgers"
                  />
                </ListItem>
              </List>
            </Paper>
          </Box>

          <Box>
            {data?.activities.length ? (
              <Paper>
                <List>
                  {data?.activities
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
                          <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
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
                <Typography>No activities yet</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserActivities;
