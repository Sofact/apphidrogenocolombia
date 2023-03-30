import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class AgendaService {

    constructor(private http: HttpClient) { }

    get_agenda(data:any){
    
        let url = URL_SERVICIOS +"/agenda";
        return this.http.get(url);
          
      }
}
