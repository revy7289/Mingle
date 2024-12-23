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
        <img src={logo} className="pt-[60px]" />

        <button className="w-[200px] h-[56px] bg-[#222222] mt-[40px] text-white text-[24px] tracking-wider rounded-2xl">
          LOGIN
        </button>

        <div className="text-white">
          <div onClick={onClickMUI}>MUI</div>
          <div onClick={onClickANTD}>ANTD</div>
          <div>chakra</div>
          <div>shadcn</div>
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
