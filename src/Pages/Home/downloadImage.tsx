import { getNodesBounds, getViewportForBounds, Panel, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { ImageDown } from "lucide-react";

function download(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

export default function DownloadPanel() {
  const { getNodes } = useReactFlow();

  const onClickDownload = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2, 0);

    toPng(document.querySelector(".react-flow__viewport") as HTMLElement, {
      backgroundColor: "transparent",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}`,
        height: `${imageHeight}`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(download);
  };

  return (
    <Panel position="top-right">
      <button
        className="w-[40px] h-[40px] bg-[#767676] rounded-lg flex justify-center items-center"
        onClick={onClickDownload}
      >
        <ImageDown color="#fff" />
      </button>
    </Panel>
  );
}
