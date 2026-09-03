"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function GlobalSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Open the ONE master channel for the entire app
    const channel = new BroadcastChannel('kirana_hub_master_sync');

    channel.onmessage = (event) => {
      const { type, payload } = event.data;

      // 1. Handle Shop Status Changes (Syncs the Header Toggle & Settings Page)
      if (type === 'SHOP_STATUS_CHANGED') {
        window.dispatchEvent(new CustomEvent('sync-store-status', { detail: payload }));
      }

      // 2. Handle Theme Changes
      if (type === 'THEME_CHANGED') {
        setTheme(payload, null as any);
      }

      // 3. Handle Future Syncs (e.g., Profile Updates)
      if (type === 'USER_PROFILE_UPDATED') {
        window.dispatchEvent(new Event('user-updated'));
      }
    };

    return () => channel.close();
  }, [setTheme]);

  // This component is purely logical and renders nothing visually
  return null; 
}