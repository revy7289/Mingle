import logo from "/logoColor.svg";
import {
  ComponentType,
  DragEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Copy, Settings2, Trash2, X } from "lucide-react";

import {
  ReactFlow,
  Background,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  applyNodeChanges,
  NodeToolbar,
  NodeResizer,
  Node,
  NodeChange,
  NodeTypes,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD } from "./dndContext";
import SiteSearch from "./siteSearch";
import ZoomPanel from "./panelAddon/zoomTransition";
import DownloadPanel from "./panelAddon/downloadImage";
import SavePanel from "./panelAddon/saveRestore";
import CleanupPanel from "./panelAddon/cleanupNode";

const initialNodes: NodeBase[] = [
  {
    id: "node-00",
    type: "site-search",
    position: { x: 0, y: 0 },
    data: { currentNode: "" },
  },
];

const initialNodeTypes: Record<string, ComponentType> = {
  "site-search": SiteSearch,
  "ui-components": NodeController as ComponentType,
  // ... 이후 동적으로 import 수행
};

/**
 * @ROLE 글로벌하게 사용할 general NodeType
 */
type NodeBase = {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    currentNode: string;
  };
};

/**
 * @ROLE NodeTypes에서 "site-search"를 제외한 key와 type을 지정함
 */
type CurrentNodeType = {
  currentNode: Exclude<keyof typeof initialNodeTypes, "site-search">;
};

/**
 * @ROLE ui component를 dynamic import하고 자동으로 매칭되도록 하여 모든 component가 공용으로 사용하는 일종의 provider함수 구현
 *
 * @step1 react-flow의 Node가 NodeController를 호출합니다
 * @step2 Node 내부의 data:currentNode를 호출합니다
 * @step3 NodeType을 순회하여 currentNode에 대응되는 component를 찾습니다
 * @step4 이상이 없다면 Resizer, Toolbar와 함께 component가 출력됩니다
 */
type NodeControllerProps = {
  data: CurrentNodeType; // currentNode는 initialNodeTypes의 키 중 하나여야 함
  selected: boolean;
};

