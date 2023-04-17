import {Component, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../breadcrumb.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
    selector: 'aperfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

    imageChangedEvent: any = '';
    croppedImage: any = '';
    showCropper = false;
  
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  
    constructor(private breadcrumbService: BreadcrumbService,
        private ng2ImgMax: Ng2ImgMaxService
        ) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Empty', routerLink: ['/pages/empty'] }
        ]);
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.showCropper = true;
      }
    
      imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
      }
    
      imageLoaded() {
        this.showCropper = true;
      }
    
      cropperReady() {}
    
      loadImageFailed() {}
    
      cropImage() {
        this.ng2ImgMax.resizeImage(this.croppedImage, 500, 500).subscribe(
          (result) => {
            this.croppedImage = result;
            // Aquí puedes hacer lo que quieras con la imagen recortada y redimensionada
          },
          (error) => {
            console.log('😢 Oh no!', error);
          }
        );
      }

}
