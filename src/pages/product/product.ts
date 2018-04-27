import { DetailProductPage } from './../detail-product/detail-product';
import { ProductService } from './../../services/product.service';
import { Component , ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  @ViewChild(Content) content: Content;
  findText:string = ""
  viewsearch:boolean = false
  products:any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl : ToastController,
    public producS : ProductService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.producS.getListProducts(false).subscribe((data:any) => {
      console.log(data)
      this.products = data
    })
  }

  ionViewWillEnter() {
    this.producS.getListProducts(false).subscribe((data:any) => {
      console.log(data)
      this.products = data
      this.producS.currentTotal = this.products.total
      this.producS.since = 10
      this.viewsearch=false
    })
  }

  onInput( event:any ) {
    if( this.findText.length > 3 ) {
      this.producS.findProductByText( this.findText ).subscribe((result:any) => {
        let products_result : Object[]= result['products']
        
        console.log( products_result )

        if( products_result.length > 0 ) {
          this.products['products'] = []
          this.products['products'] = products_result
        }

      })
      this.viewsearch=true
    } else {
        if( this.products['products'].length < 10 ) {
          this.ionViewWillEnter()
          this.viewsearch = false
        }
    }
    
  }

  onCancel( event:any ) {
    console.log(event)
    this.viewsearch=false
  }

  showSearch() {
    this.content.scrollToTop()
    this.viewsearch = !this.viewsearch
  }

  createProduct(){
    this.navCtrl.push( DetailProductPage , { title: 'Nuevo Producto' , new : true } )
  }

  updateProduct( product : any ){
    this.navCtrl.push( DetailProductPage , { title: 'Actualizar Producto', product : product , new : false  })
  }


  loadMore(){
    console.log( 'Load More' )
    this.producS.getListProducts(true).subscribe((result:any)=> {

      if( this.products['products'].length == result['total']) {
        this.toastCtrl.create(
          {message:'No hay mas registros', position:'top', duration: 900 }).present()
        console.log('No hay nuevos registros')
        return;
      }

      if( result != null && result != undefined && result['products'].length > 0 ) {
        console.log( result['products'] )
        let products_result  : object[] =  result['products'] 
        
        products_result.forEach(p => this.products['products'].push(p))

      }
    })
  }

}
 