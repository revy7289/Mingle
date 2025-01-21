import { Collapse, Button, Box } from "@mui/material";
import { useState } from "react";

export default function MuiCollapse() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(!open)}>
        {open ? "Hide Content" : "Show Content"}
      </Button>
      <Collapse in={open}>
        <Box mt={2} p={2} bgcolor="lightblue">
          This is collapsible content!
        </Box>
      </Collapse>
    </Box>
  );
}
