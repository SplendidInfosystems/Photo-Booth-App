import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WebcamPreviewComponent } from './components/webcam-preview/webcam-preview.component';
import { CapturedContentComponent } from './components/captured-content/captured-content.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamPreviewComponent,
    CapturedContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
