// import { useState } from "react";
// import ANTD_ALERT from "./components/ANTD/ANTD_ALERT";
// import MUI_ALERT from "./components/MUI/MUI_ALERT";

// export default function App() {
//     const [isVisible, setIsVisible] = useState({
//         MUI: false,
//         ANTD: false,
//         CHAKRA: false,
//         SHADCN: false,
//     });

//     const handleClickMUI = () => {
//         setIsVisible((prev) => ({
//             ...prev,
//             MUI: true,
//         }));
//     };

//     const handleClickANTD = () => {
//         setIsVisible((prev) => ({
//             ...prev,
//             ANTD: true,
//         }));
//     };

//     return (
//         <div className="w-[500px] h-full flex flex-col m-[20px] gap-[20px]">
//             <div>test</div>

//             <button onClick={handleClickMUI}>MUI_ALERT</button>
//             {isVisible.MUI && <MUI_ALERT />}

//             <button onClick={handleClickANTD}>ANTD_ALERT</button>
//             {isVisible.ANTD && <ANTD_ALERT />}
//         </div>
//     );
// }

import { useCallback, useState } from "react";
import { ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode";

const rfStyle = {
    backgroundColor: "#B8CEFF",
};

const initialNodes = [
    {
        id: "node-1",
        type: "textUpdater",
        position: { x: 0, y: 0 },
        data: { value: 123 },
    },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
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

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            style={rfStyle}
        />
    );
}

export default Flow;
