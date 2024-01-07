import { styled } from '@compiled/react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';

interface ProfileBoxProps {
  theme: Theme;
}
export const ProfileBox = styled(Box)<ProfileBoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 1,
  borderRadius: 100,
  backgroundColor: '#ffe99bbe',
  boxShadow:theme.palette.common.black,
}));