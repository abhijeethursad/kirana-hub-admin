// lib/sync.ts

export type SyncAction = 'THEME_CHANGED' | 'SHOP_STATUS_CHANGED' | 'USER_PROFILE_UPDATED';

export const broadcastSync = (type: SyncAction, payload: any) => {
  const channel = new BroadcastChannel('kirana_hub_master_sync');
  channel.postMessage({ type, payload });
  channel.close();
};