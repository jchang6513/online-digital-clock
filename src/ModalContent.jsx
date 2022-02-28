import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Box, FormControlLabel, Switch, TextField } from '@mui/material';
import timezones from 'timezones-list';

export const ModalContent = (props) => {
  const { onClose, option, dispatchSetting } = props;
  const timezone = useMemo(() => (
    timezones.find(tz => tz.tzCode === option.timezone)
  ), [option.timezone]);

  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {"Option"}
      </DialogTitle>
      <DialogContent style={{ overflow: 'visible' }}>
        <Box display="flex">
          <Box display="flex" flexDirection="column" mr={2}>
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
            <FormControlLabel
              control={
                <Switch
                  checked={option.second}
                  onChange={() => dispatchSetting({ type: 'toggle-second'})}
                />
              }
              label="顯示秒鐘"
            />
          </Box>
          <Box>
            <Autocomplete
              id="timezone-picker"
              size="small"
              options={timezones}
              value={timezone}
              onChange={(_, value) => {
                if (value) {
                  dispatchSetting({ type: 'set-timezone', payload: value.tzCode });
                }
              }}
              sx={{ width: 320 }}
              renderInput={(params) => <TextField {...params} label="Timezone" />}
              disableClearable
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
