import { Button, Stack } from "@mui/material";

export default function MuiButton() {
  
  return (
    <Stack spacing={2} direction="row">
      {/* <Button variant="text">Text</Button> */}
      <Button variant="contained">Contained</Button>
      {/* <Button variant="outlined">Outlined</Button> */}
    </Stack>
  );
}