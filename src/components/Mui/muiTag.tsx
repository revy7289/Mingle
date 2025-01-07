import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function MuiTag() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Tag Filled" />
      {/* <Chip label="Chip Outlined" variant="outlined" /> */}
    </Stack>
  );
}
