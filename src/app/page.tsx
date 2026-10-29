import { Box, Button, colors, Typography } from "@mui/material";
import RevolverShells from "@/components/Animations/RevolverCylinder";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        justifyContent: "space-around",
        alignItems: "center",
        // gap: "25dvh",
      }}
    >
      <Box
        sx={{
          height: 220,
          width: 320,
          backgroundColor: colors.blue[500],
          borderRadius: 7,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "ClashDisplay",
            fontWeight: 700,
            fontSize: 45,
          }}
        >
          Shtirblitz
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontFamily: "ClashGrotesk", fontSize: 18 }}>
            You are ready?
          </Typography>
          <Button
            sx={{
              height: 45,
              width: 160,
              backgroundColor: colors.blue[200],
              borderRadius: 3,
              fontFamily: "ClashGrotesk",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Play
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: 320 }}>
        <RevolverShells />
      </Box>
    </Box>
  );
}
