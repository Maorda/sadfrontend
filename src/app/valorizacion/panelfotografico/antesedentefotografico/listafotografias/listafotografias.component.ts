import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, ɵɵtextInterpolate4 } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createForm, FormType } from 'ngx-sub-form';
import { Observable } from 'rxjs';
import { restendpoint } from 'src/app/endpoint/restendpoint';
import { getObraid } from 'src/app/global/ajusteGlobal';
import { calendarioValorizadoAvanceObra } from 'src/app/helpers/helperCalendarioValorizadoAvanceObra/calendarioValorizadoAvanceObra';
import { DialogsinoComponent } from 'src/app/managerdialog/dialogsino/dialogsino.component';
import { IDynamicDialogConfig } from 'src/app/managerdialog/interfaces/Isino';
import { IEvidenciaFotografica, ValorizacionService } from '../../../services/valorizacion.service';

import { Photo, PanelfotograficoService, IPeriodo } from '../../panelfotografico.service';




export interface photoForm{
  partida:string;
  descripcionTrabajos:string;
}

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export interface IDynamicDialogConfig1 extends IDynamicDialogConfig {
  file:File
}
interface IPeriodos{
  periodos:IPartidas[]
}

interface IPartidas{
  mesSeleccionado:string
  panelFotografico:IPanelFotografico[]
}
interface IPanelFotografico {
  descripcionTrabajos:string;
  partida:string;
  urlFoto:string

}


@Component({
  selector: 'app-listafotografias',
  templateUrl: './listafotografias.component.html',
  styleUrls: ['./listafotografias.component.css'],

  
})
export class ListafotografiasComponent {

  periodos$:Observable<IPeriodos> | null = null
  periodos:IPanelFotografico[]
  url:'url(assets/camara.png)'
  photoSelected: string | ArrayBuffer | null;
  photoSelected1: string | ArrayBuffer | null;
  file: File;
  file1: File;

  @ViewChild('yesNoTemplatePanelForografico')  yesNoTemplatePanelForografico: TemplateRef<any> | undefined;
  @ViewChild('yesNoTemplateUpdatePanelForografico')  yesNoTemplateUpdatePanelForografico: TemplateRef<any> | undefined;



  constructor(
    private photoService: PanelfotograficoService,
    private valorizacionService:ValorizacionService,
    private router: Router,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private httpClient:HttpClient,

     
  ) { }

  async ngOnInit() {
    //muestra las fotos que corresponden a:
    // - usuarioId
    // - obraId
    // - valorizacionId
    console.log("estoy en onint de listafotografias")
   const obraId:any = await getObraid() 
   const mesSeleccionado = ""+localStorage.getItem('mesSeleccionado')
   this.valorizacionService.dadoUnMesSeleccionadoMostarSuPanelFotografico(obraId.code,mesSeleccionado).subscribe({
    next:(value:IPeriodos)=> {//respuesta del servidor
      console.log(value)
      this.periodos = value.periodos[0].panelFotografico
    },
   })
   

  }
  public form = createForm<photoForm>(this,{
    formType:FormType.SUB,
    formControls:{
      partida :new UntypedFormControl(null),
      descripcionTrabajos: new UntypedFormControl(null)
    }
  })

  selectedCard(periodo: any) {
    
    this.openUpdateDialog(periodo)
   
  }
  //sube la foto despues de aceptar el cuado de dialogo
  openYesNoDialog() {
    
    const dialogRef = this.dialog.open(DialogsinoComponent, {//cambiar por otro de formulario 
      width: '85%',
      panelClass: 'panelclassdialog',
      data: <IDynamicDialogConfig>{
        title: 'Agregar Fotografía',
        dialogContent: this.yesNoTemplatePanelForografico,
        acceptButtonTitle: 'Ok',
        declineButtonTitle: 'No'
      }
    });

    dialogRef.afterClosed().subscribe( async(result) => {//result true false
      //this.router.navigate(['dashboard/main'])
      if(!result) return
      this.uploadPhoto()
      
      
      
      
    });
  }
  onPhotoSelected1(event: HtmlInputEvent): void {
    
    if (event.target.files && event.target.files[0]) {
      this.file1 = <File>event.target.files[0];
      
      // image preview
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.photoSelected1 = reader.result;
        //this.cdr.detectChanges();// poner este codigo cuando se usa la estrategia de deteccion push
      } 
      
      reader.readAsDataURL(this.file1);
      
      
    }
  }
  
  async onPhotoSelected(event: HtmlInputEvent) {
    
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
 

  async uploadPhoto() {
    //probar calendario valorizaco de avance de obra
     
     

 const body:IEvidenciaFotografica = {
		"obraId":{code:""},
	  "mesSeleccionado":"",
	  "partida":"",
	  "descripcion":"",
 }
 
 body.obraId = await getObraid()

 this.httpClient.get(`https://192.168.1.86:3033/auth/${localStorage.getItem('token')}`).subscribe({
  next:(va:any)=>{//respuesta del servidor
     
 var header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
  }
  
  const token:Blob | string | null= ""+localStorage.getItem("token")
  
  body.mesSeleccionado = this.valorizacionService.payload.periodos[0].mesSeleccionado
  body.descripcion = this.form.formGroup.value.descripcionTrabajos
  body.partida = this.form.formGroup.value.partida

  const fd = new FormData();
  fd.append('usuarioId',va.id)
  fd.append('token', token);
  fd.append('obraId', body.obraId.code);
  fd.append('partida',body.partida)
  fd.append('descripcion',body.descripcion)
  fd.append('mesSeleccionado',body. mesSeleccionado);
  fd.append('file',this.file );//file es el nombre con el que será interceptado en el servidor y tiene que ir en la ultimo pososcion
  
  
  this.httpClient.post(`${restendpoint.base}${restendpoint.valorizacion.agregaevidenciafotografica}`,fd,header).subscribe({
    next:(lor:any)=>{//respuesta de servirod
     

    }
  })
 

  }
 }
 


 )
 
    

    this.cdr.detectChanges()
    return false;
  }




  openUpdateDialog(periodo:IPanelFotografico){
    
    const dialogRef = this.dialog.open(DialogsinoComponent, {//cambiar por otro de formulario 
      width: '85%',
      panelClass: 'panelclassdialog',
      data: <IDynamicDialogConfig1>{
        title: 'Actualiza Fotografía',
        dialogContent: this.yesNoTemplateUpdatePanelForografico,
        acceptButtonTitle: 'Si',
        declineButtonTitle: 'No',
        file:this.file1
      }
    });

    dialogRef.afterClosed().subscribe( async(result) => {//result true false
      //this.router.navigate(['dashboard/main'])
      if(!result) return
      
      const updateEvidenciaFotografica = {
        obraId: await getObraid(),

        partida:this.form.formGroup.value.partida,
        descripcionTrabajos:this.form.formGroup.value.descripcionTrabajos,
        urlFoto:periodo.urlFoto,
        mesSeleccionado:"Diciembre"
      }

      


      this.valorizacionService.actualizaEvidenciaFotografica(
        updateEvidenciaFotografica.obraId.code,
        updateEvidenciaFotografica.mesSeleccionado,
        updateEvidenciaFotografica.partida,
        updateEvidenciaFotografica.descripcionTrabajos,
        updateEvidenciaFotografica.urlFoto
        ).subscribe({
          next:(value:any)=>{//respuesta del servidor
    

          }
        })
      //this.cdr.detectChanges()
    
      
      
      
      
      
      
    });
  }


}
