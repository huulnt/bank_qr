import VietQrForm from "@/app/qr_setting/component/VietQrForm";


export const metadata = {
    title: "Tạo mã chuyển tiền hộ trợ Việt Qr Code",
    description: "Tạo mã chuyển tiền hộ trợ Việt Qr Code",
    icons: {
        icon: 'https://app2.timo.vn/cxpassets/frontend/images/pfm/tomi_rock_scissors_paper/avt.jpeg',
    },
    openGraph: {
        title: "Create your bank qr code",
        description: "Support create bank qr code free",
        images: 'https://app2.timo.vn/cxpassets/frontend/images/pfm/tomi_rock_scissors_paper/avt.jpeg',
    },
};

const TaoQRCode = () => {
    return <VietQrForm></VietQrForm>
}

export default TaoQRCode;