import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Header } from './Header';
import { useDayOption } from './useDayOption';
import { Theme } from './Theme';
import { OptionDialog } from './OptionDialog';
import { useMouseMoving } from './useMouseMoving';

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [mouseMoving, onMouseMove] = useMouseMoving();
  const [dayOption, dispatch] = useDayOption();

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const payload = JSON.parse(
      decodeURI(new URLSearchParams(window.location.search).get('option'))
    );
    dispatch({ type: 'set', payload })
  }, [dispatch]);

  return (
    <Theme>
      <div className="App" onMouseMove={onMouseMove}>
        <Header dayOption={dayOption} />
        <Box
          position="fixed"
          top="18px"
          right="20px"
          display="flex"
          flexDirection="column"
          style={{ opacity: mouseMoving ? 1 : 0 }}
        >
          <IconButton onClick={toggleModal} style={{ marginBottom: 8 }}>
            <MenuIcon style={{ fontSize: 32, fill: '#aaa' }} />
          </IconButton>
          <IconButton onClick={() => toggleFullScreen()}>
            <FullscreenIcon style={{ fontSize: 32, fill: '#aaa' }} />
          </IconButton>
        </Box>
        <OptionDialog
          open={showModal}
          onClose={() => setShowModal(false)}
          option={dayOption}
          dispatchSetting={dispatch}
        />
      </div>
    </Theme>
  );
}

export default App;
