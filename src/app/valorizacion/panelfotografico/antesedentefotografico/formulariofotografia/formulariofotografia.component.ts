import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { ValorizacionService } from '../../../services/valorizacion.service';
import { PanelfotograficoService } from '../../panelfotografico.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface photoForm{
  partida:string;
  descripcion:string;
}

@Component({
  selector: 'app-formulariofotografia',
  templateUrl: './formulariofotografia.component.html',
  styleUrls: ['./formulariofotografia.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:subformComponentProviders(FormulariofotografiaComponent)
})
export class FormulariofotografiaComponent  {

  breakpoint: number;
  photoSelected: string | ArrayBuffer | null;
  file: File;
  url = 'url(assets/manejar.png)'
  urlback= 'url(assets/atras.png)'

  constructor(
    private photoService: PanelfotograficoService, 
    private router: Router,
    private cdr: ChangeDetectorRef,
    private valorizacionservice:ValorizacionService
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;// es la relacion 1 a 2 cuando el tamaño de la ventana es menor a 400
  }
  public form = createForm<photoForm>(this,{
    formType:FormType.SUB,
    formControls:{
      partida :new UntypedFormControl(null),
      descripcion: new UntypedFormControl(null)
    }
  })

  

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      
      // image preview
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.photoSelected = reader.result;
        this.cdr.detectChanges();// poner este codigo cuando se usa la estrategia de deteccion push
      } 
      
      reader.readAsDataURL(this.file);
      
      
    }
  }

  photoInput(){
    //console.log(evento)
  }
  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }
  


}
