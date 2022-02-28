import React from 'react';
import { Box, Typography } from '@mui/material';
import { useClock } from './useClock';

export const Header = (props) => {
  const { dayOption } = props;
  const clock = useClock(dayOption);

  return (
    <Box sx={{
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }}>
      <Box display="flex">
        <Typography variant="h1" fontSize={180}>
          {clock.time}
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="flex-end" ml={2}>
          <Box mb={1}>
            <Typography variant="h1" fontSize={50}>
              {clock.ampm}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="h1" fontSize={50}>
              {clock.second}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={3} ml={2}>
        <Typography variant="h1" fontSize={84}>
          {clock.date}
        </Typography>
      </Box>
    </Box>
  )
}
