

import Head from 'next/head';
import ShortCutHeader from './component/ShortCutHeader';
import ShortCutController from './component/ShortCutController';

import { Suspense } from 'react'

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
      <meta content="yes" name="apple-touch-fullscreen"></meta>
      <meta content="yes" name="apple-mobile-web-app-capable"></meta>
    </Head>
    <ShortCutHeader></ShortCutHeader>
    <Suspense>
      <ShortCutController></ShortCutController>
    </Suspense>
  </>
}

export default ShortCut;