import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  capturedContent: string | null = null;
  isVideo: boolean = false;

  // Handle the emitted event
  onCapture(event: { content: string, isVideo: boolean }) {
    this.capturedContent = event.content;
    this.isVideo = event.isVideo;
  }
}
