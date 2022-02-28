import { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Header } from './Header';
import { useDayOption } from './useDayOption';
import { useDay } from './useDay';
import { Theme } from './Theme';
import { OptionDialog } from './OptionDialog';
import { useMouseMoving } from './useMouseMoving';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [mouseMoving, onMouseMove] = useMouseMoving();
  const [dayOption, dispatch] = useDayOption();
  const day = useDay(dayOption);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Theme>
      <div className="App" onMouseMove={onMouseMove}>
        <Header day={day} />
        <Box position="fixed" top="18px" right="20px" style={{ opacity: mouseMoving ? 1 : 0 }}>
          <IconButton onClick={toggleModal}>
            <MenuIcon style={{ fontSize: 32, fill: '#aaa' }} />
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
