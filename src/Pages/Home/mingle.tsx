import logo from "/logo.svg";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Copy, Settings2, Trash2, X } from "lucide-react";

import {
  ReactFlow,
  Background,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  applyNodeChanges,
  NodeToolbar,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD } from "./dndContext";
import DownloadPanel from "./panelAddon/downloadImage";
import ZoomPanel from "./panelAddon/zoomTransition";
import SavePanel from "./panelAddon/saveRestore";

import SiteSearch from "./siteSearch";

// Alert Components
import MuiAlert from "@/components/mui/muiAlert";
import AntdAlert from "@/components/antd/antdAlert";

// Breadcrumb Components
import MuiBreadcrumb from "@/components/mui/muiBreadcrumb";
import AntdBreadcrumb from "@/components/antd/antdBreadcrumb";

// Menu Components
import MuiMenu from "@/components/mui/muiMenu";
import AntdMenu from "@/components/antd/antdMenu";

// Accordion Components
import AntdAccordion from "@/components/antd/antdAccordion";
import MuiAccordion from "@/components/mui/muiAccordion";
import ChakraAccordion from "@/components/chakra/chakraAccordion";
import ShadcnAccordion from "@/components/shadcn/shadcnAccordion";

// Button Components
import AntdButton from "@/components/antd/antdButton";
import ChakraButton from "@/components/chakra/chakraButton";
import MuiButton from "@/components/mui/muiButton";
import ShadcnButton from "@/components/shadcn/shadcnButton";

// Calendar Components
import MuiCalendar from "@/components/mui/muiCalendar";
import ShadcnCalendar from "@/components/shadcn/shadcnCalendar";
import AntdCalendar from "@/components/antd/antdCalendar";

// Avatar Components
import MuiAvatar from "@/components/mui/muiAvatar";
import AntdAvatar from "@/components/antd/antdAvatar";
import ChakraAvatar from "@/components/chakra/chakraAvatar";
import ShadcnAvatar from "@/components/shadcn/shadcnAvatar";

// Checkbox Components
import AntdCheckbox from "@/components/antd/antdCheckbox";
import MuiCheckbox from "@/components/mui/muiCheckbox";
import ChakraCheckbox from "@/components/chakra/chakraCheckbox";
import ShadcnCheckbox from "@/components/shadcn/shadcnCheckbox";

// Badge/Status Components
import AntdBadge from "@/components/antd/antdBadge";
import MuiBadge from "@/components/mui/muiBadge";
import ChakraBadge from "@/components/chakra/chakraBadge";

// Badge/Tag Components
import ChakraTag from "@/components/chakra/chakraTag";
import ShadcnTag from "@/components/shadcn/shadcnTag";
import MuiTag from "@/components/mui/muiTag";

// Card Components
import AntdCard from "@/components/antd/antdCard";
import MuiCard from "@/components/mui/muiCard";
import ChakraCard from "@/components/chakra/chakraCard";
import ShadcnCard from "@/components/shadcn/shadcnCard";

// Carousel Components
import AntdCarousel from "@/components/antd/antdCarousel";
import ShadcnCarousel from "@/components/shadcn/shadcnCarousel";

// Collapsible Components
import MuiCollapse from "@/components/mui/muiCollapse";
import AntdCollapse from "@/components/antd/antdCollapse";
import ShadcnCollapse from "@/components/shadcn/shadcnCollapse";

// Color-Picker Components
import AntdColorpicker from "@/components/antd/antdColorpicker";
import ChakraColorpicker from "@/components/chakra/chakraColorpicker";

// Description Components
import AntdDescription from "@/components/antd/antdDescription";
import ChakraDescription from "@/components/chakra/chakraDescription";
import ShadcnDescription from "@/components/shadcn/shadcnDescription";

// Drawer Components
import AntdDrawer from "@/components/antd/antdDrawer";
import MuiDrawer from "@/components/mui/muiDrawer";
import ChakraDrawer from "@/components/chakra/chakraDrawer";
import ShadcnDrawer from "@/components/shadcn/shadcnDrawer";

// Radio Components
import AntdRadio from "@/components/antd/antdRadio";
import MuiRadio from "@/components/mui/muiRadio";
import ChakraRadio from "@/components/chakra/chakraRadio";
import ShadcnRadio from "@/components/shadcn/shadcnRadio";

// Tab Components
import AntdTab from "@/components/antd/antdTab";
import MuiTab from "@/components/mui/muiTab";
import ChakraTab from "@/components/chakra/chakraTab";
import ShadcnTab from "@/components/shadcn/shadcnTab";

// Select Components
import AntdSelect from "@/components/antd/antdSelect";
import MuiSelect from "@/components/mui/muiSelect";
import ChakraSelect from "@/components/chakra/chakraSelect";
import ShadcnSelect from "@/components/shadcn/shadcnSelect";

