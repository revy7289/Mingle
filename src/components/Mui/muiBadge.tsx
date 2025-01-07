import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
export default function MuiBadge() {
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
