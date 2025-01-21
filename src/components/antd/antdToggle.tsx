import { Switch } from "antd";

export default function AntdToggle() {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return <Switch defaultChecked onChange={onChange} />;
}
