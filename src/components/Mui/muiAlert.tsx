import Alert from "@mui/material/Alert";

/**
 * @props severity = "success" || "info" || "waring" || "error" 얼러트 메세지의 종류
 * @children 얼러트 메세지로 띄우고 싶은 글 컴포넌트의 inner text로 작성
 */
export default function MuiAlert() {
  return (
    <>
      <Alert severity="success">This is a success Alert.</Alert>

      {/* <Alert severity="info">This is an info Alert.</Alert>

            <Alert severity="warning">This is a warning Alert.</Alert>

            <Alert severity="error">This is an error Alert.</Alert> */}
    </>
  );
}
