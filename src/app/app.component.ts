import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {NavigationEnd, Router} from '@angular/router';

declare const gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    horizontalMenu: boolean;

    darkMode = false;

    menuColorMode = 'light';

    menuColor = 'layout-menu-light';

    themeColor = 'blue';

    layoutColor = 'blue';

    ripple = true;

    inputStyle = 'outlined';

    constructor(private primengConfig: PrimeNGConfig,
        private router: Router
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              gtag('event', 'page_view', {
                page_path: event.urlAfterRedirects
              });
            }
        });
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
