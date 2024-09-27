

import {  Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Table from "./component/Table";

export const metadata = {
  title: "Tìm điểm chấp nhận thẻ VIB",
  description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Card",
  icons: {
      icon: 'https://app2.timo.vn/cxpassets/frontend/images/pfm/tomi_rock_scissors_paper/avt.jpeg',
  },
  openGraph: {
      title: "Tìm điểm chấp nhận thẻ VIB",
      description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Carde",
      images: 'https://app2.timo.vn/cxpassets/frontend/images/pfm/tomi_rock_scissors_paper/avt.jpeg',
  },
};

const PaymentAcceptance = () => {
  return <Layout className="h-full">
    <Content className="container mx-auto flex  items-center overflow-auto flex-col">
      <Title className="mt-2 ">VIB Supper Card - ĐIỂM CHẤP NHẬN THẺ</Title>
      <Table></Table>
    </Content>
  </Layout>
}

export default PaymentAcceptance;