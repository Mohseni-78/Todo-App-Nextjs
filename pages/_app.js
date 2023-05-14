import "@/styles/globals.css";
import SiderCom from "@/components/Sider";
import { Layout } from "antd";
const { Header, Sider, Footer, Content } = Layout;

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Header className="headerStyle">
        <h1 className="text-3xl">LOGO</h1>
      </Header>
      <Layout>
        <Sider className="siderStyle">
          <SiderCom />
        </Sider>
        <Content className="contentStyle">
          <Component {...pageProps} />
        </Content>
      </Layout>
      <Footer className="footerStyle">copy right &copy;</Footer>
    </Layout>
  );
}
