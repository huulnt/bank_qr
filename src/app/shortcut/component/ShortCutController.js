"use client";

import Head from 'next/head';
import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';


const ShortCutController = () => {

  const searchParams = useSearchParams();

  const appName = searchParams.get('app_name');
  const appIcon = searchParams.get('app_icon');
  const redirectUrl = searchParams.get('redirect_url');


  return <>
    {/* <Head>
      <link rel="manifest" id="manifest-placeholder"></link>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no"
      />

     
    </Head> */}

  </>
}

export default ShortCutController;

