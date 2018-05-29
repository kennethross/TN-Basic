import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module'; 
import { VisitorsPage } from '../pages/visitors/visitors';
import { VisitorsPageModule } from '../pages/visitors/visitors.module';
import { VisitorDetailPage } from '../pages/visitor-detail/visitor-detail';
import { VisitorDetailPageModule } from '../pages/visitor-detail/visitor-detail.module';
import { KioskPage } from '../pages/kiosk/kiosk';
import { KioskPageModule } from '../pages/kiosk/kiosk.module';
import { RegistrationFormPage } from '../pages/registration-form/registration-form';
import { RegistrationFormPageModule } from '../pages/registration-form/registration-form.module';
import { SuccessCheckedinPage } from '../pages/success-checkedin/success-checkedin';
import { SuccessCheckedinPageModule } from '../pages/success-checkedin/success-checkedin.module';
import { EmailCheckinPage } from '../pages/email-checkin/email-checkin';
import { EmailCheckinPageModule } from '../pages/email-checkin/email-checkin.module';
import { PhoneCheckinPage } from '../pages/phone-checkin/phone-checkin';
import { PhoneCheckinPageModule } from '../pages/phone-checkin/phone-checkin.module';
import { CheckinInputFieldPage } from '../pages/checkin-input-field/checkin-input-field';
import { CheckinInputFieldPageModule } from '../pages/checkin-input-field/checkin-input-field.module';
import { PreScanCheckinPage } from '../pages/pre-scan-checkin/pre-scan-checkin';
import { PreScanCheckinPageModule } from '../pages/pre-scan-checkin/pre-scan-checkin.module';
import { EventListPage } from '../pages/event-list/event-list';
import { EventListPageModule } from '../pages/event-list/event-list.module';

import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserDataProvider } from '../providers/user-data/user-data';
import { LoginControlProvider } from '../providers/login-control/login-control';
import { UserTacServiceProvider } from '../providers/user-tac-service/user-tac-service';
import { SimpleAlertProvider } from '../providers/simple-alert/simple-alert';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HttpClientModule,
    DashboardPageModule,
    VisitorsPageModule,
    VisitorDetailPageModule,
    KioskPageModule,
    RegistrationFormPageModule,
    SuccessCheckedinPageModule,
    EmailCheckinPageModule,
    PhoneCheckinPageModule,
    CheckinInputFieldPageModule,
    PreScanCheckinPageModule,
    EventListPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DashboardPage,
    VisitorsPage,
    VisitorDetailPage,
    KioskPage,
    RegistrationFormPage,
    SuccessCheckedinPage,
    EmailCheckinPage,
    PhoneCheckinPage,
    CheckinInputFieldPage,
    PreScanCheckinPage,
    EventListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserTacServiceProvider,
    UserDataProvider,
    LoginControlProvider,
    SimpleAlertProvider,
    ErrorHandlerProvider,
    BarcodeScanner,
    
  ]
})
export class AppModule {}
