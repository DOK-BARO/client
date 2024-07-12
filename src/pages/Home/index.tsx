// import Button from "../../components/atom/button";
import Input from "../../components/atom/input";
// import Dropdown from "../../components/atom/dropdown";

export default function Index() {
  return (
    <div>
      Home
      {/* <Button size="large" onClick={() => {}}>
        button
      </Button> */}
      <Input
        id="input"
        value=""
        message="메시지 내용"
        isError={false}
        size="small"
        placeholder="플레이스홀더"
        onChange={() => {}}
      ></Input>
    </div>
  );
}
