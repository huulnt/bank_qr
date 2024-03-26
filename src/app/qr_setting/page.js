import React, { useMemo } from 'react';

import VietQrCode from './component/VietQrCode';
import VietQrForm from './component/VietQrForm';



export const metadata = {
    title: "Create your bank qr code",
    description: "Support create bank qr code free",
    icons: {
        icon: 'https://app2.timo.vn/cxpassets/frontend/images/pfm/tomi_rock_scissors_paper/avt.jpeg',
    },
    openGraph: {
        title: "Create your bank qr code",
        description: "Support create bank qr code free",
        images: 'https://app2.timo.vn/cxpassets/frontend/images/pfm/tomi_rock_scissors_paper/avt.jpeg',
    },
};


const QrSetting = () => {
    return <VietQrForm></VietQrForm>
};

export default QrSetting;