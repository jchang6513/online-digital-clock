import React from 'react';
import { Box, Typography } from '@mui/material';

export const Header = (props) => {
  const { day } = props;

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
          {day.clock}
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="flex-end" ml={2}>
          <Box mb={1}>
            <Typography variant="h1" whiteSpace="break-spaces" fontSize={60}>
              {day.ampm}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="h1" fontSize={60}>
              {day.second}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={3} ml={2}>
        <Typography variant="h1" fontSize={86}>
          {day.date}
        </Typography>
      </Box>
    </Box>
  )
}
