import { getViewportForBounds, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { ImageDown } from "lucide-react";

export default function DownloadPanel() {
  const { getNodes, getNodesBounds } = useReactFlow();

  const onClickDownload = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      nodesBounds.width,
      nodesBounds.height,
      0.5,
      2,
      0
    );

    const target = document.querySelector(".react-flow__viewport");
    const images = target?.querySelectorAll("img");

    const loadImages = Array.from(images || []).map((img) => {
      return new Promise((resolve, reject) => {
        img.setAttribute("crossorigin", "anonymous");

        if (img.complete) {
          resolve(img);
        } else {
          img.onload = () => resolve(img);
          img.onerror = reject;
        }
      });
    });

    Promise.all(loadImages).then(() => {
      toPng(target as HTMLElement, {
        backgroundColor: "transparent",
        width: nodesBounds.width,
        height: nodesBounds.height,
        style: {
          width: `${nodesBounds.width}`,
          height: `${nodesBounds.height}`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then((data) => {
        const a = document.createElement("a");

        a.setAttribute("download", "mingle.png");
        a.setAttribute("href", data);
        a.click();
      });
    });
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
