import { ProductPage } from './../pages/product/product';
import { ServerPage } from './../pages/server/server';
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import * as io from 'socket.io-client';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  appMenuItems: Array<MenuItem>;
  public socket : SocketIOClient.Socket;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public toastCtrl : ToastController
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Inicio', component: HomePage, icon: 'home'},
      {title: 'Servidor', component: ServerPage, icon: 'logo-nodejs'},
      {title: 'Clima', component: LocalWeatherPage, icon: 'partly-sunny'},
      {title: 'Pedidos', component: LocalWeatherPage, icon: 'list-box'},
      {title: 'Graficos', component: LocalWeatherPage, icon: 'stats'},
      {title: 'Productos', component: ProductPage, icon: 'cart'},
      {title: 'Clientes', component: LocalWeatherPage, icon: 'contacts'}
    ];

    this.socket = io.connect("http://159.65.101.200:8002/socket-app");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);

      //	Connection Socket
      this.socket.on('test-save', (data:any) => {
        let toast = this.toastCtrl.create({
          message: 'Connect: ' + data.message,
          duration: 3000,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
      })

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
