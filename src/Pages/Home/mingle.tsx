import logo from "/logo.svg";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  Connection,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import SITE_SEARCH from "./siteSearch";

import { X } from "lucide-react";

import { DnDProvider, useDnD } from "./dndContext";

import MUI_ALERT from "@/components/_MUI/MUI_ALERT";
import ANTD_ALERT from "@/components/_ANTD/ANTD_ALERT";
import MUI_BREADCRUMB from "@/components/_MUI/MUI_BREADCRUMB";
import ANTD_BREADCRUMB from "@/components/_ANTD/ANTD_BREADCRUMB";
import MUI_MENU from "@/components/_MUI/MUI_MENU";
import ANTD_MENU from "@/components/_ANTD/ANTD_MENU";

const initialNodes = [
  {
    id: "node-00",
    type: "SITE_SEARCH",
    position: { x: 0, y: 0 },
  },
];

const nodeTypes = {
  SITE_SEARCH,
  MUI_ALERT,
  ANTD_ALERT,
  MUI_BREADCRUMB,
  ANTD_BREADCRUMB,
  MUI_MENU,
  ANTD_MENU,
};

// const prefixes = ["MUI", "ANTD", "CHAKRA", "SHADCN"];
const menuList = ["Alert", "Menu", "Breadcrumb"];

// prefixes.forEach((prefix) => {
//   menuList.forEach((menu) => {
//     const key = `${prefix}_${menu.toUpperCase()}`;
//     nodeTypes[key] = `${prefix}_${menu.toUpperCase()}`;
//   });
// });

// console.log(nodeTypes);

// const loadComponents = async () => {
//   const imports = {};

//   for (const key in nodeTypes) {
//     const componentName = nodeTypes[key];
//     imports[key] = await import(`../../components/Libraries/${componentName}`).then(
//       (module) => module.default
//     );
//   }
//   console.log(imports);
// };

function MinglePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState("");

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  let length = String(nodes.length);
  const getId = () => `node-${length.padStart(2, "0")}`;

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  useEffect(() => {
    const hash = window.location.hash;
    console.log(hash);

    if (!hash.startsWith("#node&")) return;

    const nodeParams = hash.replace("#node&", "");
    const nodeLoader = JSON.parse(atob(nodeParams));

    setNodes(nodeLoader);
    console.log(nodes);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
      };

      setNodes((nds) => {
        const dndUpdateNode = nds.concat(newNode);
        encodeUrl(dndUpdateNode);
        return dndUpdateNode;
      });
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  function onClickComp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const component = target.textContent?.toUpperCase() || "";

    setDrawerOpen((prev) => !prev);
    setSelectedComp(component);
    console.log(component);
  }

  function onClickLib(e: MouseEvent) {
    console.log(e.currentTarget.id);
    const currentNode = String(e.currentTarget.id);

    setNodes((prev) => {
      const updateNode = [
        ...prev, // 기존 노드들
        {
          id: getId(),
          type: `${currentNode}`,
          position: { x: prev.length * 10, y: prev.length * 10 },
        },
      ];
      encodeUrl(updateNode);
      return updateNode;
    });
  }

  function encodeUrl(updateNode) {
    const encoded = btoa(JSON.stringify(updateNode));
    console.log(encoded.length);

    // if (encoded.length > 60000) return;

    window.history.pushState({}, "", "#node&" + encoded);
  }

  const MUI_COMP = nodeTypes[`MUI_${selectedComp}` as keyof typeof nodeTypes];
  const ANTD_COMP = nodeTypes[`ANTD_${selectedComp}` as keyof typeof nodeTypes];
  const CHAKRA_COMP = nodeTypes[`CHAKRA_${selectedComp}` as keyof typeof nodeTypes];
  const SHADCN_COMP = nodeTypes[`SHADCN_${selectedComp}` as keyof typeof nodeTypes];

  return (
    <div className="w-screen h-screen bg-[#222222] flex relative">
      {/* 사이드바 */}
      <div className="w-[240px] h-full bg-[#343434] rounded-r-2xl p-[20px] flex flex-col">
        <img src={logo} className="mt-[40px] px-[10px]" />

        <button className="w-[200px] h-[56px] bg-[#222222] mt-[40px] text-white text-[24px] tracking-wider rounded-2xl shrink-0">
          LOGIN
        </button>

        <div className="w-full border-b-2 border-[#767676] mt-[20px]"></div>

        {/* 메뉴 리스트 */}
        <ul className="text-white text-[24px] tracking-wider font-semibold flex flex-col gap-[20px] mt-[40px] px-[10px]">
          <li>Community</li>
          <li>My Page</li>
          <li>Gallery</li>
        </ul>

        <div className="w-full border-b-2 border-[#767676] mt-[40px]"></div>

        <p
          className="text-white text-[24px] tracking-wider font-semibold mt-[20px] px-[10px]"
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          Component
        </p>

        {/* 검색 바 */}
        <input
          type="text"
          placeholder="Search"
          className="w-[200px] h-[40px] bg-[#222222] rounded-lg mt-[20px] pl-[40px] text-white bg-[url('/search.png')] bg-no-repeat bg-[center_left_10px] shrink-0"
        />

        {/* 컴포넌트 리스트 */}
        <ul
          className="mt-[20px] w-full h-full max-h-[520px] overflow-scroll text-white flex flex-col gap-[20px] px-[10px]"
          style={{ scrollbarColor: "#ffffff transparent" }}
        >
          {menuList.map((item) => (
            <li onClick={onClickComp} key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 드로워 메뉴 */}
      <div
        className={`w-[320px] h-full bg-[#fcfcfc] fixed transition-all duration-300 ease-in-out rounded-r-2xl z-10 p-[20px]
          ${isDrawerOpen ? "left-0" : "-left-[320px]"}`}
      >
        <div className="flex justify-end" onClick={() => setDrawerOpen((prev) => !prev)}>
          <X color="#222222" strokeWidth={"3px"} size={32} />
        </div>

        <p className="text-[24px] font-semibold p-[10px]">컴포넌트 이름</p>

        <div className="w-[260px] h-[180px] rounded-md border border-[#e0e0e0] m-[10px]">
          <img />
        </div>

        <p className="p-[10px] leading-normal font-normal text-pretty tracking-wide max-h-[140px]">
          사용자에게 해당 컴포넌트의 간략한 예시를 이미지로 보여주고, 각 부분에 어떤 요소가 들어갈
          것인지 표현합니다.
        </p>
        <div className="px-[10px] leading-normal font-normal text-pretty tracking-wide max-h-[80px] text-[14px] flex gap-[4px]">
          <b className="font-semibold">*</b>
          <div>
            일반적으로 {""}
            <span className="text-[#52C41A]">성공</span>(초록), {""}
            <span className="text-[#1677FF]">정보</span>(파랑), {""}
            <span className="text-[#FAAD14]">경고</span>(주황), {""}
            <span className="text-[#FF4D4F]">위험</span>(빨강)으로 표현합니다.
          </div>
        </div>

        <div className="w-full border-b-2 border-[#e0e0e0] mt-[20px]"></div>

        {/* 컴포넌트 리스트 */}
        <div className="w-full max-h-[520px] overflow-scroll bg-[#f5f5f5] mt-[20px]">
          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/MUI.svg" alt="mui" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">Material UI</p>
            </div>

            <div
              className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={MUI_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `MUI_${selectedComp}`)}
              draggable
              id={`MUI_${selectedComp}`}
            >
              {MUI_COMP ? <MUI_COMP /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/ANTD.svg" alt="antd" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">Ant Design</p>
            </div>

            <div
              className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={ANTD_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `ANTD_${selectedComp}`)}
              draggable
              id={`ANTD_${selectedComp}`}
            >
              {ANTD_COMP ? <ANTD_COMP /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/CHAKRA.svg" alt="chakra" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">chakra UI</p>
            </div>

            <div
              className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex justify-center items-center"
              onClick={CHAKRA_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `CHAKRA_${selectedComp}`)}
              draggable
              id={`CHAKRA_${selectedComp}`}
            >
              {CHAKRA_COMP ? <CHAKRA_COMP /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/SHADCN.svg" alt="shadcn" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">shadcn/ui</p>
            </div>

            <div
              className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex justify-center items-center"
              onClick={SHADCN_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `SHADCN_${selectedComp}`)}
              draggable
              id={`SHADCN_${selectedComp}`}
            >
              {SHADCN_COMP ? <SHADCN_COMP /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="h-[220px]"></div>
        </div>
      </div>

      {/* 플로우 메인 화면 */}
      <div className="w-full h-full p-[20px]">
        <div className="w-full h-full bg-[#343434] rounded-2xl" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            // edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function DnDTest() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <MinglePage />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
