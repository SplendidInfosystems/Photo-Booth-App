import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebcamService {
  private stream: MediaStream | null = null;
  private mediaRecorder!: MediaRecorder;
  private recordedChunks: Blob[] = [];
  private isRecordingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Observable for recording state
  get isRecording$(): Observable<boolean> {
    return this.isRecordingSubject.asObservable();
  }

  // Start webcam stream
  startWebcam(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        return stream;
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
        throw error;
      });
  }

  // Take a photo
  takePhoto(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement): string {
    const canvas = canvasElement;
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext('2d');
    context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/png');
  }

  // Start recording
  startRecording(): void {
    debugger;
    if (!this.stream) {
      console.error('No video stream available for recording.');
      return;
    }

    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video/webm' });

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => this.recordedChunks.push(event.data);
    this.mediaRecorder.onstop = () => this.isRecordingSubject.next(false);

    this.mediaRecorder.start();
    this.isRecordingSubject.next(true);
  }

  // Stop recording
  stopRecording(): string {
    debugger;
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }

    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    return URL.createObjectURL(blob);
  }

  // Cleanup webcam resources
  stopWebcam(): void {
    
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    this.stream = null;
  }
}
