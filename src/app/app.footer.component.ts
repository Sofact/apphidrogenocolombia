import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
			<div >
				<a href="#/dash">
					<img src="assets/layout/images/Logos_hidro_wec2.png" alt="mirage-layout" height="40" />
				</a>
				<div class="text">
				</div>
			</div>
			<div class="icons">
				<div class="icon">
					<!-- <i class="pi pi-home"></i> -->
				</div>
				<div class="icon">
					<!--<a href="#/pages/acerca"><i class="pi pi-twitter"></i></a>-->
				</div>
				<div class="icon">
					<a href="#/pages/acerca"><i class="pi pi-info-circle"></i></a>
				</div>
			</div>
        </div>
    `
})
export class AppFooterComponent {

}
