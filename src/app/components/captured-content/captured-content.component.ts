import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-captured-content',
  templateUrl: './captured-content.component.html',
  styleUrls: ['./captured-content.component.css']
})
export class CapturedContentComponent {
  @Input() capturedContent: string | null = null;
  @Input() isVideo: boolean = false;

  downloadContent() {
    if (!this.capturedContent) {
      console.error('No content available to download.');
      return;
    }

    const link = document.createElement('a');
    link.href = this.capturedContent;

    if (this.isVideo) {
      link.download = 'recorded-video.webm';
    } else {
      link.download = 'captured-photo.png';
    }

    // Programmatically trigger the download
    link.click();
  }
}
