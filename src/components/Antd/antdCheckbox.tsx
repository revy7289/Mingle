import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

export default function AntdCheckbox() {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return <Checkbox onChange={onChange}>Checkbox</Checkbox>;
}
