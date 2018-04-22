import { ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})
export class DetailProductPage {

  title: string = "";
  product : any = {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    public productS : ProductService,
    public toastCtrl : ToastController ) {
  }

  ionViewDidLoad() {
    this.title = (this.navParams.get('title')) ? this.navParams.get('title') : 'Producto'
    this.product = (this.navParams.get('product')) ? this.navParams.get('product'): {}
  }

  productHandler() {
    if( this.product._id != null || this.product._id != undefined ){
      //	Actualizar
      this.productS.updateProduct( this.product ).subscribe( (data:any) => {
        let toast = this.toastCtrl.create({
          message: data.message || 'Actualizado correctamente',
          duration: 900,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'Ok',
          showCloseButton: true
        });
        toast.present();
        this.navCtrl.pop()
      })
    }else {
      // Nuevo Registro
      this.productS.saveProduct( this.product ).subscribe( (data:any) => {
        let toast = this.toastCtrl.create({
          message: data.message || 'Registrado correctamente',
          duration: 900,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'Ok',
          showCloseButton: true
        });
        toast.present();
        this.navCtrl.pop()
      })
    }
  }

  

}
 