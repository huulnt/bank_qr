import { Inter } from "next/font/google";
import Head from "next/head";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
        icon: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
    },
    openGraph: {
        title: "Tìm điểm chấp nhận thẻ VIB",
        description: "Hỗ trợ tìm nơi thanh toán thẻ VIB Supper Card",
        images: 'https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png',
    },
};

const RootLayout = ({ children }) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            {/* <link rel="manifest" href="" id="manifest" /> */}
            {/* <link rel="manifest" href="/manifest.json" id="manifest" /> */}

            {/* <link rel="manifest" id="my-manifest-placeholder"></link> */}
        </head>
        <body>
            <AntdRegistry>{children}</AntdRegistry>
            <SpeedInsights />
        </body>
    </html>
);

export default RootLayout;