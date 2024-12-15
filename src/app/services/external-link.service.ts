import { Injectable } from '@angular/core';

declare global {
  interface Window {
    electronAPI?: {
      openExternal: (url: string) => Promise<void>;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {
  openLink(url: string) {
    if (window.electronAPI) {
      // In Electron environment
      window.electronAPI.openExternal(url);
    } else {
      // In browser environment
      window.open(url, '_blank');
    }
  }
} 