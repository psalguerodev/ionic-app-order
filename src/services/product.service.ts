import { EnvironmentProvider } from './../providers/environment/environment';
import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    public apiurl : string = ""

    constructor( private _http: HttpClient, _env: EnvironmentProvider ) {
        this.apiurl = _env.getEndPointApi()
    }

    getListProducts() {
        return this._http.get( this.apiurl + "/product")
        .map( (result:any) => result )        
        .catch( this.handleError )
    }

    saveProduct( product:any ) {
        return this._http.post( this.apiurl + "/product", product )
        .map( (result:any) => result )
        .catch( this.handleError )
    }

    updateProduct( product:any ) {
        return this._http.put( this.apiurl + "/product/" + product._id , product  )
        .map( (result:any) => result )
        .catch( this.handleError )
    }

    deleteProduct( product: any ) {
        return this._http.delete( this.apiurl + "/product/" + product._id )
        .map( (result:any) => result )
        .catch( this.handleError )
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
      }

}