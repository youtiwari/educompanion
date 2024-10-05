import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

function StandaloneDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* This button can be placed anywhere to trigger the dialog */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Chapter Information</DialogTitle>
        <DialogContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. 
            Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam. Sed at 
            ligula quis turpis auctor euismod.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StandaloneDialog;
