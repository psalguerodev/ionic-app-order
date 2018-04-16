import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";
import { map } from 'rxjs/operator/map';


@Injectable()
export class ProductService {

    public apiurl : string = "http://localhost:8002/api"

    constructor( private _http: HttpClient ) {

    }

    getListProducts() {
        return this._http.get( this.apiurl + "/product")
        .map( (result:any) => result )        
    }

    getProduct() {

    }

    saveProduct() {

    }

    updateProduct() {

    }

    deleteProduct() {

    }

}