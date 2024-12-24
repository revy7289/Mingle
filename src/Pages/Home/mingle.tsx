import logo from "/logo.svg";
import { useCallback, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TEST_NODE from "./testNode";
import ANTD_ALERT from "@/components/ANTD/ANTD_ALERT";
import MUI_ALERT from "@/components/MUI/MUI_ALERT";
import { X } from "lucide-react";

const initialNodes = [
  {
    id: "node-1",
    type: "testNode",
    position: { x: 0, y: 0 },
    data: { value: "기본값 test" },
  },
];

const nodeTypes = { testNode: TEST_NODE, antdTest: ANTD_ALERT, muiTEST: MUI_ALERT };

export default function MinglePage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  function onClickMUI() {
    setNodes((prev) => [
      ...prev, // 기존 노드들
      {
        id: `node-${prev.length + 1}`,
        type: "muiTEST",
        position: { x: -200, y: 50 },
        data: { value: "mui 노드 test" },
      },
    ]);
  }

  function onClickANTD() {
    setNodes((prev) => [
      ...prev, // 기존 노드들
      {
        id: `node-${prev.length + 1}`,
        type: "antdTest",
        position: { x: -200, y: 150 },
        data: { value: "antd 노드 test" },
      },
    ]);
  }

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
          className="w-[200px] h-[40px] bg-[#222222] rounded-lg mt-[20px] pl-[40px] text-white bg-[url(/search.png)] bg-no-repeat bg-[center_left_10px] shrink-0"
        />

        {/* 컴포넌트 리스트 */}
        <ul
          className="mt-[20px] w-full h-full max-h-[520px] overflow-scroll text-white flex flex-col gap-[20px] px-[10px]"
          style={{ scrollbarColor: "#ffffff transparent" }}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          {new Array(30).fill("test").map((el, idx) => (
            <li>{`${el} ${idx + 1}`}</li>
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
        <p className="px-[10px] leading-normal font-normal text-pretty tracking-wide max-h-[80px] text-[14px] flex gap-[4px]">
          <p className="font-semibold">*</p>
          <p>
            일반적으로 {""}
            <span className="text-[#52C41A]">성공</span>(초록), {""}
            <span className="text-[#1677FF]">정보</span>(파랑), {""}
            <span className="text-[#FAAD14]">경고</span>(주황), {""}
            <span className="text-[#FF4D4F]">위험</span>(빨강)으로 표현합니다.
          </p>
        </p>

        <div className="w-full border-b-2 border-[#e0e0e0] mt-[20px]"></div>

        {/* 컴포넌트 리스트 */}
        <div className="w-full max-h-[520px] overflow-scroll">
          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/MUI.svg" alt="mui" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">Material UI</p>
            </div>

            <div
              className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={onClickMUI}
            >
              <MUI_ALERT />
              무이 무이 구글 디자인은 정말로 위대헤
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/ANTD.svg" alt="antd" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">Ant Design</p>
            </div>

            <div
              className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={onClickANTD}
            >
              <ANTD_ALERT />
              많이는 쓰는데... 뭔가... 뭔가... 별로...
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/CHAKRA.svg" alt="chakra" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">chakra UI</p>
            </div>

            <div className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex justify-center items-center">
              진정한 힙스터를 위한 낭만의 굳이굳이
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/SHADCN.svg" alt="shadcn" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">shadcn/ui</p>
            </div>

            <div className="w-full h-[80px] rounded-md bg-[#e0e0e0] flex justify-center items-center">
              사실 샤드는 ui 콜렉숀이래요
            </div>
          </div>

          <div className="h-[220px]"></div>
        </div>
      </div>

      {/* 플로우 메인 화면 */}
      <div className="w-full h-full p-[20px]">
        <div className="w-full h-full bg-[#343434] rounded-2xl">
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            // edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
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
