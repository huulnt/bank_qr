"use client";

import { useSearchParams } from 'next/navigation';

const ShortCutController = () => {

  const searchParams = useSearchParams()
 
  const appName = searchParams.get('app_name');
  const appIcon = searchParams.get('app_icon');
  const redirectRrl = searchParams.get('redirect_url');
  


  window.open(redirectRrl)
  
  return <></>
}

export default ShortCutController;