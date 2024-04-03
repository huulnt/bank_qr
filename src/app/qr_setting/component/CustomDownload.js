import VietQrCode from "@/app/qr_setting/component/VietQrCode";
import { Form, Input } from "antd";
import { forwardRef, useEffect } from "react";

const CustomDownload = forwardRef(function CustomDownload(props, ref) {
    const { config } = props;
    const [form] = Form.useForm();

    const width = Form.useWatch('width', form);
    const height = Form.useWatch('height', form);
    const paddingLeft = Form.useWatch('paddingLeft', form);
    const paddingRight = Form.useWatch('paddingRight', form);
    const paddingTop = Form.useWatch('paddingTop', form);
    const paddingBottom = Form.useWatch('paddingBottom', form);

    useEffect(() => {
        return () => {
            console.log('close')
            form.resetFields();
        }
    }, [form]);

    return <>
        <div className="flex justify-center" >
            <div className=" border border-slate-300 overflow-auto" >
                <VietQrCode
                    {...config}
                    accNumber={config.bankAccount}
                    amountWithAmount={config.amount}
                    descriptionWithAmount={config.description}
                    width={width}
                    height={height}
                    ref={ref}
                    paddingLeft={paddingLeft}
                    paddingBottom={paddingBottom}
                    paddingRight={paddingRight}
                    paddingTop={paddingTop}
                ></VietQrCode>
            </div>
        </div>

        <div className="py-6">
            <Form
                form={form}
                initialValues={{
                    width: 450,
                    height: 'auto',
                    paddingLeft: 20,
                    paddingBottom: 20,
                    paddingRight: 20,
                    paddingTop: 20,
                }}
            >
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:gap-3 mb-2">
                    <Form.Item className="w-full" name="width" style={{ marginBottom: 12 }}>
                        <Input placeholder="Width"></Input>
                    </Form.Item>
                    <Form.Item className="w-full mb-1" name="height" style={{ marginBottom: 12 }}>
                        <Input placeholder="Height"></Input>
                    </Form.Item>
                    {/* <Form.Item className="w-full mb-1" name="padding" style={{ marginBottom: 12 }}>
                        <Input placeholder="Padding"></Input>
                    </Form.Item> */}
                    {/*<Form.Item className="w-full">*/}
                    {/*    <Input placeholder="Margin"></Input>*/}
                    {/*</Form.Item>*/}
                </div>
                <div className="relative">
                    <div className="absolute -top-3 left-5 px-3 bg-white">
                        Padding
                    </div>
                    <div className="border border-slate-100 p-4">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:gap-3 mb-2">
                            <Form.Item className="w-full" name="paddingTop" style={{ marginBottom: 12 }}>
                                <Input placeholder="Padding Top"></Input>
                            </Form.Item>
                            <Form.Item className="w-full" name="paddingRight" style={{ marginBottom: 12 }}>
                                <Input placeholder="Padding Right"></Input>
                            </Form.Item>
                            <Form.Item className="w-full" name="paddingLeft" style={{ marginBottom: 12 }}>
                                <Input placeholder="Padding Left"></Input>
                            </Form.Item>
                            <Form.Item className="w-full" name="paddingBottom" style={{ marginBottom: 12 }}>
                                <Input placeholder="Padding Bottom"></Input>
                            </Form.Item>
                        </div>
                    </div>
                </div>

            </Form>


        </div>
    </>
})
export default CustomDownload;