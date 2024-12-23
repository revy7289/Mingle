import logo from "/logo.svg";
import { useCallback, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TEST_NODE from "./testNode";
import ANTD_ALERT from "@/components/ANTD/ANTD_ALERT";
import MUI_ALERT from "@/components/MUI/MUI_ALERT";

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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // function onClickMUI() {
  //   setNodes((prev) => [
  //     ...prev, // 기존 노드들
  //     {
  //       id: `node-${prev.length + 1}`,
  //       type: "muiTEST",
  //       position: { x: -200, y: 50 },
  //       data: { value: "mui 노드 test" },
  //     },
  //   ]);
  // }

  // function onClickANTD() {
  //   setNodes((prev) => [
  //     ...prev, // 기존 노드들
  //     {
  //       id: `node-${prev.length + 1}`,
  //       type: "antdTest",
  //       position: { x: -200, y: 150 },
  //       data: { value: "antd 노드 test" },
  //     },
  //   ]);
  // }

  return (
    <div className="w-screen h-screen bg-[#222222] flex relative">
      {/* 사이드바 */}
      <div className="w-[240px] h-full bg-[#343434] rounded-r-2xl p-[20px] flex flex-col">
        <img src={logo} className="mt-[40px] px-[10px]" />

        <button className="w-[200px] h-[56px] bg-[#222222] mt-[40px] text-white text-[24px] tracking-wider rounded-2xl shrink-0">
          LOGIN
        </button>

        <div className="w-full border-b-2 border-[#767676] mt-[20px]"></div>

        <ul className="text-white text-[24px] tracking-wider font-semibold flex flex-col gap-[20px] mt-[40px] px-[10px]">
          <li>Community</li>
          <li>My Page</li>
          <li>Gallery</li>
        </ul>

        <div className="w-full border-b-2 border-[#767676] mt-[40px]"></div>

        <p className="text-white text-[24px] tracking-wider font-semibold mt-[20px] px-[10px]">
          Component
        </p>

        <input
          type="text"
          placeholder="Search"
          className="w-[200px] h-[40px] bg-[#222222] rounded-lg mt-[20px] pl-[40px] text-white bg-[url(/search.png)] bg-no-repeat bg-[center_left_10px] shrink-0"
        />

        <ul
          className="mt-[20px] w-full h-full max-h-[520px] overflow-scroll text-white flex flex-col gap-[20px] px-[10px]"
          style={{ scrollbarColor: "#ffffff transparent" }}
        >
          {new Array(30).fill("test").map((el, idx) => (
            <li>{`${el} ${idx + 1}`}</li>
          ))}
        </ul>
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
