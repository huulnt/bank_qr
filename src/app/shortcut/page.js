import ShortCutHeader from './component/ShortCutHeader';
import ShortCutController from './component/ShortCutController';
import { Suspense } from 'react';
import manifest from './manifest'

// import { Suspense } from 'react';

// export const metadata = {
//   title: "Tìm điểm chấp nhận thẻ VIB",
//   description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Card",
//   icons: {
//     icon: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
//     other: {
//       rel: 'apple-touch-icon',
//       url: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
//     },
//   },
//   openGraph: {
//     title: "Tìm điểm chấp nhận thẻ VIB",
//     description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Card",
//     images: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
//   },
// };

export async function generateMetadata({ params: { } }) {
  return {
    manifest: `/manifest_scan_qr.json`,
  }
}

const ShortCut = () => {
  return <>
    <ShortCutHeader></ShortCutHeader>
    <Suspense>
      <ShortCutController></ShortCutController>
    </Suspense>
      {/* <ShortCutController></ShortCutController> */}
  </>
}

export default ShortCut;


