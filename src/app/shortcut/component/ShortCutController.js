"use client";

import Head from 'next/head';
import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';

const ShortCutController = () => {

  const searchParams = useSearchParams();

  const appName = searchParams.get('app_name');
  const appIcon = searchParams.get('app_icon');
  const redirectUrl = searchParams.get('redirect_url');

  useEffect(() => {
    if (redirectUrl) {
      var myDynamicManifest = {
        name: appName,
        short_name: appName,
        start_url: redirectUrl,
        display: 'standalone',
        icons: [
          {
            src: appIcon,
            sizes: '32x32',
            type: 'image/svg+xml',
          },
        ],
        background_color: 'white',
      };
      const stringManifest = JSON.stringify(myDynamicManifest);
      let url = 'data:application/manifest+json,' + stringManifest;
      // document.querySelector('#manifest-placeholder').setAttribute('href', url);
    }
    return () => {

    };
  }, [appIcon, appName, redirectUrl]);


  return <>
    <Head>
      <link rel="manifest" id="manifest-placeholder"></link>
    </Head>
    <AddToHomeScreen />
  </>
}

export default ShortCutController;

