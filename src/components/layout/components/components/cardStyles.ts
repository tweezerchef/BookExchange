import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';


export const SideBarCard = styled(Card)({
    width: 250,
    height: 150,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

});

export const ReviewBox = styled(Box)({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    width:'100%',
})
