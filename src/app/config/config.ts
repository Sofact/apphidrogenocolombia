import { environment } from "src/environments/environment";
import Echo from "laravel-echo"

export const URL_BACKEND = environment.URL_BACKEND;
export const URL_SERVICIOS = environment.URL_SERVICIOS;
export const URL_FRONTEND   = environment.URL_FRONTEND;


export function ECHO_PUSHER (token:any){
    return new Echo ({
        broadcaster: 'pusher',
        encrypted: environment.production,
        cluster: 'mt1',
        key: 'ASDEFGRG1231',
        wsHost: environment.HOST_BACKEND,
        wsPort: 6001,
        wssPort: 443,
        forceTLS: environment.production,
        disableStats: true,
        // enabledTransports: ['ws', 'wss'],
        authEndpoint: `${URL_SERVICIOS}/broadcasting/autho`,
        auth: {
          headers: {Authorization:`Bearer ${token}`}
          
        },
      });
  }
   