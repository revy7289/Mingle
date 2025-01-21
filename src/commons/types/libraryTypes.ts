import { Node } from "@xyflow/react";
import { Dispatch, SetStateAction } from "react";

type data = {
  title: string;
  content: string;
};

type nodeDataType = {
  currentNode: string;
  icon: string;
  inputData: data[];
};

export interface ILibraryProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  data: nodeDataType;
  setNodes: Dispatch<SetStateAction<Node>>;
}

export interface AccordionData {
  title: string;
  content: string;
  label?: string;
  children?: string;
}
