import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BreadcrumbService} from '../../breadcrumb.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/_services/auth.service';
import swal from 'sweetalert2'
import { AgendaService } from '../service/agenda.service';
import { Table} from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'sponsors',
    templateUrl: './sponsors.component.html'
})
export class SponsorsComponent {
    listaSponsors: any = [];
    listaSponsors0: any = [];
    listaSponsors1: any = [];
    listaSponsors2: any = [];
    listaSponsors3: any = [];
    listaSponsorsoro: any = [];
    listaSponsorsapoya: any = [];
    //listaAgenda2: any = [];
    @ViewChild('dt') table: Table;


    constructor( private fb: FormBuilder,
        private authService: AuthService,
        private route: Router,
        private router: ActivatedRoute,
        private agenda: AgendaService
        ){
        
    }

    ngOnInit(): void {
        this.initForm();
        }
        
        initForm(){
          this.cargarDatosSponsors();
        }
        
        cargarDatosSponsors(){
          this.agenda.get_sponsor(null).subscribe((resp: any) => {
            console.log("SponsorInof",resp);
            if(!resp.error && resp){
              console.log("Ingreso a poblar la lista");
                    this.listaSponsors=resp.sponsor;
                    this.listaSponsors0=this.listaSponsors.filter(p => p.spo_tipo==0);
                    this.listaSponsors1=this.listaSponsors.filter(p => p.spo_tipo==1);
                    this.listaSponsors2=this.listaSponsors.filter(p => p.spo_tipo==2);
                    this.listaSponsors3=this.listaSponsors.filter(p => p.spo_tipo==3);
                    this.listaSponsorsoro=this.listaSponsors.filter(p => p.spo_tipo==4);
                    this.listaSponsorsapoya=this.listaSponsors.filter(p => p.spo_tipo==5);
                    //this.listaAgenda2=this.listaAgenda.filter(p => p.eve_dia==2);
            }else{
              if(resp.error == 'Unauthorized'){
                console.log("Usuario no Autorizado");
              }
            }
          })
        }

        irAPaginaDestino(id: number) {
          console.log("SponsorsPAge", id)
          this.route.navigate(['pages/sponsors-view', id]);
        }
}
