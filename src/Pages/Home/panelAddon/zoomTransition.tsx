import { useStoreApi, useReactFlow } from "@xyflow/react";
import { Fullscreen as Fit, Minus, Plus } from "lucide-react";

export default function ZoomPanel() {
  const { zoomIn, zoomOut, setCenter } = useReactFlow();
  const store = useStoreApi();

  const focusCenter = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];
      console.log(node);

      const x = node.position.x + (node.measured.width || 0) / 2;
      const y = node.position.y + (node.measured.height || 0) / 2;
      const zoom = 1;

      setCenter(x, y, { zoom, duration: 500 });
    }
  };

  return (
    <div className="flex gap-[4px]">
      <button
        className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
        onClick={() => zoomIn({ duration: 500 })}
      >
        <Plus color="#fff" size={20} />
      </button>

      <button
        className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
        onClick={() => zoomOut({ duration: 500 })}
      >
        <Minus color="#fff" size={20} />
      </button>

      <button
        className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
        onClick={focusCenter}
      >
        <Fit color="#fff" size={20} />
      </button>
    </div>
  );
}
