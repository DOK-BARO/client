// import Button from "../../components/atom/button";
import Input from "../../components/atom/input";
import Textarea from "../../components/atom/textarea";
// import Dropdown from "../../components/atom/dropdown";

export default function Index() {
  return (
    <div style={{ margin: "10%" }}>
      Home
      {/* <Button size="large" onClick={() => {}}>
        button
      </Button> */}
      <div style={{ display: "flex", gap: "30px" }}>
        <Input
          id="input"
          value=""
          message="메시지 내용"
          isError={false}
          size="small"
          // disabled
          placeholder="플레이스홀더"
          onChange={() => {}}
        ></Input>
        <Textarea
          id="textarea"
          value=""
          // disabled
          placeholder="플레이스홀더"
          onChange={() => {}}
          isError={false}
          message="메시지 내용"
        ></Textarea>
      </div>
    </div>
  );
}
