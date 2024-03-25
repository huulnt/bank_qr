'use client';

import React, { useMemo } from 'react';
import {
    Card, Col, Form, Input, InputNumber, Row, Select, Switch
} from 'antd';

import { bankList } from './../helper/qr_setting_helper'
import TextArea from "antd/es/input/TextArea";
import VietQrCode from './VietQrCode';
import {
    Layout
} from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
    textAlign: 'center', color: '#fff', height: 64, paddingInline: 48, lineHeight: '64px', backgroundColor: '#4096ff',
};
const contentStyle = {};
const footerStyle = {
    textAlign: 'center', color: '#fff', backgroundColor: '#4096ff',
};
const layoutStyle = {
    borderRadius: 8, overflow: 'hidden', height: "100%", width: "100%",
};

const VietQrForm = () => {
    const [form] = Form.useForm();
    const allowAmount = Form.useWatch("allowAmount", form);
    const bankAccount = Form.useWatch('bank', form);
    const descriptionWithAmount = Form.useWatch('description', form);
    const amountWithAmount = Form.useWatch('amount', form);
    const accNumber = Form.useWatch('bankAccount', form);
    const fullName = Form.useWatch('fullName', form);

    const onChange = () => {
        //
    }

    const filterOption = (input = '', option = {}) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) || (option?.bankShortName ?? '').toLowerCase().includes(input.toLowerCase()) || (option?.bankName ?? '').toLowerCase().includes(input.toLowerCase())


    const bankDetail = useMemo(() => {
        return bankList.find(item => item.value === bankAccount)
    }, [bankAccount]);

    const onFinish = () => {
        //
    }

    return <Layout style={layoutStyle} className="flex flex-row">
        <Content style={contentStyle} className="container mx-auto flex justify-center items-center">
            <Form form={form}
                name="qrCode"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    bank: '970436',
                    allowAmount: false,
                    amount: ''
                }}
                autoComplete="off">
                <Card style={{ width: "100%" }}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Row className="p-2">
                                <Col span={24}>
                                    <Form.Item label="Bank List" name="bank" rules={[{ required: true }]}>
                                        <Select options={bankList} showSearch filterOption={filterOption} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Bank Account" name="bankAccount" rules={[{ required: true }]}>
                                        <Input type="input" placeholder="Input your bank account here!!!" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Full name" name="fullName" rules={[{ required: true }]}>
                                        <Input placeholder="Input your full name" />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item label="Allow input amount" name="allowAmount">
                                        <Switch onChange={onChange} size="small" />
                                    </Form.Item>
                                </Col>

                                {allowAmount && <>
                                    <Col span={24} className="mb-1">
                                        <Form.Item label="Amount" name="amount">
                                            <InputNumber
                                                placeholder="Input your amount here!!!"
                                                prefix="đ" suffix="VND"
                                                style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Description" name="description">
                                            <TextArea
                                                placeholder="Input your description here!!!"
                                                autoSize={{ minRows: 2, maxRows: 6, maxLength: 99 }}
                                            />
                                        </Form.Item>
                                    </Col></>}
                            </Row>

                        </Col>
                        <Col span={12}>
                            <VietQrCode
                                bankAccount={bankAccount}
                                descriptionWithAmount={descriptionWithAmount}
                                amountWithAmount={amountWithAmount}
                                accNumber={accNumber}
                                logo={bankDetail.logo}
                                bankName={bankDetail.bankName}
                                fullName={fullName}
                                allowAmount={allowAmount}
                                bankCode={bankDetail.bankCode}
                            ></VietQrCode>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </Content>
    </Layout>
}
export default VietQrForm