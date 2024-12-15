import { Component } from '@angular/core';
import { ExternalLinkService } from '../services/external-link.service';

@Component({
  selector: 'app-your-component',
  template: `
    <a (click)="openLink('https://example.com'); $event.preventDefault()" 
       href="https://example.com">
      External Link
    </a>
  `
})
export class YourComponent {
  constructor(private externalLinkService: ExternalLinkService) {}

  openLink(url: string) {
    this.externalLinkService.openLink(url);
  }
} 