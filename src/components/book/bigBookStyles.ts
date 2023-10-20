import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CenteredModal = styled(Dialog)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;

    .MuiDialog-paper {
    position: absolute;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
    max-width: 800px;
    z-index: 999;
    background-color: rgba(215, 240, 255, 0.897);
    }
  }
`;
export const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;