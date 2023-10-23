import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 1000
};


interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
        <>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {message}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </>
    )
}

export default Popup;