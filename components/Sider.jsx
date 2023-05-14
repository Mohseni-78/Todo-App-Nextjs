// ICONS
import { AlignCenterOutlined } from "@ant-design/icons";

const SiderCom = () => {
  return (
    <>
      <h1 className="mb-5 text-xl font-bold">Welcome 👋</h1>
      <ul className="list-none grid gap-2 ">
        <li className="sidebarList">
          <AlignCenterOutlined />
          Todos
        </li>
        <li className="sidebarList">
          <AlignCenterOutlined />
          Add Todo
        </li>
        <li className="sidebarList">
          <AlignCenterOutlined />
          Profle
        </li>
      </ul>
    </>
  );
};

export default SiderCom;
