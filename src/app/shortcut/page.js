

import Head from 'next/head';
import ShortCutHeader from './component/ShortCutHeader';
import ShortCutController from './component/ShortCutController';



export const metadata = {
  title: "Tìm điểm chấp nhận thẻ VIB",
  description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Card",
  icons: {
    icon: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
  },
  openGraph: {
    title: "Tìm điểm chấp nhận thẻ VIB",
    description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Card",
    images: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
  },
};

const ShortCut = () => {
 
  
  return <>
    <Head>
      <link id="ZMP_desktopIcon" sizes="114x114" rel="apple-touch-icon-precomposed" href="https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png" />
    </Head>
    <ShortCutHeader></ShortCutHeader>
    <ShortCutController></ShortCutController>
  </>
}

export default ShortCut;