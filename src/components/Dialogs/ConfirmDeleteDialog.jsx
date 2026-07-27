import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Group</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this group? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteHandler} color='error' variant="contained">Delete</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog