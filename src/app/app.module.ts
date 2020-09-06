import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AjouterModifierClientPage } from './pages/ajouter-modifier-client/ajouter-modifier-client.page';




@NgModule({
  declarations: [AppComponent , AjouterModifierClientPage],
  entryComponents: [AjouterModifierClientPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    FormsModule,ReactiveFormsModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    FileOpener
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
