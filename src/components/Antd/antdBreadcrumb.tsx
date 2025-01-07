import { Breadcrumb } from "antd";

export default function AntdBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: "An Application",
        },
      ]}
    />
  );
}
