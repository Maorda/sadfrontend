import { ChangeDetectionStrategy, Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter,ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { capturaDatosPrincipalesXls } from 'src/app/helpers/helperobra/capturaDatosPrincipales';
import { restendpoint } from 'src/app/endpoint/restendpoint';
import { importaHojasXls } from 'src/app/funcionesComunes/importarHojas';
import { parametros } from 'src/app/global/parametroGlobal';
import { DialogbottomComponent } from 'src/app/managerdialog/dialogbottom/dialogbottom.component';
import { ObraService } from '../services/obra.service';
import { IDynamicDialogConfig} from '../../managerdialog/interfaces/Isino'
import { DialogsinoComponent } from 'src/app/managerdialog/dialogsino/dialogsino.component';
import { MatDialog } from '@angular/material/dialog';

import {ocultaHoja,muestraHojaOculta} from '../../helpers/helpXLS/ocultaYmuestraHojaXLS';
import { ValorizacionService } from 'src/app/valorizacion/services/valorizacion.service';
import { obtenUltimaFila } from 'src/app/helpers/helpXLS/obtenUltimaFila';
import { obtenDatosUnaFila } from 'src/app/helpers/helpXLS/obtenDatosUnaFila';
import { obtenIntervaloDatos } from 'src/app/helpers/helpXLS/obtenIntervaloDatos';
import { convertArrayToObjectTituloColumna } from 'src/app/helpers/indiceSeparadores/convierteColumnas';
import { obtenerPeriodosValorizaciones } from 'src/app/helpers/helpervalorizacion/periodoValorizaciones';
import { getAddress } from 'src/app/helpers/etiquetasXLS/administraEtiquetasXLS';
import { calendarioValorizadoAvanceObra } from 'src/app/helpers/helperCalendarioValorizadoAvanceObra/calendarioValorizadoAvanceObra';
import { IObra } from '../entity/obra.entity';
import { getObraid, setObraId } from 'src/app/global/ajusteGlobal';
import { generaTemporalidadMetasDiarias } from 'src/app/helpers/cumplimientoMetas/generaTemporalidadMetasDiarias';




import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface obraPartialForm{
  alias:string;
  tipologia:string
}
interface  IConfigViews{
  activateMetadiaria:boolean,
  activateConfiguracion:boolean
}

@Component({
  selector: 'app-mainobra',
  templateUrl: './mainobra.component.html',
  styleUrls: ['./mainobra.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:subformComponentProviders(MainObraComponent)
})
export class MainObraComponent implements OnInit {
  photoSelected: string | ArrayBuffer | null;

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file
  

  @Output('valueResponse')valueResponse:EventEmitter<IConfigViews> = new EventEmitter()


  
  //maneja un dialog de tipo bottom
  @ViewChild('dialogoPostRegistroObra')  dialogoPostRegistroObra: TemplateRef<any> | undefined;
  //
  @ViewChild('yesNoTemplateValorizacion')  yesNoTemplateValorizacion: TemplateRef<any> | undefined;

  bottomSheetRef = {} as MatBottomSheetRef<DialogbottomComponent>

  public form = createForm<obraPartialForm>(this,{
    formType:FormType.SUB,
    formControls:{
      alias: new UntypedFormControl(),
      tipologia:new UntypedFormControl()
    }
  })

   constructor(
    public dialog: MatDialog,
    private router:Router,
    private obraService:ObraService,
    private matBottomSheet: MatBottomSheet,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private valorizacionService:ValorizacionService
  ){ }
  async ngOnInit() {
    
    //inserta las siguientes hojas dentro del archivo nuevo
    //haciedno de esta manera que el archivo excel administrado por el sistema
    
    await importaHojasXls(`${restendpoint.base}${restendpoint.obra.descargarplantilla}`,
    [
      parametros.hojasXLS.nombre.CONFIGURACION,
      parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL,
      parametros.hojasXLS.nombre.CALENDARIOVALORIZADOAVANCEOBRA,
      parametros.hojasXLS.nombre.INDICEVALORIZACION,
      
    ])
    
  
    
    
  
  }
  
  //por lo visto en excel, para que rutee despues de haber llamado al dialog, lo unico que
  //se tiene que poner en la ruta.
  async creaObra(){

    //trabajando con las imagen
    if (this.file) {
      const formData = new FormData();
  
      
    
    //fin de las imagenes
  
  const cuerpoExtra = [
    //el orden importa, puesto que se llenará en el mismo orden en el back 
    
    [this.form.formGroup.value.alias],
    [this.form.formGroup.value.tipologia]
  ]
  
  
  /*let body = await capturaDatosPrincipalesXls()
 
  if(body[33] == ''){
    body[33]=[0]//adelanto directo
  }
  if(body[34] == ''){
    body[34]=[0]//adelanto de materiales
  }

  body = body.concat(cuerpoExtra)
 
*/
  
  
      this.status = 'uploading';
      const obraId = await getObraid()
      
      formData.append('file', this.file, this.file.name);
      formData.append('obraId',obraId )


 this.obraService.registraObra(formData).subscribe({
    //deberia registrar la obra del usuario logeado
    next: async( obra:IObra)=> {//respuesta del servidor 
      console.log({"respuesta del servidor en mainobra":obra})
     
      //dialogo de informacion de creacion de las hojas

      this.openYesNoDialog()
      //controla el renderisado de los botones de las apps
      //se llamó desde dashboard, entonces la respuesta tambien es a dashboard

      this.valueResponse.emit({
        activateConfiguracion:false,
        activateMetadiaria:true,
      })

          await setObraId(obra.obraId)
    },
    error:(err)=> {
      console.error(err)
    
    },
    complete:async()=> {
      
      
    },
 });
}
    
  }
  
  openYesNoDialog() {

    const dialogRef = this.dialog.open(DialogsinoComponent, {//cambiar por otro de formulario 
      width: '290px',
      
      
      panelClass: 'panelclassdialog',
      //en la configuracion de data, tambien se puede enviar el alto del contenido mat-dialog-content
      //matdialogcontent_height:'121px', está solo configurado para yesNoTemplateValorizacion 
      data: <IDynamicDialogConfig>{
        title: 'Información',
        //por medio del atributo dialog content el componente DialogsinoComponent renderizara el contenido 
        dialogContent: this.yesNoTemplateValorizacion, 
        acceptButtonTitle: 'Ok',
        //declineButtonTitle: 'No!'
        matdialogcontent_height:'190px'
      }
    });

    dialogRef.afterClosed().subscribe( async(result) => {
      if (!result) return;
      
      //configurar el calendario valorizaco de avance de obra
      //cada selda es un mes empezando por "G"
      //peligro, el codigo de importar hoja, no me permite la lectura con await
      //por ahora el cronograma se copiará tal cual está en el excel contractual
      
      
      this.router.navigate(['dashboard/main'])
    })
  }

  onChange(event: HtmlInputEvent) {
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

  
}
