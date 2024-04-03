'use client';

import { forwardRef, memo, useMemo } from "react";
import {
    Card, Typography
} from 'antd';
import { calculationCRC, convertVietnameseCharacterToUnicode } from "../helper/qr_setting_helper";
import { upperCase } from "lodash";
import QRCode from "qrcode.react";


const VIET_QR_CODE = Object.freeze({
    PAYLOAD_FORMAT_INDICATOR: "000201",
    POINT_OF_INITIATION_METHOD: "010212",
    STATIC_POINT_OF_INITIATION_METHOD: "010211",
    BANK_VIET_BANK_CODE: "970454",
    COUNTRY_CODE: "5802VN",
    TRANSACTION_CURRENCY_CODE: "5303704",
    ADDITIONAL_DATA_FIELD_TEMPLATE: "62",
    AID: "0010A00000072701",
    NAPAS_FAST_TRANSFER: "0208QRIBFTTA",
    CRC: "6304",
});

const VietQrCode = forwardRef(function VietQrCode(props, ref) {
    const {
        accNumber = "",
        amountWithAmount = '',
        descriptionWithAmount = "",
        bankCode = '',
        logo = '',
        bankName = '',
        fullName = '',
        allowAmount = false,
        width,
        height,
        paddingLeft,
        paddingBottom,
        paddingRight,
        paddingTop
    } = props;

    const generationQRCodeWithAmount = useMemo(() => {
        const payloadFormatIndicator = VIET_QR_CODE.PAYLOAD_FORMAT_INDICATOR; // Payload Format Indicator, The Payload Format Indicator shall contain a value of "01". All other values are Reserved for Future Use (RFU)
        const pointOfInitiationMethod = amountWithAmount === "" ? VIET_QR_CODE.STATIC_POINT_OF_INITIATION_METHOD : VIET_QR_CODE.POINT_OF_INITIATION_METHOD; // Point of Initiation Method, 11: Static QR Code, 12: dynamic QR Code. All other values are RFU.
        const account = upperCase(accNumber);
        const accountNumberLength = account.length < 10 ? `0${account.length}` : account.length;
        // beneficiary bank code https://www.indovinabank.com.vn/sites/default/files/0%20MARKETING_p1/EBANKING%20forms/Các%20ngân%20hàng%20trong%20liên%20minh%20NAPAS_vn.pdf
        const bankInformation = `0006${bankCode}01${accountNumberLength}${account}`;
        const beneficiaryInformation = `${VIET_QR_CODE.AID}${bankInformation.length}${bankInformation}${VIET_QR_CODE.NAPAS_FAST_TRANSFER}`; // Beneficiary account information
        const consumerAccountInformation = `38${beneficiaryInformation.length}${beneficiaryInformation}`; // Merchant Account Information
        const transactionCurrency = VIET_QR_CODE.TRANSACTION_CURRENCY_CODE; // Transaction Currency Code https://en.wikipedia.org/wiki/ISO_4217
        const transactionAmountKey = amountWithAmount === "" ? "" : "54"; // Transaction Amount
        const amountNumber = amountWithAmount || "";
        const transactionAmount = amountWithAmount === "" ? "" : parseInt(amountNumber).toString(); // convert account number to string
        let transactionAmountLength = "";
        if (transactionAmount === "") {
            transactionAmountLength = "";
        } else {
            transactionAmountLength = transactionAmount.length < 10 ? `0${transactionAmount.length}` : transactionAmount.length;
        }
        const transactionDescriptionKey = VIET_QR_CODE.ADDITIONAL_DATA_FIELD_TEMPLATE; // Additional Data Field Template
        const transactionDescription = descriptionWithAmount || "";
        const convertToUnicode = convertVietnameseCharacterToUnicode(transactionDescription); // replace all vietnamese character to unicode
        const replaceAllSpecialCharacterDescription = (convertToUnicode || '').replace(/[^a-zA-Z0-9 ]/g, ""); // remove all special character
        const transactionDescriptionLength = replaceAllSpecialCharacterDescription.length + 4 < 10 ? `0${replaceAllSpecialCharacterDescription.length + 4}` : replaceAllSpecialCharacterDescription.length + 4;
        const countryCode = VIET_QR_CODE.COUNTRY_CODE; // Country Code https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
        const endCode = VIET_QR_CODE.CRC; // CRC (Cyclic Redundancy Check)

        let code = `${payloadFormatIndicator + pointOfInitiationMethod + consumerAccountInformation + transactionCurrency + transactionAmountKey + transactionAmountLength + transactionAmount + // for amount
            countryCode}`;

        if (replaceAllSpecialCharacterDescription.length !== 0) {
            code = `${code + transactionDescriptionKey + transactionDescriptionLength}08${replaceAllSpecialCharacterDescription.length < 10 ? `0${replaceAllSpecialCharacterDescription.length}` : replaceAllSpecialCharacterDescription.length}${replaceAllSpecialCharacterDescription // for description
                }${endCode}`;
        } else {
            code = `${code + endCode}`;
        }

        const crcCode = calculationCRC(code); // Cyclic redundancy check (CRC): Checksum calculated over all the data objects included in the QR Code. [ISO/IEC 13239] https://www.lammertbies.nl/comm/info/crc-calculation

        return `${code}${crcCode.length < 4 ? `0${crcCode}` : crcCode}`
    }, [accNumber, amountWithAmount, bankCode, descriptionWithAmount]);

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    return <>
        <div className="flex flex-col min-h-80" style={{
            width: `${width < 450 ? `${450}px` : `${width}px`}`,
            height: `${height < 360 ? 'auto' : `${height}px`}`,
            paddingLeft: `${paddingLeft}px`,
            paddingBottom: `${paddingBottom}px`,
            paddingRight: `${paddingRight}px`,
            paddingTop: `${paddingTop}px`,
        }} ref={ref} >
            <div className="flex justify-center mb-4">
                <QRCode
                    renderAs="canvas"
                    value={generationQRCodeWithAmount}
                    size={200}
                    level="H"
                    imageSettings={{
                        src: logo,
                        width: 36,
                        height: 36,
                    }}
                />
            </div>
            <div className="flex flex-col justify-center text-center">
                <Typography.Title level={2} style={{ margin: 0 }} className="mb-1 uppercase">
                    {accNumber}
                </Typography.Title>
                <Typography.Title level={3} style={{ margin: 0 }} className="mb-1 uppercase">
                    {fullName}
                </Typography.Title>

                <Typography.Title level={5} style={{ margin: 0 }}>
                    {bankName}
                </Typography.Title>

                {allowAmount && (amountWithAmount || descriptionWithAmount) &&
                    <div className="flex justify-center mt-2">
                        <Card className="p-1">
                            {amountWithAmount && <Typography.Title level={5} style={{ margin: 0 }}>
                                Amount: {formatter.format(amountWithAmount)}
                            </Typography.Title>}
                            {descriptionWithAmount && <Typography.Title level={5} style={{ margin: 0 }}>
                                Description: {descriptionWithAmount}
                            </Typography.Title>}
                        </Card>
                    </div>}
            </div>
        </div>
    </>

});

export default memo(VietQrCode)