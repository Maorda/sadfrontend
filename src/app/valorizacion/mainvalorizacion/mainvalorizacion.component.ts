import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { restendpoint } from 'src/app/endpoint/restendpoint';
import { importaHojasXls } from 'src/app/funcionesComunes/importarHojas';
import { getObraid } from 'src/app/global/ajusteGlobal';
import { parametros } from 'src/app/global/parametroGlobal';
import { IPeriodoValorizacion } from 'src/app/helpers/helpervalorizacion/periodoValorizaciones';
import { obtenUltimaColumna, obtenUltimaFila } from 'src/app/helpers/helpXLS/obtenUltimaFila';
import { sendMetasDiaras } from 'src/app/helpers/mypanditas/sendMetasDiaras';
import { DialogbottomComponent } from 'src/app/managerdialog/dialogbottom/dialogbottom.component';
import { IDynamicDialogConfig } from 'src/app/managerdialog/interfaces/Isino';
import { IExcelObraId } from 'src/app/obra/entity/obra.entity';
import { MainindiceseparadorComponent } from '../indiceseparador/mainindiceseparador/mainindiceseparador.component';
import { IDynamicDialogConfigCalculoValo, PeriodoComponent } from '../periodo/periodo/periodo.component';
import { ValorizacionService } from '../services/valorizacion.service';

interface IPeriodo{
  messeleccionado:string
}

export interface IGetValorizacionByIdObra{
  obraId:string;
  periodos:IPeriodo[]
}

export interface IPeriodoSeleccionado{
  
  avances:IPeriodoValorizacion[];
  periodoDeValorizacionSeleccionado:IDataPeriodoSeleccionado

}


export interface IDataPeriodoSeleccionado{
  rangoValorizacion:string;
  nroValorizacion:number;
  mesValorizacion:string;

}
export interface confMsg{
  title:string;
  typeMsg:string;
  msg:string;
  panelClass:string;
  template:TemplateRef<any> | undefined
}
@Component({
  selector: 'app-mainvalorizacion',
  templateUrl: './mainvalorizacion.component.html',
  styleUrls: ['./mainvalorizacion.component.css']
})
export class MainvalorizacionComponent implements OnInit {
  habilitaPanelFotografico:boolean = false
  habilitaDescargaConsolidado:boolean = false
  habilitaIndiceSeparador:boolean = false
  habilitaPeriodo:boolean = false


  message:confMsg

  urlPanelFotografico='url(assets/photo-album.png)'
  urlPeriodo='url(assets/salary.png)'
  urlDescargaConsolidado='url(assets/pdf-file.png)'
  urlindiceSeparador='url(assets/index.png)'
  
  @ViewChild('seleccionaPeriodoDialogTemplate')  seleccionaPeriodoDialogTemplate: TemplateRef<any> | undefined;
  @ViewChild('indiceSeparadorDialogTemplate')  indiceSeparadorDialogTemplate: TemplateRef<any> | undefined;
  @ViewChild('panelFotograficoDialogTemplate')  panelFotograficoDialogTemplate: TemplateRef<any> | undefined;
  bottomSheetRef = {} as MatBottomSheetRef<DialogbottomComponent>


