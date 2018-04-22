import { DetailProductPage } from './../detail-product/detail-product';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  findText:string = ""
  viewsearch:boolean = false
  products:any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public producS : ProductService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.producS.getListProducts().subscribe((data:any) => {
      console.log(data)
      this.products = data
    })
  }

  ionViewWillEnter() {
    this.producS.getListProducts().subscribe((data:any) => {
      console.log(data)
      this.products = data
    })
  }

  onInput( event:any ) {
    console.log( event )
    this.viewsearch=true
  }

  onCancel( event:any ) {
    console.log(event)
    this.viewsearch=false
  }

  showSearch() {
    this.viewsearch = !this.viewsearch
  }

  createProduct(){
    this.navCtrl.push( DetailProductPage , { title: 'Nuevo Producto' , new : true } )
  }

  updateProduct( product : any ){
    this.navCtrl.push( DetailProductPage , { title: 'Actualizar Producto', product : product , new : false  })
  }


}
