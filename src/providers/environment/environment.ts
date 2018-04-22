import { config } from '../../config/configuration';
import { Injectable } from '@angular/core';


@Injectable()
export class EnvironmentProvider {

  constructor() {
    // console.log('Hello EnvironmentProvider Provider');
  }

  getEndPointApi() : string {
    return ( config.prd ) ? config.prd_api : config.local_api
  }

}
