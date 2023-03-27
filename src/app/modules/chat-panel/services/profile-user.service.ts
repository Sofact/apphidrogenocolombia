import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/_services/auth.service';
import { URL_SERVICIOS } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {

  constructor(
      public http: HttpClient,
      public authServicese: AuthService,
    ) { }

    
    ContactUsers(){
      let headers =  new HttpHeaders({'Autorization': 'Bearer'+ this.authServicese.token});
      let LINK = URL_SERVICIOS+"/users/contact-users";
      return this.http.get(LINK,{ headers: headers});
    }
}
 