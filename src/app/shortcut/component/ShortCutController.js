"use client";

import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

const ShortCutController = () => {

  const searchParams = useSearchParams()
 
  const appName = searchParams.get('app_name');
  const appIcon = searchParams.get('app_icon');
  const redirectRrl = searchParams.get('redirect_url');
  
  useEffect(() => {
    if (redirectRrl) {
      document.location = redirectRrl;
    }
    return () => {
      
    };
  }, [redirectRrl]);


  return <></>
}

export default ShortCutController;