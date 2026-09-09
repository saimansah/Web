"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";
export type OSType = "iOS" | "Android" | "macOS" | "Windows" | "Linux" | "Other";
export type OrientationType = "portrait" | "landscape";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: OrientationType;
  deviceType: DeviceType;
  os: OSType;
  screenWidth: number;
  screenHeight: number;
  isMounted: boolean;
  label: string;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    orientation: "portrait",
    deviceType: "desktop",
    os: "Other",
    screenWidth: 1280,
    screenHeight: 800,
    isMounted: false,
    label: "Desktop Workstation",
  });

  useEffect(() => {
    const detect = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0;

      const ua = navigator.userAgent || "";
      let os: OSType = "Other";
      if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
      else if (/Android/i.test(ua)) os = "Android";
      else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
      else if (/Windows/i.test(ua)) os = "Windows";
      else if (/Linux/i.test(ua)) os = "Linux";

      // Mobile: screen width < 768 or touch device under 1024 with mobile OS
      const isMobile =
        width < 768 || (isTouch && width < 1024 && (os === "iOS" || os === "Android"));
      // Tablet: screen width between 768 and 1024, or iPad/touch tablets up to 1280
      const isTablet =
        !isMobile && (width < 1024 || (isTouch && width <= 1280));
      // Desktop: screen width >= 1024 and not a mobile touch device
      const isDesktop = !isMobile && !isTablet;

      const deviceType: DeviceType = isMobile
        ? "mobile"
        : isTablet
        ? "tablet"
        : "desktop";

      const orientation: OrientationType =
        width > height ? "landscape" : "portrait";

      const label = isMobile
        ? `Mobile (${os})`
        : isTablet
        ? `Tablet (${os})`
        : `Desktop (${os})`;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        orientation,
        deviceType,
        os,
        screenWidth: width,
        screenHeight: height,
        isMounted: true,
        label,
      });
    };

    detect();
    window.addEventListener("resize", detect, { passive: true });
    window.addEventListener("orientationchange", detect, { passive: true });

    return () => {
      window.removeEventListener("resize", detect);
      window.removeEventListener("orientationchange", detect);
    };
  }, []);

  return deviceInfo;
}

