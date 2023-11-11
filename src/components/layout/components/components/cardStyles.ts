import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


export const SideBarCard = styled(Card)({
    width: 275,
    height: 150,
    padding:0,
    margin:0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

});

export const ReviewBox = styled(Box)({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height: 240,
    width:'100%',
})

export const ReviewPopOver = styled(Popover)({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    p:2,
    '.MuiPopover-paper': {
        overflowY: 'auto',
        width: '400px',
        maxHeight: '200px',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
    },
    backgroundColor: 'transparent',
})

export const ReviewTypography = styled(Typography)({
    backgroundColor: '#ffffe0ce',
    p: 4,
    margin: 4,
})

