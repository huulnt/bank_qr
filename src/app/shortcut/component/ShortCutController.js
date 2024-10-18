"use client";

import { Button } from 'antd';
import { useSearchParams } from 'next/navigation';

import manifest from '/public/manifest.json'

import { useCallback, useEffect, useState } from 'react';
import { icons } from 'antd/es/image/PreviewGroup';


const ShortCutController = () => {

  const searchParams = useSearchParams();

  console.log('searchParams: ', searchParams);
  const appName = searchParams.get('app_name');
  const appIcon = searchParams.get('app_icon');
  const redirectUrl = searchParams.get('redirect_url');
  const storeCode = searchParams.toString();

  const [deferredPrompt, setDeferredPrompt] = useState(null)

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
    } else {
      console.log("Install prompt is not available")
    }
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [handleBeforeInstallPrompt])


  useEffect(() => {
    if (storeCode) {
      const manifestElement = document.getElementById("manifest");
      const manifestData = {
        ...manifest,
        start_url: `/shortcut?${storeCode}`,
        name: appName,
        icons: [
          {
            "src": appIcon,
            "sizes": "32x32",
            "type": "image/svg+xml"
          },
        ]
      };

      console.log('manifestData: ',manifestData);
      

      const manifestString = JSON.stringify(manifestData);
      const url = 'data:application/manifest+json,' + manifestString;
      manifestElement?.setAttribute(
        "href",
        url
      );
    }
  }, [appIcon, appName, storeCode]);


  return (
    <div className={"flex align-center justify-center"}>
      <Button onClick={handleAddToHomeScreenClick}>
        Add to Home Screen
      </Button>
    </div>
  )
}

export default ShortCutController;

