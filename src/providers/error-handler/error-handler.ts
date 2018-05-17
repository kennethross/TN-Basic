import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';

/*
  Generated class for the ErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorHandlerProvider {

  constructor() {
    console.log('Hello ErrorHandlerProvider Provider');
  }

  public handleError (error: HttpErrorResponse | any):Observable<any> {

    //let errorStatusCode = error.status;
    var err;

    console.error("Error from sifu : ", error.error);

    if(error.error.error){
      console.log("Founded");
      let temp = error.error.error;
      err = {
        code: temp.code,
        description: temp.description
      }
    }else{
      err = {
        code: error.status,
        description: error.statusText
      }
    }

    console.log("Define error : ", err);

    return Observable.throw(err);
  }
}
