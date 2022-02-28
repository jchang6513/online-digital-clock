import { lazy, Suspense } from 'react';
import { Dialog } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const ModalContent = lazy(() => import('./ModalContent.jsx'));

const useStyles = makeStyles({
  customContainer: {
    alignItems: 'flex-start !important',
    justifyContent: 'right !important',
  },
})

export const OptionDialog = (props) => {
  const { open, onClose, option, dispatchSetting } = props;
  const { customContainer } = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        container	: customContainer,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ModalContent
          onClose={onClose}
          option={option}
          dispatchSetting={dispatchSetting}
        />
      </Suspense>
    </Dialog>
  )
}
