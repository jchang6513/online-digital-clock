import './App.css';
import { useState, lazy, Suspense, useEffect, useReducer } from 'react';
import dayjs from 'dayjs';
import { Box, Dialog, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  customContainer: {
    alignItems: 'flex-start !important',
    justifyContent: 'right !important',
  },
})

const ModalContent = lazy(() => import('./ModalContent.jsx'));

const useDay = (option) => {
  const [day, setDay] = useState(dayjs());

  const resetDay = () => {
    setDay(dayjs());
    window.requestAnimationFrame(resetDay);
  };

  useEffect(() => {
    window.requestAnimationFrame(resetDay);
  }, []);

  let format = '';
  if (option.date) {
    format += 'YYYY-MMM-DD \n';
  }
  if (option.hour24) {
    format += 'HH:mm:ss';
  } else {
    format += 'hh:mm:ss A';
  }

  return {
    ...day,
    ampm: option.hour24 ? '' : day.format('A'),
    clock: option.hour24 ? day.format('HH:mm') : day.format('hh:mm'),
    second: option.second ? day.format('ss') : '',
    date: option.date ? day.format('YY/MM/DD ddd') : '',
  };
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle-date':
      return {
        ...state,
        date: !state.date,
      };
    case 'toggle-24hour':
      return {
        ...state,
        hour24: !state.hour24,
      };
    default:
      throw new Error();
  }
}

const initState = {
  date: true,
  hour24: true,
  second: true,
};


function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mouseMoving, setMouseMoving] = useState(false);
  const [dayOption, dispatch] = useReducer(reducer, initState);
  const classes = useStyles();
  const day = useDay(dayOption);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (mouseMoving) {
      setShowMenu(true);
      const timeout = setTimeout(() => {
        setMouseMoving(false);
      }, 10000);
      return () => clearTimeout(timeout);
    } else {
      setShowMenu(false);
    }
  }, [mouseMoving]);

  return (
    <ThemeProvider theme={darkTheme}>
      <style>@import url('http://fonts.cdnfonts.com/css/digital-numbers');</style>

      <div className="App" onMouseMove={() => {
        setMouseMoving(true);
      }}>
        <header className="App-header">
          <Box display="flex">
            <Typography variant="h1" whiteSpace="break-spaces" fontFamily="Digital Numbers" fontSize={120}>
              {day.clock}
            </Typography>
            <Box display="flex" flexDirection="column" justifyContent="flex-end" ml={2}>
              <Box mb={1}>
                <Typography variant="h4" whiteSpace="break-spaces" fontFamily="Digital Numbers" fontSize={32}>
                  {day.ampm}
                </Typography>
              </Box>
              <Typography variant="h4" whiteSpace="break-spaces" fontFamily="Digital Numbers" fontSize={32}>
                {day.second}
              </Typography>
            </Box>
          </Box>
          <Box mt={3} ml={2}>
            <Typography variant="h3" whiteSpace="break-spaces" fontFamily="Digital Numbers" fontSize={56}>
              {day.date}
            </Typography>
          </Box>
        </header>
        <Box position="fixed" top="18px" right="20px" style={{ opacity: showMenu ? 1 : 0 }}>
          <IconButton onClick={toggleModal}>
            <MenuIcon style={{ fontSize: 32, fill: '#aaa' }} />
          </IconButton>
        </Box>
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{
            container	: classes.customContainer,
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ModalContent
              onClose={() => setShowModal(false)}
              option={dayOption}
              dispatchSetting={dispatch}
            />
          </Suspense>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
