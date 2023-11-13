import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


export const SideBarCard = styled(Card)({
    width: 180,
    height: 140,
    padding:1,
    margin:1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(0deg, rgba(195, 34, 74, 0.205) 0%, rgba(248, 226, 153, 0.315) 100%)" ,
    '&:hover': {
        background: "linear-gradient(0deg, rgba(215, 54, 94, 0.3) 0%, rgba(253, 236, 163, 0.35) 100%)",
        transform: 'translateY(-5px)',
        // Optionally add a box-shadow for more depth
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
      }

});

export const ReviewBox = styled(Box)({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'98%',
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
    margin: 8,
    cursor: 'pointer',
})

