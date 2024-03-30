'use client';

import React, {useMemo, useRef, useState} from 'react';
import {
    Card, Form, Input, InputNumber, Select, Switch,
    Button, Modal
} from 'antd';

import { bankList } from './../helper/qr_setting_helper'
import TextArea from "antd/es/input/TextArea";
import VietQrCode from './VietQrCode';
import {
    Layout
} from 'antd';

import html2canvas from "html2canvas";
import { SettingOutlined } from '@ant-design/icons';
import CustomDownload from "@/app/qr_setting/component/CustomDownload";


const {  Content } = Layout;

const contentStyle = {};

const layoutStyle = {
    borderRadius: 8, overflow: 'hidden', height: "100%", width: "100%",
};

const VietQrForm = () => {
    const qrCodeRef = useRef();
    const customDownloadRef = useRef();

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();
    const allowAmount = Form.useWatch("allowAmount", form);
    const bankAccount = Form.useWatch('bank', form);
    const descriptionWithAmount = Form.useWatch('description', form);
    const amountWithAmount = Form.useWatch('amount', form);
    const accNumber = Form.useWatch('bankAccount', form);
    const fullName = Form.useWatch('fullName', form);


    const filterOption = (input = '', option = {}) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) || (option?.bankShortName ?? '').toLowerCase().includes(input.toLowerCase()) || (option?.bankName ?? '').toLowerCase().includes(input.toLowerCase())


    const bankDetail = useMemo(() => {
        return bankList.find(item => item.value === bankAccount)
    }, [bankAccount]);

    const onFinish = () => {
        //
    }

    const downloadQRCode = async (element) => {
        html2canvas(element).then((canvas) => {
            const qrDownload = document.createElement("a");
            const currentDate = new Date().getTime();
            qrDownload.download = `huulnt-vietqr-code-${currentDate}.png`;
            qrDownload.href = canvas.toDataURL("image/png");
            qrDownload.target = "_blank";
            qrDownload.click();
        });
        // qrCodeRef.current
    };


    const confirmModel = () => {
        downloadQRCode(customDownloadRef.current);
    };

    const hideModal = () => {
        setOpen(false);
    };


    const handleOpenCustom = () => {
        setOpen(true)
    }

    return <Layout style={layoutStyle} className="flex flex-row">
        <Content style={contentStyle} className="container mx-auto flex justify-center items-center overflow-auto ">
            <Form form={form}
                name="qrCode"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    bank: '970436',
                    allowAmount: false,
                    amount: ''
                }}
                autoComplete="off"
                className='sm:w-auto sm:h-auto w-full h-full'
            >
                <Card className='min-w-full min-h-full'>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:gap-3">
                        <div className="md:min-w-80 md:max-w-80 sm:min-w-96 sm:max-w-96 w-full">
                            <Form.Item label="Bank List" name="bank" rules={[{ required: true }]}>
                                <Select options={bankList} showSearch filterOption={filterOption} />
                            </Form.Item>
                            <Form.Item label="Bank Account" name="bankAccount" rules={[{ required: true }]}>
                                <Input type="input" placeholder="Input your bank account here!!!" />
                            </Form.Item>
                            <Form.Item label="Full name" name="fullName" rules={[{ required: true }]}>
                                <Input placeholder="Input your full name" />
                            </Form.Item>
                            <Form.Item label="Allow input amount" name="allowAmount">
                                <Switch size="small" />
                            </Form.Item>

                            {allowAmount && <>
                                <Form.Item label="Amount" name="amount">
                                    <InputNumber
                                        placeholder="Input your amount here!!!"
                                        prefix="đ" suffix="VND"
                                        style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label="Description" name="description">
                                    <TextArea
                                        placeholder="Input your description here!!!"
                                        autoSize={{ minRows: 2, maxRows: 6, maxLength: 99 }}
                                    />
                                </Form.Item>

                            </>}
                        </div>

                        <div className="md:min-w-96 sm:min-w-96 w-full">
                            <div ref={qrCodeRef} className='p-10 md:px-8 px-6'>
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
                            </div>
                            <div className='mt-5 flex justify-center'>
                                <Button type="dashed" icon={<SettingOutlined />} className='mr-2' onClick={handleOpenCustom}>
                                    Custom download
                                </Button>

                                <Button type="primary" onClick={() => downloadQRCode(qrCodeRef.current)}>Download</Button>
                            </div>
                        </div>
                        <Modal
                            title="Custom download Viet QR Code"
                            open={open}
                            onOk={confirmModel}
                            onCancel={hideModal}
                            okText="Download"
                            cancelText="Cancel"
                            destroyOnClose
                        >
                           <CustomDownload config={{...form.getFieldsValue(), ...bankDetail}} ref={customDownloadRef}/>
                        </Modal>

                    </div>
                </Card>
            </Form>
        </Content>
    </Layout>
}
export default VietQrForm