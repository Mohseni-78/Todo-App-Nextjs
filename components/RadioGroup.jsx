import { Radio, Space } from "antd";

const RadioGroup = ({ status, setStatus }) => {
  return (
    <>
      <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"todo"}>todo</Radio>
          <Radio value={"inProgress"}>in progress</Radio>
          <Radio value={"review"}>review</Radio>
          <Radio value={"done"}>done</Radio>
        </Space>
      </Radio.Group>
    </>
  );
};

export default RadioGroup;
