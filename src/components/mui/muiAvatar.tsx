import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

export default function MuiAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      {/* <Avatar>H</Avatar> */}
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar> */}
    </Stack>
  );
}
