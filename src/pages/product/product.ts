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

}
