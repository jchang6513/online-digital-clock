import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import timezones from 'timezones-list';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const ModalContent = (props) => {
  const { option, dispatchSetting } = props;
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
        <CopyToClipboard text={`${window.location.origin}?option=${encodeURI(JSON.stringify(option))}`}>
          <Button>Get Link</Button>
        </CopyToClipboard>
        <Button onClick={() => dispatchSetting({ type: 'reset' })}>Reset</Button>
      </DialogActions>
    </>
  );
};

export default ModalContent;
