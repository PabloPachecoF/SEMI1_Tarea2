import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError} from 'ngx-webcam';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'camara';

  verCam = true;
  errors: WebcamInitError[] = [];
  webcamImage: WebcamImage | undefined;
  nwCaptura: Subject<void> = new Subject<void>();
  infoCamara: string = "OFF";

  captura: MediaTrackConstraints = {
    width: {ideal: 150},
    height: {ideal: 150}
  };


  public ngOnInit(): void {
  }

  public tomarFoto(): void {
    this.nwCaptura.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public apagarCamara(): void {
    this.verCam = !this.verCam;
    if(this.verCam){
      this.infoCamara = "OFF";
    }else{
      this.infoCamara = "ON";
    }
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('captura', webcamImage);
    this.webcamImage = webcamImage;
  }


  public get triggerObservable(): Observable<void> {
    return this.nwCaptura.asObservable();
  }

}

