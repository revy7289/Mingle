import logo from "/logo.svg";
import { MouseEvent, useCallback, useRef, useState } from "react";

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

import SiteSearch from "./siteSearch";

import { X } from "lucide-react";

import { DnDProvider, useDnD } from "./dndContext";

import MUI_ALERT from "@/components/_MUI/MUI_ALERT";
import ANTD_ALERT from "@/components/_ANTD/ANTD_ALERT";
import MUI_BREADCRUMB from "@/components/_MUI/MUI_BREADCRUMB";
import ANTD_BREADCRUMB from "@/components/_ANTD/ANTD_BREADCRUMB";
import MUI_MENU from "@/components/_MUI/MUI_MENU";
import ANTD_MENU from "@/components/_ANTD/ANTD_MENU";

// Accordion Components
import AntdAccordion from "@/components/Antd/antdAccordion";
import MuiAccordion from "@/components/Mui/muiAccordion";
import ChakraAccordion from "@/components/Chakra/chakraAccordion";
import ShadcnAccordion from "@/components/Shadcn/shadcnAccordion";

// Button Components
import AntdButton from "@/components/Antd/antdButton";
import ChakraButton from "@/components/Chakra/chakraButton";
import MuiButton from "@/components/Mui/muiButton";
import ShadcnButton from "@/components/Shadcn/shadcnButton";

// Calendar Components
import MuiCalendar from "@/components/Mui/muiCalendar";
import ShadcnCalendar from "@/components/Shadcn/shadcnCalendar";
import AntdCalendar from "@/components/Antd/antdCalendar";

// Avatar Components
import MuiAvatar from "@/components/Mui/muiAvatar";
import AntdAvatar from "@/components/Antd/antdAvatar";
import ChakraAvatar from "@/components/Chakra/chakraAvatar";
import ShadcnAvatar from "@/components/Shadcn/shadcnAvatar";

// Checkbox Components
import AntdCheckbox from "@/components/Antd/antdCheckbox";
import MuiCheckbox from "@/components/Mui/muiCheckbox";
import ChakraCheckbox from "@/components/Chakra/chakraCheckbox";
import ShadcnCheckbox from "@/components/Shadcn/shadcnCheckbox";

// Badge/Status Components
import AntdBadge from "@/components/Antd/antdBadge";
import MuiBadge from "@/components/Mui/muiBadge";
import ChakraBadge from "@/components/Chakra/chakraBadge";

// Badge/Tag Components
import ChakraTag from "@/components/Chakra/chakraTag";
import ShadcnTag from "@/components/Shadcn/shadcnTag";
import MuiTag from "@/components/Mui/muiTag";

// Card Components
import AntdCard from "@/components/Antd/antdCard";
import MuiCard from "@/components/Mui/muiCard";
import ChakraCard from "@/components/Chakra/chakraCard";
import ShadcnCard from "@/components/Shadcn/shadcnCard";

// Carousel Components
import AntdCarousel from "@/components/Antd/antdCarousel";
import ShadcnCarousel from "@/components/Shadcn/shadcnCarousel";

// Collapsible Components
import MuiCollapse from "@/components/Mui/muiCollapse";
import AntdCollapse from "@/components/Antd/antdCollapse";
import ShadcnCollapse from "@/components/Shadcn/shadcnCollapse";

// Color-Picker Components
import AntdColorpicker from "@/components/Antd/antdColorpicker";
import ChakraColorpicker from "@/components/Chakra/chakraColorpicker";

// Description Components
import AntdDescription from "@/components/Antd/antdDescription";
import ChakraDescription from "@/components/Chakra/chakraDescription";
import ShadcnDescription from "@/components/Shadcn/shadcnDescription";

// Drawer Components
import AntdDrawer from "@/components/Antd/antdDrawer";
import MuiDrawer from "@/components/Mui/muiDrawer";
import ChakraDrawer from "@/components/Chakra/chakraDrawer";
import ShadcnDrawer from "@/components/Shadcn/shadcnDrawer";

// Radio Components
import AntdRadio from "@/components/Antd/antdRadio";
import MuiRadio from "@/components/Mui/muiRadio";
import ChakraRadio from "@/components/Chakra/chakraRadio";
import ShadcnRadio from "@/components/Shadcn/shadcnRadio";

// Tab Components
import AntdTab from "@/components/Antd/antdTab";
import MuiTab from "@/components/Mui/muiTab";
import ChakraTab from "@/components/Chakra/chakraTab";
import ShadcnTab from "@/components/Shadcn/shadcnTab";

// Select Components
import AntdSelect from "@/components/Antd/antdSelect";
import MuiSelect from "@/components/Mui/muiSelect";
import ChakraSelect from "@/components/Chakra/chakraSelect";
import ShadcnSelect from "@/components/Shadcn/shadcnSelect";

// Skeleton Componenets
import AntdSkeleton from "@/components/Antd/antdSkeleton";
import MuiSkeleton from "@/components/Mui/muiSkeleton";
import ShadcnSkeleton from "@/components/Shadcn/shadcnSkeleton";
import ChakraSkeleton from "@/components/Chakra/chakraSkeleton";

