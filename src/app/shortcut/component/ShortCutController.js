"use client";

import { Button } from 'antd';
import { useSearchParams } from 'next/navigation';


import { useCallback, useEffect, useRef, useState } from 'react';
import { icons } from 'antd/es/image/PreviewGroup';
import { isObject } from 'lodash';


const ShortCutController = () => {
  const searchParams = useSearchParams();
  const appName = searchParams.get('app_name');
  const appIcon = searchParams.get('app_icon');
  const redirectUrl = searchParams.get('redirect_url');
  // const storeCode = searchParams.toString();

  const isInit = useRef(false)

  const [deferredPrompt, setDeferredPrompt] = useState(null)

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const manifestElement = document.getElementById("manifest");
  //     const manifestData = {

  //       name: "Chuyển tiền",
  //       short_name: "Chuyển tiền",
  //       start_url: `${document.location.href}`,
  //       display: "standalone",
  //       background_color: "#ffffff",
  //       theme_color: "#000000",
  //       icons: [
  //         {
  //           "src": "https://simg.zalopay.com.vn/zst/zpi/images/mini-app-info/service_transfer_money.png",
  //           "sizes": "32x32",
  //           "type": "image/svg+xml"
  //         }
  //       ]
  //     };

  //     const manifestString = JSON.stringify(manifestData);
  //     const url = 'data:application/manifest+json, ' + manifestString;
  //     manifestElement?.setAttribute(
  //       "href",
  //       url
  //     );
  //     return () => {
  //       clearTimeout(timeout)
  //     }
  //   }, 0)
  // }, []);

  const handleBeforeInstallPrompt = useCallback((e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()

    // Store the event for later use
    setDeferredPrompt(e)
  }, [])

  const handleAddToHomeScreenClick = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }
      setDeferredPrompt(null)
    } else if (isIOS) {
      // Here we could notify the user to guide them in order to add the app to Home Screen.
      // You can update your UI to render a notification, popin, alert...
      console.log(
        "To add this web app to your Home Screen, open this app in Safari and tap the Share button, then select 'Add to Home Screen'."
      )
      window.open("plus://plus.vn/ScanQr/open", "_blank")
    } else {
      console.log("Install prompt is not available")
    }
  }

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
      window.open("plus://plus.vn/ScanQr/open", "_blank")
    }
  })

  useEffect(() => {
    document.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      document.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [handleBeforeInstallPrompt])



  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      handleAddToHomeScreenClick();
    }
  });

  return (
    <div className={"flex align-center justify-center"}>
      <Button onClick={handleAddToHomeScreenClick}>
        Add to Home Screen
      </Button>
    </div>
  )
}

export default ShortCutController;

