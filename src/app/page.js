import Image from "next/image";
import { Button } from "antd";
import VietQrForm from "./qr_setting/component/VietQrForm";

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

export default function Home() {
  

  return <VietQrForm></VietQrForm>
}
