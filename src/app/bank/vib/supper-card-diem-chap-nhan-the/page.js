

import {  Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Table from "./component/Table";


const PaymentAcceptance = () => {
  return <Layout className="h-full">
    <Content className="container mx-auto flex  items-center overflow-auto flex-col">
      <Title className="mt-2 ">VIB Supper Card - ĐIỂM CHẤP NHẬN THẺ</Title>
      <Table></Table>
    </Content>
  </Layout>
}

export default PaymentAcceptance;