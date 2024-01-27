import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,  TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { restendpoint } from '../endpoint/restendpoint';
import { importaHojasXls } from '../funcionesComunes/importarHojas';
import { getObraid, isPlanningDailyFilling } from '../global/ajusteGlobal';

import { parametros } from '../global/parametroGlobal';
import { generaTemporalidadMetasDiarias } from '../helpers/cumplimientoMetas/generaTemporalidadMetasDiarias';
import { ocultaHoja } from '../helpers/helpXLS/ocultaYmuestraHojaXLS';
import { configBase } from '../managerdialog/consts/configdialog';
import { DialogsinoComponent } from '../managerdialog/dialogsino/dialogsino.component';
import { DialogwithdynamictemplateformComponent } from '../managerdialog/dialogwithdynamictemplateform/dialogwithdynamictemplateform.component';
import { IDynamicDialogConfig } from '../managerdialog/interfaces/Isino';
import { DialogData } from '../managerdialog/models/dialog-data.model';
import { DialogFactoryService } from '../managerdialog/services/dialog-factory.service';
import { DialogService } from '../managerdialog/services/dialog.service';
import { MainvalorizacionComponent } from '../valorizacion/mainvalorizacion/mainvalorizacion.component';

import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IExcelObraId } from '../obra/entity/obra.entity';
import { capturaDatosPrincipalesXls } from '../helpers/helperobra/capturaDatosPrincipales';
import { obtenDatosSegunRangoXls } from '../helpers/obtenerDatosXLS/obtenDatosSegunRango';
import { obtenIntervaloDatos } from '../helpers/helpXLS/obtenIntervaloDatos';
import { convertArrayToObjectTituloColumna } from '../helpers/indiceSeparadores/convierteColumnas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  habilitaMetaDiaria:boolean = false
  habilitaValorizacion:boolean = false
  habilitaconfiguracionObra:boolean = false
  habilitaPresupuestoContractual:boolean = false

  urlPlanificacion ='url(assets/estrategia1.png)';
  urlObra='url(assets/xls.png)';
  urlValorizacion='url(assets/beneficios.png)';
  urlNuevoArchivoSistema ='url(assets/xls.png)'

  panel:Subscription

  recibiRespuesta($event:any){
    this.habilitaMetaDiaria = $event.activateMetadiaria
    this.habilitaconfiguracionObra = $event.activateConfiguracion
  }

  

  constructor(
    private toastr: ToastrService,
    private readonly router:Router,
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private matBottomSheet: MatBottomSheet,
    private dialogFactoryService: DialogFactoryService,
    private httpClient: HttpClient
    
  ) { }
  
  async ngOnInit() {
    /**
     * comprueba si la hoja excel que está abierto tiene un id para el sistema, en cualquier otro caso, la obra o la hoja no están registrados para este usuario.
     */
    //buscar en la base de datos si existe el id de la obra de este usuario 
    
    const isxlsSistema:IExcelObraId = await getObraid()
    

    
    if(isxlsSistema.code == "ItemNotFound"){//el archivo existe como sistema
      this.toastr.info("Éste archivo no es de sistema; cree uno por favor","Archivo abierto")
      this.habilitaconfiguracionObra = true
    }else {

      //comprueba que la hoja de metas diarias está llenado.
      
      const pl = await isPlanningDailyFilling()
      if(pl.code=="ItemNotFound"){
        this.habilitaMetaDiaria = true  

      }
      else{
        this.habilitaValorizacion = true  
      }
      
      
    }
    
    
    
  }

  @ViewChild('configuracionObraDialogTemplate')  configuracionObraDialogTemplate: TemplateRef<any> | undefined;
  @ViewChild('metadiariaDialogTemplate')  metadiariaDialogTemplate: TemplateRef<any> | undefined;
  @ViewChild('valorizacionDialogTemplate')  valorizacionDialogTemplate: TemplateRef<any> | undefined;
  @ViewChild('nuevoArchivoSistemaDialogTemplate')  nuevoArchivoSistemaDialogTemplate: TemplateRef<any> | undefined;
  
  
  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['autenticar/login'])
  }

  
  //para dar el efecto de pantalla completa agregar ...configBase, a la configuracion.
  //tener encuenta que si se renderisa por medio de un router-outlet, el metodo afterclose nunca se ejecuta en excel
  async metadiaria() {
    //validar que la creacion de metas diarias se tiene que dar despues que las siguientes hojas han sido llenadas.
    //- configuracion
    //-presupuesto contractual
    //-calendario valorizado de obra
    //- indice
    const der =  await  capturaDatosPrincipalesXls()

    let i = 0;
    for(i;i<der.length - 2;i++){//valida el llenado de los campos obligatorios de la hoja configuracion
      
      if(der[i][0]===""){
        this.toastr.error(`Por favor complete el ítem ${i+1}`,"Completa Información")
        break;//corta el ciclo for, para que continue despues del ciclo for   
      }

    }
      
    //valida que almenos una partida esté llenada
    const jo = await obtenDatosSegunRangoXls(parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL,["B6:B6"])
    if(jo[0][0]===""){
      this.toastr.error(`Falta llenar la hoja presupuesto contractual`,"Error")

    }
    //-calendario valorizado de obra
    const cal = await obtenDatosSegunRangoXls(parametros.hojasXLS.nombre.CALENDARIOVALORIZADOAVANCEOBRA,["G6:G6"])
    if(cal[0][0]===""){
      this.toastr.error(`Falta llenar la hoja calend_valo_avanceobra`,"Error")

    }//el indice por lo menos debe tener un titulo
    const ind = await obtenDatosSegunRangoXls(parametros.hojasXLS.nombre.INDICEVALORIZACION,["A6:A6"])
    if(ind[0][0]===""){
      this.toastr.error(`Falta llenar la hoja indice_valorización`,"Error")


    }
   

    if(i === der.length - 2 && jo[0][0]!=="" && cal[0][0]!=="" && ind[0][0]!=="" ){//todos los campos obligatorios están llenos
      
      const dialogRef = this.dialog.open(DialogsinoComponent, 
        {
          width: '250px',
          data: <IDynamicDialogConfig>{
          title: 'Meta Diaria',
          dialogContent: this.metadiariaDialogTemplate,
          acceptButtonTitle: 'Ok',
          //declineButtonTitle: ''
          }
        });
        this.panel = dialogRef.afterClosed().subscribe(async (result) => {
        
          if (!result) return;
          await importaHojasXls(`${restendpoint.base}${restendpoint.obra.descargarplantilla}`, [parametros.hojasXLS.nombre.PLANIFICAOBRA])
          const payload = await obtenIntervaloDatos('indice_valorizacion',"A",6,"F")
          
          const config = {
            data: convertArrayToObjectTituloColumna(payload),
            token:localStorage.getItem("token"),
            idObra: await getObraid(),
            mesValorizacion:localStorage.getItem("mesSeleccionado")
          }

   
          this.httpClient.post(`${restendpoint.base}${restendpoint.valorizacion.generaseparadoresconindice}`,config).subscribe({
            next:async (value)=>{//respuesta del servidor
            
            
            
            
            //descarga el excel de los separadores
            //this.valorizacionService.descargaConsolidado()  
            },
            complete: async()=>{
              
              this.habilitaValorizacion = true
              this.habilitaMetaDiaria = false
              //oculta hojas de trabajo  
              await ocultaHoja(parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL);
              await ocultaHoja(parametros.hojasXLS.nombre.CALENDARIOVALORIZADOAVANCEOBRA);
              await ocultaHoja(parametros.hojasXLS.nombre.CONFIGURACION);
              await ocultaHoja(parametros.hojasXLS.nombre.INDICEVALORIZACION)
              await generaTemporalidadMetasDiarias()

            },
            error(err) {
       
          },
   })




            
        });

    }
    
    
  }

  async configuracionObra() {
    //esta configuracion de navegacion, es posible debido a que se usa una plantilla de destino en este mismo componente, con el renderisado en router-outlet

    this.router.navigate(['dashboard/main/obra/mainobra']);     
    
    const dialogRef = this.dialog.open(DialogsinoComponent, 
      {
        /**efecto full screen */
        ...configBase,
        /** */
        data: <IDynamicDialogConfig>{
          title: 'Información de la Obra',
          dialogContent: this.configuracionObraDialogTemplate,
          //acceptButtonTitle: 'Ok',
          //declineButtonTitle: ''
        }
      });
    //cuando se llama a la ruta, nunca se ejecuta esta parte
    this.panel = dialogRef.afterClosed().subscribe(async result => {
      
      if (!result) return;
      // delete it
     
      
    });

  }

  

  valorizacion(){

    const dialogRef = this.dialog.open(DialogsinoComponent, 
      {
        /**efecto full screen */
        ...configBase,
        /** */
        data: <IDynamicDialogConfig>{
          title: 'Opciones de Valorización',
          dialogContent: this.valorizacionDialogTemplate,
          //matdialogcontent_height:'750px'//el alto del contenido
          //acceptButtonTitle: 'Ok',
          //declineButtonTitle: ''
        }
      });
    
    this.panel = dialogRef.afterClosed().subscribe(result => {
      
      //necesito llamar a main obraemit
      if (!result) return;
      // delete it
      
      //this.router.navigate(['']);
    });


  }
  ////////////////
  title = 'dialog-example';

  dialog1: DialogService;
  @ViewChild('firstDialogTemplate')
  firstDialogTemplate: TemplateRef<any>;

  @ViewChild('secondDialogTemplate')
  secondDialogTemplate: TemplateRef<any>;

  @ViewChild('loaderDialogTemplate')
  loaderDialogTemplate: TemplateRef<any>;



  dispatchDialog() {
    this.openDialog({
      headerText: 'Here is our dialog',
      template: this.firstDialogTemplate
    });
  }

  changeDialogTemplate(template: TemplateRef<any>) {
    this.dialog1.setTemplate(this.loaderDialogTemplate);
    setTimeout(() => {
      this.dialog1.setTemplate(template);
    }, 3000);
  }

  closeDialog() {
    this.dialog1.close();
  }

  private openDialog(dialogData: DialogData): void {
    this.dialog1 = this.dialogFactoryService.open(dialogData);
  }

}