  constructor(
    private valorizacionService:ValorizacionService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    ){ }
  ngOnInit(): void {
    this.habilitaPeriodo = true
    
  }

  
panelFotografico(){
  
  const confMsg:confMsg = {
    title:'Panel Fotográfico',
    typeMsg:'panelFotografico',
    msg:'todos los campos tienen que estar llenados',
    panelClass:'formMsg', //esta configuracion se encuentra en el styles.css principal
    template:this.panelFotograficoDialogTemplate,
    

  }
  this.message = confMsg
  const config: MatBottomSheetConfig = {
    panelClass:confMsg.panelClass,
    data: <any>{
      title: confMsg.title,
      dialogContent: confMsg.template//this.configuracionbottomsheetcard,
      /**los mensajes estan configurados para retornar valores undefined, y no presentan botones */
      //acceptButtonTitle: 'Ok',
      //declineButtonTitle: 'No stop!',
      
    }  };
    
    this.bottomSheetRef = this.bottomSheet.open(DialogbottomComponent, config);
    
    this.bottomSheetRef.afterOpened().subscribe(() => {
      console.log('Bottom sheet is open.');
    });
    this.bottomSheetRef.afterDismissed().subscribe(data => {
      
      console.log('Return value bottomsheet: ', data);
    });

  
}
/**metodo que permite seleccionar mediante un cuadro de dialogo, el mes de valorizacion a configurar
 * para que el usuario recuerde el numero de valorizacion que seleccionó, siempre se mostrará un
 * mensaje indicando que se aplicaran los cambios o calculos, a la valorizacion que seleccionó
 */
periodo(){
  const dialogRef = this.dialog.open(PeriodoComponent, 
    {
      width: '250px',
      data: <IDynamicDialogConfigCalculoValo>{
      title: 'Elija Periodo',
      dialogContent: this.seleccionaPeriodoDialogTemplate,
      acceptButtonTitle: 'Ok',
      //declineButtonTitle: ''
      }
    });
  dialogRef.afterClosed().subscribe(async (result:IPeriodoSeleccionado) => {
    /**
     * result devolvera:
     * {'rangoValorizacion','nroValorizacion','mesValorizacion'}
     * 
     */
    if (!result) return;
    
    this.habilitaPanelFotografico = true
    this.habilitaDescargaConsolidado = true
    this.habilitaIndiceSeparador = false
    
    /**
     * el usuario puede serleccionar cualquier periodo, repetiendo inclusive el mismo periodo
     * ningun calculo sera almacenado en la base de datos puesto que la hoja excel tiene la propiedad de 
     * guardar la informacion necesaria para realizar nuevamente el calculo, evitando de esa manera 
     * usar de manera innecesaria el almacenamiento en la base de datos. 
     */
     
     const payload = await this.valorizacionService.preparaInformacionCalculosValorizacion(result)
     console.log({"dentro main valorizacion":payload,"result":result})
    
    const obraid:IExcelObraId = await getObraid()
    
    var j = 0
    this.valorizacionService.getValorizacionByIdObra(obraid.code).subscribe({

      next:async (value:any)=> {//respuesta del servidor
     
        if( value !== null ){//existen registros
          for(let i =0;i<value.periodos.length;i++){

            if(value.periodos[i].mesSeleccionado === result.periodoDeValorizacionSeleccionado.mesValorizacion ){//si alguno de los elementos comparados existe ;entonces se está repitiendo la seleccion
              j=j+1
              console.log("el periodo ya fue seleccionado, significa que ya no guarda en la bd")

            }


          }
            
          

        }else{//es registro nuevo
          j=j+1
          const payload = await this.valorizacionService.preparaInformacionCalculosValorizacion(result) 
          
             
          this.valorizacionService.creaPeriodoValorizacion(payload).subscribe({
            next(value) {
              
            },
          })

        }
        if(j===0){
          const payload = await this.valorizacionService.preparaInformacionCalculosValorizacion(result) 
        
          
          this.valorizacionService.creaPeriodoValorizacion(payload).subscribe({
            next(value) {
            },
          })
        }
      },
      error(err) {
      },
      complete() {
      },
    })
    //hacer mas cosas



  });
}




async descargaConsolidado(){
  console.log("descargando un zip de indice mas calculo de las valorizaciones")
  
   this.valorizacionService.descargaConsolidado()

}
async comprimeCarpeta(){//se envian los datos para los calculos en pandas

  //enviar el presupuesto,avance fisico diario de cada partida, segun el mes selecconado
  const der = this.valorizacionService.presentaParaInviar
  console.log({"presenta para eniar":der})

  console.log("comprimiendo carpeta")
  
  const data = {
    idproyecto:await getObraid(),
    mesSeleccionado:localStorage.getItem("mesSeleccionado")
  }
  
  
   this.valorizacionService.comprimeCarpeta(data).subscribe(
    {
      next: ()=>{
        console.log("comprimiendo")
      },
      complete:()=> {
        console.log("comprimido satisfactoriamente")
      },
    

    }
    
  
   )

}


indiceSeparador(){
  const dialogRef = this.dialog.open(MainindiceseparadorComponent, 
    {
      width: '250px',
      data: <IDynamicDialogConfig>{
      title: 'Elija Periodo',
      dialogContent: this.indiceSeparadorDialogTemplate,
      acceptButtonTitle: 'Ok',
      //declineButtonTitle: ''
      }
    });
  dialogRef.afterClosed().subscribe(async (result) => {
    if (!result) return;
    await importaHojasXls(restendpoint.obra.descargarplantilla,[parametros.hojasXLS.nombre.INDICEVALORIZACION])
    
    
    
    
  });

}


}
