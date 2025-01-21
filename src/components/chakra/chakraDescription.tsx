import { DataListItem, DataListRoot } from "@/components/ui/data-list";

const stats = [
  { label: "New Users", value: "234", diff: -12, helpText: "Till date" },
  { label: "Sales", value: "£12,340", diff: 12, helpText: "Last 30 days" },
  { label: "Revenue", value: "3,450", diff: 4.5, helpText: "Last 30 days" },
];

export default function ChakraDescription() {
  return (
    <DataListRoot orientation="horizontal">
      {stats.map((item) => (
        <DataListItem key={item.label} label={item.label} value={item.value} />
      ))}
    </DataListRoot>
  );
}
