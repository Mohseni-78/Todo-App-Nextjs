import "@/styles/globals.css";
// componets
import SiderCom from "@/components/Sider";
import HeaderCom from "@/components/Header";
import { Layout } from "antd";
import { SessionProvider } from "next-auth/react";

const { Header, Sider, Footer, Content } = Layout;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Header className="headerStyle">
          <HeaderCom />
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
    </SessionProvider>
  );
}
