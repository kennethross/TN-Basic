import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

/*
  Generated class for the SimpleAlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SimpleAlertProvider {

  loading: any;
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    console.log('Hello SimpleAlertProvider Provider');
  }

  showTitleWithMessage(title, message){ 

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons:['Done']
    });
    alert.present();
  }

  showSuccessWithMessage(message: string){

    this.loading !== null ? this.dismissLoading() : null;

    let alert = this.alertCtrl.create({
      title: 'Successful',
      message: message,
      buttons:['Okay']
    });

    alert.present();
  }

  showSuccessMessageWithHandler(message: string){

    this.loading !== null ? this.dismissLoading() : null;

    return new Promise<any>((resolve) => {
      let alert = this.alertCtrl.create({
        title: 'Successful',
        message: message,
        buttons: [
          {
            text: 'Done',
            handler: () => {
              resolve();
            }
          }
        ]
      });
  
      alert.present();
    });
  }

  showErrorWithMessage(message: string){

    this.loading !== null ? this.dismissLoading() : null;

    let alert = this.alertCtrl.create({
      title: "Error",
      message: message,
      buttons:['Okay']
    });

    alert.present();
  }

  showLoadingWithMessage(message: string){
    this.loading = this.loadingCtrl.create({
      content: message,
      cssClass: "loadingCss",
      enableBackdropDismiss: false
    });

    this.loading.present();
  }

  dismissLoading(){
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
  }

  showAlertWithCustomTitleButton(title, desc, buttonTitle){
    return new Promise<any>((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: desc,
        buttons:[
          {
            text: buttonTitle,
            handler:() => {
              resolve(buttonTitle);
            }
          },
          {
            text: 'Cancel'
          }
        ]
      })
      
      alert.present();
    });
  }

  showAlertWithTitleAndDescAndHandler(title, desc, buttonTitle){
    return new Promise<any>(resolve => {
      let alert = this.alertCtrl.create({
        title: title,
        message: desc,
        buttons: [
          
          {
            text: buttonTitle,
            handler: () => {
              resolve(buttonTitle);
            }
          }
        ],
      enableBackdropDismiss: false
      },)

      alert.present();
    });

  }

  
}
