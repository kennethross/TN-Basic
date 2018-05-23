import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SimpleAlertProvider } from '../providers/simple-alert/simple-alert';
import { LoginControlProvider } from '../providers/login-control/login-control';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any;

  mainPages: Array<PageInterface> = [
    { title: 'Dashboard', name: "", logsOut: false, component: DashboardPage, index: 0, icon:"wifi" },
    { title: 'Visitor', name: "", logsOut: false, component: HomePage, index: 0, icon:"people" },
    { title: 'Kiosk Mode', name: "", logsOut: false, component: HomePage, index: 0, icon:"tablet-portrait" }
  ];

  otherCategoriesPages: Array<PageInterface> = [
    { title: '#CheckIn', name: "", logsOut: false, component: HomePage, index: 0, icon:"navigate" },
    { title: '#GateControl', name: "", logsOut: false, component: HomePage, index: 0, icon:"" },
    { title: '#ClaimPrize', name: "", logsOut: false, component: HomePage, index: 0, icon:"" },
    { title: '#CheckTacPoints', name: "", logsOut: false, component: HomePage, index: 0, icon:"Ribbons" },
    { title: 'Log Out', name: "logout", logsOut: false, component: null, index: 0, icon:"log-out" },
  ]
  constructor(
    public simpleAlert: SimpleAlertProvider,
    public loginCtrl: LoginControlProvider,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.loginSetup();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();~
      this.splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if(page.name === 'logout'){
      this.logOut();
    }else {
      this.nav.setRoot(page.component);
    }
  }

  // ############################################
  // ############# Login Control ################
  // ############################################

  loginSetup(){
    this.loginCtrl.loginControl().then( res => {
      // set rootpage after successfull login
      console.log("Setting the root page");
      this.settingTheRootInTheMainMenu();
    });
  }

  logOut(){
    this.simpleAlert.showLoadingWithMessage("Logging out...");
    this.loginCtrl.logout().then(() => {
      // this.settingTheRootInTheMainMenu();
      this.simpleAlert.dismissLoading();
      this.loginSetup();
    }, err => {
      console.log(err.description);
    });
  }

  settingTheRootInTheMainMenu(){
    this.nav.setRoot(DashboardPage);
  }

}
