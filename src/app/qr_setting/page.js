import React, { useMemo } from 'react';

import VietQrCode from './component/VietQrCode';
import VietQrForm from './component/VietQrForm';



export const metadata = {
    title: "Create your bank qr code",
    description: "Support create bank qr code free",
};


const QrSetting = () => {
    return <VietQrForm></VietQrForm>
};

export default QrSetting;