// Toggle Components
import AntdToggle from "@/components/Antd/antdToggle";
import ChakraToggle from "@/components/Chakra/chakraToggle";
import MuiToggle from "@/components/Mui/muiToggle";
import ShadcnToggle from "@/components/Shadcn/shadcnToggle";

// Table Components
import AntdTable from "@/components/Antd/antdTable";
import MuiTable from "@/components/Mui/muiTable";
import ShadcnTable from "@/components/Shadcn/shadcnTable";
import ChakraTable from "@/components/Chakra/chakraTable";

const initialNodes = [
  {
    id: "node-1",
    type: "SiteSearch",
    position: { x: 0, y: 0 },
    data: { value: "사이트 검색용 기본 노드" },
  },
];

const nodeTypes = {
  SiteSearch,
  MUI_ALERT,
  ANTD_ALERT,
  MUI_BREADCRUMB,
  ANTD_BREADCRUMB,
  MUI_MENU,
  ANTD_MENU,
  AntdAccordion,
  MuiAccordion,
  ChakraAccordion,
  ShadcnAccordion,
  AntdButton,
  ChakraButton,
  MuiButton,
  ShadcnButton,
  MuiCalendar,
  ShadcnCalendar,
  AntdCalendar,
  MuiAvatar,
  AntdAvatar,
  ChakraAvatar,
  ShadcnAvatar,
  AntdCheckbox,
  MuiCheckbox,
  ChakraCheckbox,
  ShadcnCheckbox,
  AntdBadge,
  MuiBadge,
  ChakraBadge,
  ShadcnTag,
  ChakraTag,
  MuiTag,
  AntdCard,
  MuiCard,
  ChakraCard,
  ShadcnCard,
  AntdCarousel,
  ShadcnCarousel,
  MuiCollapse,
  AntdCollapse,
  ShadcnCollapse,
  AntdColorpicker,
  ChakraColorpicker,
  AntdDescription,
  ChakraDescription,
  ShadcnDescription,
  AntdDrawer,
  MuiDrawer,
  ChakraDrawer,
  ShadcnDrawer,
  AntdRadio,
  MuiRadio,
  ChakraRadio,
  ShadcnRadio,
  AntdTab,
  MuiTab,
  ChakraTab,
  ShadcnTab,
  AntdSelect,
  MuiSelect,
  ChakraSelect,
  ShadcnSelect,
  AntdSkeleton,
  MuiSkeleton,
  ShadcnSkeleton,
  ChakraSkeleton,
  AntdToggle,
  ChakraToggle,
  MuiToggle,
  ShadcnToggle,
  AntdTable,
  MuiTable,
  ShadcnTable,
  ChakraTable,
};

// const prefixes = ["MUI", "ANTD", "CHAKRA", "SHADCN"];
const menuList = [
  "Accordion",
  "Alert",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Calendar",
  "Card",
  "Carousel",
  "Checkbox",
  "Collapse",
  "Colorpicker",
  "Description",
  "Drawer",
  "Menu",
  "Radio",
  "Select",
  "Skeleton",
  "Tab",
  "Table",
  "Tag",
  "Toggle",
];

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

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      let id = 0;
      const getId = () => `dndnode_${id++}`;

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  function onClickLib(e: MouseEvent) {
    console.log(e.currentTarget.id);
    const currentNode = String(e.currentTarget.id);

    setNodes((prev) => [
      ...prev, // 기존 노드들
      {
        id: `node-${prev.length + 1}`,
        type: `${currentNode}`,
        position: { x: prev.length * 10, y: prev.length * 10 },
        data: { value: `${currentNode}` },
      },
    ]);
  }

  function onClickComp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const component = target.textContent || "";

    setDrawerOpen((prev) => !prev);
    setSelectedComp(component);
    console.log(component);
  }

  const MUI_COMP = nodeTypes[`Mui${selectedComp}` as keyof typeof nodeTypes];
  const ANTD_COMP = nodeTypes[`Antd${selectedComp}` as keyof typeof nodeTypes];
  const CHAKRA_COMP = nodeTypes[`Chakra${selectedComp}` as keyof typeof nodeTypes];
  const SHADCN_COMP = nodeTypes[`Shadcn${selectedComp}` as keyof typeof nodeTypes];

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
              className="w-full h-full rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={MUI_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Mui${selectedComp}`)}
              draggable
              id={`Mui${selectedComp}`}
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
              className="w-full h-full rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={ANTD_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Antd${selectedComp}`)}
              draggable
              id={`Antd${selectedComp}`}
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
              className="w-full h-full rounded-md bg-[#e0e0e0] flex justify-center items-center"
              onClick={CHAKRA_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Chakra${selectedComp}`)}
              draggable
              id={`Chakra${selectedComp}`}
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
              className="w-full h-full rounded-md bg-[#e0e0e0] flex justify-center items-center"
              onClick={SHADCN_COMP !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Shadcn${selectedComp}`)}
              draggable
              id={`Shadcn${selectedComp}`}
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
