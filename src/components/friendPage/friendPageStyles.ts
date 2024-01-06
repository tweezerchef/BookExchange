import { styled } from '@compiled/react';
import Box from '@mui/material/Box';


export const ProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: 100,
    backgroundColor: '#ffe99bbe',
    boxShadow: theme.shadows[1],
    }));