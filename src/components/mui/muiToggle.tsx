import Switch from "@mui/material/Switch";

export default function MuiToggle() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div>
      <Switch {...label} defaultChecked />
      {/* <Switch {...label} /> */}
      {/* <Switch {...label} disabled defaultChecked /> */}
      {/* <Switch {...label} disabled /> */}
    </div>
  );
}