function NodeController({ data, selected = false }: NodeControllerProps): JSX.Element {
  const { currentNode } = data;
  const Component = initialNodeTypes[currentNode];

  return (
    <>
      <NodeResizer color="#ff3179" isVisible={selected} minWidth={200} minHeight={80} />

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

/**
 * @ROLE drawer menu에 표현될 menu list
 *
 * @step1 메뉴 리스트에 ui 메뉴를 추가함
 * @step2 자동으로 library + ui 형태로 변수가 생성됨 ex) Alert선택 시 MuiAlert, AntdAlert ...
 * @step3 생성된 변수는 NodeType의 key로 사용되고 해당 key는 자동으로 dynamic import되어 동일한 이름으로 value가 매칭됨
 * @step4 따라서 메뉴만 추가하면 자동으로 ui component가 로드되는 로직 구현
 */
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

/**
 * @MAIN react-flow 활용한 node-base 플레이그라운드 구현
 */
function MinglePage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [nodeTypes, setNodeTypes] = useState(initialNodeTypes);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const [savedNode, setSavedNode] = useState<ReactFlowInstance<NodeBase> | null>(null);

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  /**
   * @ROLE 페이지 로드할 때 URL에 통째로 저장된 Node를 parse하여 작업하던 화면 재구축
   *
   * @step1 URL에 hashing된 정보를 받아옴
   * @step2 hash 정보를 json parse하고 Node에 다시 등록함
   * @step3 등록한 Node에 해당하는 module만 dynamic import 수행하고 NodeType에 등록함
   * @step4 등록된 Node바탕으로 NodeController 호출하며 화면 재구축 실행
   */
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#node&")) return;

    const nodeParams = hash.replace("#node&", "");
    const nodeLoader = JSON.parse(atob(nodeParams));

    setNodes(nodeLoader);

    const loadModules = async () => {
      const updateNode = await Promise.all(
        nodeLoader.map(async (node: Node) => {
          if (node.data.currentNode) {
            const key = node.data.currentNode as string;
            const [prefix, ...rest] = (key.match(/[A-Z][a-z]+/g) || []) as string[];
            const comp = rest.join("");

            try {
              const module = await import(
                `@/components/${prefix.toLowerCase()}/${prefix.toLowerCase()}${comp}.tsx`
              );
              initialNodeTypes[key] = module.default;
              setNodeTypes((prev) => ({
                ...prev,
                [key]: module.default,
              }));
            } catch (error) {
              console.error(`Failed to import module for ${key}:`, error);
            }
          }
          return node;
        })
      );
      setNodes(updateNode);
    };
    loadModules();
  }, []);

  /**
   * @ROLE node가 변경될 때 마다 실행될 callback함수
   *
   * @step1 node state가 변경될 때 마다 callback 실행
   * @step2 변경된 노드 실시간으로 react-flow에 반영
   * @step3 변경 완료된 node 실시간으로 URL 인코딩 실행
   */
  const onNodesChange = useCallback(
    (changes: NodeChange<NodeBase>[]) => {
      setNodes((nds) => {
        const onUpdateNode = applyNodeChanges(changes, nds);
        encodeUrl(onUpdateNode);
        return onUpdateNode;
      });
    },
    [setNodes]
  );

  /**
   * @ROLE menu를 선택할 때 자동으로 ui component에 해당하는 경로 설정하고 dynamic import 수행하는 기능 구현
   *
   * @step1 사용자가 menu를 클릭하면 해당 메뉴를 parameter로 받음
   * @step2 map 굴려서 자동으로 library + ui 형태로 변수가 생성됨 ex) Alert선택 시 MuiAlert, AntdAlert ...
   * @step3 생성된 변수는 NodeType의 key로 사용되고 해당 key는 자동으로 dynamic import되어 동일한 이름으로 value가 매칭됨
   * @step4 따라서 메뉴만 추가하면 자동으로 ui component가 로드되는 로직 구현
   */
  const dynamicImport = async (menu: string) => {
    const prefixes = ["Mui", "Antd", "Chakra", "Shadcn"];

    const imports = prefixes.map(async (prefix) => {
      const key = prefix + menu;

      try {
        const module = await import(
          `@/components/${prefix.toLowerCase()}/${prefix.toLowerCase()}${menu}.tsx`
        );

        if (module) {
          initialNodeTypes[key] = module.default;
          setNodeTypes((prev) => ({ ...prev, [key]: module.default }));
        }
      } catch (error) {
        console.error(`Failed to import module for ${key}:`, error);
      }
    });

    await Promise.all(imports);
  };

  /**
   * @ROLE Node추가할 때 Node의 Length로 id 부여하여 id와 node.length 매칭되게 사용 ex.) "node-01" = nodes[1]
   */
  function getId(nodeIndex: number) {
    return `node-${String(nodeIndex).padStart(2, "0")}`;
  }

  /**
   * @ROLE Node추가할 때 nodes state를 base.64로 인코딩하여 통째로 URL에 전달
   */
  function encodeUrl(updateNode: NodeBase[]) {
    const encoded = btoa(JSON.stringify(updateNode));

    window.history.pushState({}, "", "#node&" + encoded);
  }

  /**
   * @ROLE 메인페이지에서 컴포넌트 메뉴 선택 시 drawer menu 열고 dynamic import 수행
   */
  function onClickMenu(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const menu = target.textContent || "";

    if (!menu) {
      console.warn("No menu selected");
      return;
    }

    dynamicImport(menu).then(() => {
      console.log("Components mapped to nodeTypes:", nodeTypes);
    });

    setDrawerOpen((prev) => !prev);
    setSelectedMenu(menu);
    console.log(menu);
  }

  /**
   * @ROLE 선택한 라이브러리에 해당하는 Node 추가하는 기능 구현
   *
   * @param currentNode 해당하는 타겟에 id 부여한 것을 가져와서 문자열로 전달
   */
  function onClickLib(e: MouseEvent) {
    const currentNode = e.currentTarget.id;
    console.log(e.currentTarget.id);

    setNodes((prev) => {
      const updateNode = [
        ...prev, // 기존 노드들
        {
          id: getId(prev.length),
          type: "ui-components",
          position: { x: prev.length * 10, y: 60 + prev.length * 10 },
          data: { currentNode },
        },
      ];
      encodeUrl(updateNode);
      return updateNode;
    });
  }

  /**
   * @ROLE drag event를 감지하고 선택된 component를 Node로 등록
   */
  const onDragStart = (event: DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * @ROLE drag & drop으로 node 추가하는 기능 구현
   *
   * @param type DragStart함수로 dndContext에 등록된 Node이름을 문자열로 전달
   */
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const currentNode = type;

      setNodes((nds) => {
        const newNode = {
          id: getId(nds.length),
          type: "ui-components",
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

  const MuiComp = nodeTypes[`Mui${selectedMenu}` as keyof typeof nodeTypes];
  const AntdComp = nodeTypes[`Antd${selectedMenu}` as keyof typeof nodeTypes];
  const ChakraComp = nodeTypes[`Chakra${selectedMenu}` as keyof typeof nodeTypes];
  const ShadcnComp = nodeTypes[`Shadcn${selectedMenu}` as keyof typeof nodeTypes];

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
        <ul className="flex flex-col gap-[20px] mt-[40px] px-[10px]">
          <li className="text-white text-[24px] tracking-wider font-semibold">Community</li>
          <li className="text-white text-[24px] tracking-wider font-semibold">My Page</li>
          <li className="text-white text-[24px] tracking-wider font-semibold">Gallery</li>
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
            <li onClick={onClickMenu} key={item}>
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
              onClick={MuiComp !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Mui${selectedMenu}`)}
              draggable
              id={`Mui${selectedMenu}`}
            >
              {MuiComp ? <MuiComp /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/ANTD.svg" alt="antd" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">Ant Design</p>
            </div>

            <div
              className="w-full h-full rounded-md bg-[#e0e0e0] flex flex-col justify-center items-center"
              onClick={AntdComp !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Antd${selectedMenu}`)}
              draggable
              id={`Antd${selectedMenu}`}
            >
              {AntdComp ? <AntdComp /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/CHAKRA.svg" alt="chakra" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">chakra UI</p>
            </div>

            <div
              className="w-full h-full rounded-md bg-[#e0e0e0] flex justify-center items-center"
              onClick={ChakraComp !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Chakra${selectedMenu}`)}
              draggable
              id={`Chakra${selectedMenu}`}
            >
              {ChakraComp ? <ChakraComp /> : <div>검색 결과가 없습니다.</div>}
            </div>
          </div>

          <div className="px-[10px] mt-[40px] flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <img src="/SHADCN.svg" alt="shadcn" className="mt-[4px]" />
              <p className="text-[24px] font-semibold">shadcn/ui</p>
            </div>
            <div
              className="w-full h-full rounded-md bg-[#e0e0e0] flex justify-center items-center"
              onClick={ShadcnComp !== undefined ? onClickLib : () => ""}
              onDragStart={(event) => onDragStart(event, `Shadcn${selectedMenu}`)}
              draggable
              id={`Shadcn${selectedMenu}`}
            >
              {ShadcnComp ? <ShadcnComp /> : <div>검색 결과가 없습니다.</div>}
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
            nodeTypes={nodeTypes as NodeTypes}
            onNodesChange={onNodesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={(instance: ReactFlowInstance<NodeBase>) => setSavedNode(instance)}
            fitView
          >
            <Background />

            <Panel position="top-right" className="flex gap-[6px] items-center">
              <ZoomPanel />
              <div className="w-[2px] h-[20px] bg-[#767676]"></div>
              <DownloadPanel />
              <div className="w-[2px] h-[20px] bg-[#767676]"></div>
              <SavePanel<NodeBase>
                savedNode={savedNode as ReactFlowInstance<NodeBase>}
                setNodes={setNodes}
              />
              <div className="w-[2px] h-[20px] bg-[#767676]"></div>
              <CleanupPanel<NodeBase> initialNodes={initialNodes} setNodes={setNodes} />
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
