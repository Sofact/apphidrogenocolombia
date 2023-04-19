import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor ( private authService: AuthService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
        //console.log("Entro al interceptor");
        let authReq = req;
        const token = this.authService.getToken();

         //console.log("Entro al interceptor el token:::"+ token);
        if(token != null){

            //console.log("el bearere:::"+ token);
            authReq = authReq.clone({
            
                
                setHeaders : {Authorization:`Bearer ${token}`}
            })
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [

    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]