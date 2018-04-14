import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as io from 'socket.io-client';


@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage {

  messageText: string;
  messages: Array<any>;
  socket: SocketIOClient.Socket;

  dataServer : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = io.connect('http://159.65.101.200:8001');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerPage');

    this.socket.on('memory',(data:any)=> {
      this.dataServer = data;
    })

  }

}
