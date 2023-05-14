import Link from "next/link";
// ICONS
import { AlignCenterOutlined } from "@ant-design/icons";

const SiderCom = () => {
  return (
    <>
      <h1 className="mb-5 text-xl font-bold">Welcome 👋</h1>
      <ul className="list-none grid gap-2 ">
        <li className="sidebarList">
          <AlignCenterOutlined />
          <Link href={"/"}>Todos</Link>
        </li>
        <li className="sidebarList">
          <AlignCenterOutlined />
          <Link href={"/addTodo"}>Add Todo</Link>
        </li>
        <li className="sidebarList">
          <AlignCenterOutlined />
          <Link href={"/profile"}>Profle</Link>
        </li>
      </ul>
    </>
  );
};

export default SiderCom;
