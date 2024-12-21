import { Component, ElementRef, ViewChild, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { WebcamService } from '../../services/webcam.service';

@Component({
  selector: 'app-webcam-preview',
  templateUrl: './webcam-preview.component.html',
  styleUrls: ['./webcam-preview.component.css'],
})
export class WebcamPreviewComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  videoUrl: string | null = null;
  isRecording = false;

  @Output() capture = new EventEmitter<{ content: string, isVideo: boolean }>();

  constructor(private webcamService: WebcamService) {}

  ngOnInit(): void {
    debugger;
    this.webcamService.startWebcam().then((stream) => {
      this.videoElement.nativeElement.srcObject = stream;
    });

    this.webcamService.isRecording$.subscribe((state) => (this.isRecording = state));
  }

  takePhoto(): void {
    const imageUrl = this.webcamService.takePhoto(
      this.videoElement.nativeElement,
      this.canvasElement.nativeElement
    );
    
    this.capture.emit({ content: imageUrl, isVideo: false });
  }

  startRecording(): void {
    debugger;
    this.webcamService.startRecording();
  }

  stopRecording(): void {
    debugger;
    const videoUrl = this.webcamService.stopRecording();
    this.capture.emit({ content: videoUrl, isVideo: true });
    this.videoUrl = videoUrl;
  }

  ngOnDestroy(): void {
    this.webcamService.stopWebcam();
  }
}
