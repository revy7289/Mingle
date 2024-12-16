import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import MUI_ALERT from "./components/MUI/MUI_ALERT";

function TextUpdaterNode({ data, isConnectable }) {
    // console.log(data);

    const [isVisible, setIsVisible] = useState(false);

    function handleClick() {
        setIsVisible((prev) => !prev);
    }

    return (
        <>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className="text-updater-node">
                <div>
                    {/* <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
                    <button onClick={handleClick}>MUI_ALERT </button>
                    {isVisible && <MUI_ALERT />}
                </div>
            </div>
        </>
    );
}

export default TextUpdaterNode;