// Skeleton Componenets
import AntdSkeleton from "@/components/antd/antdSkeleton";
import MuiSkeleton from "@/components/mui/muiSkeleton";
import ShadcnSkeleton from "@/components/shadcn/shadcnSkeleton";
import ChakraSkeleton from "@/components/chakra/chakraSkeleton";

// Toggle Components
import AntdToggle from "@/components/antd/antdToggle";
import ChakraToggle from "@/components/chakra/chakraToggle";
import MuiToggle from "@/components/mui/muiToggle";
import ShadcnToggle from "@/components/shadcn/shadcnToggle";

// Table Components
import AntdTable from "@/components/antd/antdTable";
import MuiTable from "@/components/mui/muiTable";
import ShadcnTable from "@/components/shadcn/shadcnTable";
import ChakraTable from "@/components/chakra/chakraTable";

const initialNodes = [
  {
    id: "node-00",
    type: "SiteSearch",
    position: { x: 0, y: 0 },
  },
];

function NodeWithToolbar({ data }) {
  const { currentNode } = data;
  const Component = nodeTypes[currentNode];

  return (
    <>
      <NodeToolbar className="flex gap-[8px]" align="end">
        <button className="w-[24px] h-[24px] flex justify-center items-center">
          <Settings2 color="#222" size={16} />
        </button>

        <button className="w-[24px] h-[24px] flex justify-center items-center">
          <Copy color="#222" size={16} />
        </button>

        <button className="w-[24px] h-[24px] flex justify-center items-center">
          <Trash2 color="#222" size={16} />
        </button>
      </NodeToolbar>

      {Component ? <Component /> : <div>No Component</div>}
    </>
  );
}

const nodeTypes = {
  "node-with-toolbar": NodeWithToolbar,
  SiteSearch,
  MuiAlert,
  AntdAlert,
  MuiBreadcrumb,
  AntdBreadcrumb,
  MuiMenu,
  AntdMenu,
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

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

/**
 * @returns react-flow 활용한 node-base 플레이그라운드 구현
 */
function MinglePage() {
  const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState("");

  const [savedNode, setSavedNode] = useState(null);

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  // useEffect(() => {
  //   console.log(nodes);
  // }, [nodes]);

  useEffect(() => {
    const hash = window.location.hash;
    console.log(hash);

    if (!hash.startsWith("#node&")) return;

    const nodeParams = hash.replace("#node&", "");
    const nodeLoader = JSON.parse(atob(nodeParams));

    setNodes(nodeLoader);
  }, []);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const onUpdateNode = applyNodeChanges(changes, nds);
        encodeUrl(onUpdateNode);
        return onUpdateNode;
      });
    },
    [setNodes]
  );

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const currentNode = String(type);

      setNodes((nds) => {
        const newNode = {
          id: getId(nds.length),
          type: "node-with-toolbar",
          position,
          data: { currentNode },
        };

        const dndUpdateNode = nds.concat(newNode);
        encodeUrl(dndUpdateNode);
        return dndUpdateNode;
      });
    },
    [screenToFlowPosition, type]
  );

  function onClickComp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const menu = target.textContent || "";

    setDrawerOpen((prev) => !prev);
    setSelectedComp(menu);
    console.log(menu);
  }

  function onClickLib(e: MouseEvent) {
    const currentNode = e.currentTarget.id;
    console.log(e.currentTarget.id);

    setNodes((prev) => {
      const updateNode = [
        ...prev, // 기존 노드들
        {
          id: getId(prev.length),
          type: "node-with-toolbar",
          position: { x: prev.length * 10, y: 60 + prev.length * 10 },
          data: { currentNode },
        },
      ];
      encodeUrl(updateNode);
      return updateNode;
    });
  }

  function getId(nodeIndex) {
    return `node-${String(nodeIndex).padStart(2, "0")}`;
  }

  function encodeUrl(updateNode) {
    const encoded = btoa(JSON.stringify(updateNode));

    window.history.pushState({}, "", "#node&" + encoded);
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
            // edges={edges}
            // edgeTypes={edgeTypes}
            // onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultViewport={defaultViewport}
            onInit={setSavedNode}
            fitView
          >
            <Background />

            <Panel position="top-right" className="flex gap-[6px] items-center">
              <ZoomPanel />
              <div className="w-[2px] h-[20px] bg-[#767676]"></div>
              <DownloadPanel />
              <div className="w-[2px] h-[20px] bg-[#767676]"></div>
              <SavePanel savedNode={savedNode} setNodes={setNodes} />
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function DnDFlow() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <MinglePage />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
