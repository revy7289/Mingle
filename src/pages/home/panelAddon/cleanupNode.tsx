import { ListRestart } from "lucide-react";

export default function CleanupPanel({ setNodes }) {
  function onClickCleanup() {
    window.history.pushState({}, "", window.location.pathname);
    setNodes([
      {
        id: "node-00",
        type: "SiteSearch",
        position: { x: 0, y: 0 },
      },
    ]);
  }

  return (
    <button
      className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
      onClick={onClickCleanup}
    >
      <ListRestart color="#fff" size={20} />
    </button>
  );
}
