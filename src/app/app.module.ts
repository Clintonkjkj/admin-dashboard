import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ConfigureModule } from './components/configure/configure.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { MediaModule } from './components/media/media.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';
import { AuthModule } from './components/auth/auth.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent, VerifyEmailComponent],
  imports: [
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireStorageModule,                               // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ConfigureModule,
    CouponsModule,

    MediaModule,
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
