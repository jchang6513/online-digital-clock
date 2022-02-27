import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControlLabel, Switch } from '@mui/material';

export const ModalContent = (props) => {
  const { onClose, option, dispatchSetting } = props;
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {"Option"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex">
          <Box display="flex" flexDirection="column">
            <FormControlLabel
              control={
                <Switch
                  checked={option.date}
                  onChange={() => dispatchSetting({ type: 'toggle-date'})}
                />
              }
              label="顯示日期"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={option.hour24}
                  onChange={() => dispatchSetting({ type: 'toggle-24hour'})}
                />
              }
              label="24小時制"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="顯示日期"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="24小時制"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Reset</Button>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </>
  );
};

export default ModalContent;
