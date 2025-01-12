import { ListRestart } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function CleanupPanel<NodeBase>({
  initialNodes,
  setNodes,
}: {
  initialNodes: NodeBase[];
  setNodes: Dispatch<SetStateAction<NodeBase[]>>;
}) {
  function onClickCleanup() {
    window.history.pushState({}, "", window.location.pathname);
    setNodes(initialNodes);
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
