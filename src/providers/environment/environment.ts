import { config } from '../../config/configuration';
import { Injectable } from '@angular/core';


@Injectable()
export class EnvironmentProvider {

  constructor() {
    // console.log('Hello EnvironmentProvider Provider');
  }

  getEndPointApi() : string {
    let endpoint : string = ""
    if( config.prd ) {
        endpoint = config.prd_api
    }
    endpoint = config.local_api
    return endpoint
  }

}
