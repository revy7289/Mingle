import { Node, ReactFlowInstance, useReactFlow } from "@xyflow/react";
import { History as Undo, Save } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";

export default function SavePanel<NodeBase extends Node>({
  savedNode,
  setNodes,
}: {
  savedNode: ReactFlowInstance<NodeBase>;
  setNodes: Dispatch<SetStateAction<NodeBase[]>>;
}) {
  const { setViewport } = useReactFlow();

  const onClickSave = useCallback(() => {
    if (savedNode) {
      const node = savedNode.toObject();
      sessionStorage.setItem("savedNode", JSON.stringify(node));
    }
  }, [savedNode]);

  const onClickRestore = useCallback(() => {
    const restoreNode = async () => {
      const node = JSON.parse(sessionStorage.getItem("savedNode") || "");

      if (node) {
        const { x = 0, y = 0, zoom = 1 } = node.viewport;
        setNodes(node.nodes || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreNode();
  }, [setNodes, setViewport]);

  return (
    <div className="flex gap-[4px]">
      <button
        className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
        onClick={onClickSave}
      >
        <Save color="#fff" size={20} />
      </button>

      <button
        className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
        onClick={onClickRestore}
      >
        <Undo color="#fff" size={20} />
      </button>
    </div>
  );
}
