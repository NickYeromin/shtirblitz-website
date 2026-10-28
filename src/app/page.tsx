import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return <Box sx={{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }}>
    <Box sx={{
      display:'flex',
      flexDirection:'col',
      width:200,
      height:150,
      justifyContent:'center',
      alignItems:'center',
      background:'blue',
    }}>
    <Typography>Shtirblitz</Typography>
    <Button
    sx={{
      width:80,
      height:40,
      borderRadius:3,
      background:'aqua'

    }}
    >
      <Typography>Game</Typography>
      </Button></Box>
  </Box>;
}
