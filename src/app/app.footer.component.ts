import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
			<div >
				<img src="assets/layout/images/Logos_hidro_wec2.png" alt="mirage-layout" height="40" />
				<div class="text">
				</div>
			</div>
			<div class="icons">
				<div class="icon">
					<!-- <i class="pi pi-home"></i> -->
				</div>
				<div class="icon">
					<i class="pi pi-twitter"></i>
				</div>
				<div class="icon">
					<i class="pi pi-linkedin"></i>
				</div>
			</div>
        </div>
    `
})
export class AppFooterComponent {

}
