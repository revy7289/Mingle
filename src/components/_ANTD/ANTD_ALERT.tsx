import { Alert } from "antd";

/**
 * @props message = "string" 얼러트 메세지로 띄우고 싶은 글 작성
 * @props type = "success" || "info" || "warning" || "error" 얼러트 메세지의 종류
 */
export default function ANTD_ALERT() {
    return (
        <>
            <Alert message="Success Text" type="success" />

            {/* <Alert message="Info Text" type="info" />

            <Alert message="Warning Text" type="warning" />

            <Alert message="Error Text" type="error" /> */}
        </>
    );
}
