import { getNodesBounds, getViewportForBounds, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { ImageDown } from "lucide-react";

/**
 * @param dataUrl 이미지를 base64 encode하여 전달하기 때문에 string type
 */
function download(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "mingle.png");
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
    <button
      className="w-[28px] h-[28px] bg-[#767676] rounded-[4px] flex justify-center items-center"
      onClick={onClickDownload}
    >
      <ImageDown color="#fff" size={20} />
    </button>
  );
}
