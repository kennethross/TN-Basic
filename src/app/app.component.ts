import { Component, ViewChild, } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { VisitorsPage } from '../pages/visitors/visitors';
import { KioskPage } from '../pages/kiosk/kiosk';
import { EventListPage } from '../pages/event-list/event-list';
import { ProfileDetailPage } from '../pages/profile-detail/profile-detail';
import { UserDataProvider } from '../providers/user-data/user-data';
import { SimpleAlertProvider } from '../providers/simple-alert/simple-alert';
import { LoginControlProvider } from '../providers/login-control/login-control';
import { User, Event, Profile } from './model/model';

// import { RegistrationFormPage } from '../pages/registration-form/registration-form';
// import { SuccessCheckedinPage } from '../pages/success-checkedin/success-checkedin';
// import { EmailCheckinPage } from '../pages/email-checkin/email-checkin';
// import { PhoneCheckinPage } from '../pages/phone-checkin/phone-checkin';
// import { CheckinInputFieldPage } from '../pages/checkin-input-field/checkin-input-field';
// import { PreScanCheckinPage } from '../pages/pre-scan-checkin/pre-scan-checkin';
// import { EventListPage } from '../pages/event-list/event-list';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  selected?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any;
  userProfile: any;
  eventInfo: any;

  mainPages: Array<PageInterface> = [
    { title: 'Dashboard', name: "", logsOut: false, component: DashboardPage, index: 0, icon:"wifi", selected: false },
    { title: 'Visitor', name: "", logsOut: false, component: VisitorsPage, index: 0, icon:"people", selected: false },
    { title: 'Kiosk Mode', name: "", logsOut: false, component: KioskPage, index: 0, icon:"tablet-portrait", selected: false }
  ];

  otherCategoriesPages: Array<PageInterface> = [
    { title: '#CheckIn', name: "", logsOut: false, component: HomePage, index: 0, icon:"navigate" , selected: false},
    { title: '#GateControl', name: "", logsOut: false, component: HomePage, index: 0, icon:"", selected: false },
    { title: '#ClaimPrize', name: "", logsOut: false, component: HomePage, index: 0, icon:"", selected: false },
    { title: '#CheckTacPoints', name: "", logsOut: false, component: HomePage, index: 0, icon:"Ribbons", selected: false },
    { title: 'Log Out', name: "logout", logsOut: false, component: null, index: 0, icon:"log-out", selected: false },
  ]

  constructor(
    public modalCtrl: ModalController,
    public userData: UserDataProvider,
    public simpleAlert: SimpleAlertProvider,
    public loginCtrl: LoginControlProvider,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();
      console.log("App component called");
    // used for an example of ngFor and navigation

    this.userProfile = new User();
    this.eventInfo = new Event();

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
      
      this.showEventList().then( ()=> {

        this.userData.getUserProfileInfo().then(() => {
          this.configDataAfterLogin();
        });
      });
    });
  }

  configDataAfterLogin(){
    this.syncUserProfile();
    this.syncEventInfo();
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
    // this.nav.setRoot(ProfileDetailPage);
  }

  // ############################################
  // ############### User Info ##################
  // ############################################

  syncUserProfile(){
    this.userData.getUserProfileInfoLocally().then( val => {
      console.log("User Profile : ", val);
      this.userProfile = val;
    });
  }

  openProfileDetail(){
    let modal = this.modalCtrl.create(ProfileDetailPage, {user: this.userProfile});
    modal.present();
  }

  // ############################################
  // ################# Event ####################
  // ############################################

  showEventList(){
    return new Promise<any>( resolve => {
      let showEvent = this.modalCtrl.create(EventListPage);
      showEvent.onDidDismiss(()=> {
        this.settingTheRootInTheMainMenu();
        resolve();
      });
  
      showEvent.present();
    });
  }

  syncEventInfo(){
    this.userData.getEventInfoLocally().then( val => {
      this.eventInfo = val;
    });
  }

}
