import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { firstValueFrom, lastValueFrom, map, mergeMap, Observable } from 'rxjs';
import { parametrosGlobales } from 'src/app/config.sistema/config.sistema';
import { restendpoint } from 'src/app/endpoint/restendpoint';
import { getDiasContractuales, getFechaInicio, getObraid } from 'src/app/global/ajusteGlobal';
import { parametros } from 'src/app/global/parametroGlobal';
import { eliminaNumeroEtiqueta } from 'src/app/helpers/etiquetasXLS/eliminaNumeroEtiqueta';
import { getFechasContractuales } from 'src/app/helpers/fechas/administraFechas';
import { IPeriodoValorizacion, obtenerPeriodosValorizaciones } from 'src/app/helpers/helpervalorizacion/periodoValorizaciones';
import { obtenDatosUnaFila } from 'src/app/helpers/helpXLS/obtenDatosUnaFila';
import { obtenIntervaloDatos } from 'src/app/helpers/helpXLS/obtenIntervaloDatos';
import { obtenDataPlanificacionDiaria, obtenUltimaColumna, obtenUltimaFila } from 'src/app/helpers/helpXLS/obtenUltimaFila';
import { sendMetasDiaras } from 'src/app/helpers/mypanditas/sendMetasDiaras';
import { ObraService } from 'src/app/obra/services/obra.service';
import { IGetValorizacionByIdObra, IPeriodoSeleccionado } from '../mainvalorizacion/mainvalorizacion.component';

interface IObraID{
  code:string
}

export interface IEvidenciaFotografica{
	obraId:IObraID;
	mesSeleccionado:string;
	partida:string;
	descripcion:string;
	
}


interface IPeriodoData{
  mesSeleccionado:string
}

export interface IPeriodoValorizacionData{
  obraId:string;
  periodos:IPeriodoData[]
}

interface IpayLoad{
  
  valoSeleccionada:number;
  mesValo:string;
  idObra:number;
  rangoEtiquetas:string;


}


@Injectable({
  providedIn: 'root'
})
export class ValorizacionService {
  
  private parametrosValorizacion:IpayLoad 
  public payload:IPeriodoValorizacionData = {
    obraId:"",
    periodos:[{mesSeleccionado:""}]
  }
  public presentaParaInviar:any


  constructor(
    private fileSaverService:FileSaverService,
    private httpClient:HttpClient,
    
  ) { }
  obtenUsuarioId(){
     const usuarioId:any = this.httpClient.get(`https://192.168.1.86:3033/auth/${localStorage.getItem('token')}`) 
     return usuarioId.id
  }
  /**
   * este servicio agrega una evidencia fotografica, dado un obraid y un mes seleccionado
   */
     
  async agregaEvidenciaFotografica(token:any,obraId:any,partida: string, descripcion: string, photo: File,mesSeleccionado:string){

    const usuarioId:any = await firstValueFrom(this.httpClient.get(`https://192.168.1.86:3033/auth/${localStorage.getItem('token')}`))  
    
    
        
  var header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
  }
  const fd = new FormData();
  fd.append('usuarioId',usuarioId.id)
  fd.append('token', token);
  fd.append('obraId', obraId.code);
  fd.append('partida',partida)
  fd.append('descripcion',descripcion)
  fd.append('mesSeleccionado', mesSeleccionado);
  fd.append('file',photo );//file es el nombre con el que será interceptado en el servidor y tiene que ir en la ultimo pososcion
  
  

  return this.httpClient.post(`${restendpoint.base}${restendpoint.valorizacion.agregaevidenciafotografica}`,fd,header)

      }
    

    
  


  /**
  *este servicio permitirá, insertar el periodo de una valorizacion 
  */
  creaPeriodoValorizacion(payload:any){
    
    //console.log(this.payload)
    return this.httpClient.post(`${restendpoint.base}${restendpoint.valorizacion.creaPeriodoValorizacion}`,this.payload)

  }
  descargaSeparadores(){
    const type:string = 'zip'
    const fromRemote:boolean = true
    /*const fileName = `Valorización-${this.getValoParametrosSeleccionados().mesValoSeleccionada}.${type}`;//SIRVE PARA PODER EL NOMBRE DEL ARCHIVO A DESCARGAR
    if (fromRemote) {
      this.httpClient
      .get(`${restendpoint.base + restendpoint.valorizacion.descargaseparadores}`,{observe: 'response',responseType:"blob"})
      .subscribe((res)=>{this.fileSaverService
        .save(res.body, fileName);}
      )
      return;
    } */   
    
  }
  descargaConsolidado(){
    const type:string = 'zip'
    const fromRemote:boolean = true
    const fileName = `Valorización-${localStorage.getItem("mesSeleccionado")}.${type}`;//SIRVE PARA PONER EL NOMBRE DEL ARCHIVO A DESCARGAR
    if (fromRemote) {
      return this.httpClient
      .get(`${restendpoint.base + restendpoint.valorizacion.descargaconsolidado}`,{observe: 'response',responseType:"blob"})
      .subscribe((res)=>{this.fileSaverService
        .save(res.body, fileName);}
      )
      
    }else{
      return
    }
    

  }
  comprimeCarpeta(data:any){
   

    return this.httpClient.post(`https://192.168.1.86:3033/valorizacion/comprimecarpeta`,data)

  }
  setDataForSeparadores(payload:any){
    return this.httpClient.post(`${restendpoint.base}${restendpoint.valorizacion.generaseparadoresconindice}`,payload)

  }
  async getRangeAndMesValorizacion():Promise<IPeriodoValorizacion[]>{
    return await obtenerPeriodosValorizaciones()
  }

  async dataParaPandas(){
    const rangeTmp   = await obtenUltimaColumna()
    const rango = rangeTmp.split(":", 2)[1] 
    console.log({"dentro data para pandas":rango})

    return "A5"+":"+rango
  }
  

  
  
  async preparaInformacionCalculosValorizacion(result:IPeriodoSeleccionado){
    
      
      let partidas:any[] = []
      let Todaspartidas:any[] = []
      let tmp:any[] = []
      
      const endRow = await obtenUltimaFila(parametros.hojasXLS.nombre.PLANIFICAOBRA)//'planifica_obra'
      let i =0
      let j =0
      
      while(i < endRow - 4){
        //en la plantilla hoja planifica_obra, la fila con datos empieza en la numero 5
        //la ultima fila es 8 "presupuesto_contractual"
        partidas = partidas.concat( 
           await obtenDatosUnaFila(
            parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL, 
            { colRefStart: "A", rowRefStart: 6+i, colRefEnd: "F", rowRefEnd: 6+i }),

        )
        
          
        
        i = i + 1
      }
      

      let inicio:any=""
      let final:any="" 
     //avances de la partida 1
     i=0
     j=0

     
     for(let m=0;m<partidas.length;m++){//hay 4 partidas
      
      for(let n=0;n < result.avances.length;n++){//las tres valorizaciones
        inicio = result.avances[n].rangoValorizacion.split(":",2)[0].replace(/[0-9]/g,"");
        final = result.avances[n].rangoValorizacion.split(":",2)[1].replace(/[0-9]/g,"")
        
        tmp = tmp.concat(await obtenDatosUnaFila(parametros.hojasXLS.nombre.PLANIFICAOBRA,{colRefStart:inicio,rowRefStart:5+m,colRefEnd:final,rowRefEnd:5+m}))//planifica obra
                  
        }
        Todaspartidas.push(tmp)
        tmp=[]
     }
     console.log({"todas":Todaspartidas})
     //rango final determinado

     



     
     const fechaInicio = new Date(await getFechaInicio()) ;
     const diasContractuales = await getDiasContractuales();
     
    
      this.payload = {
        //"consolidadomensual":Todaspartidas,
        //"partidas":partidas,
        //"valorizacionSeleccionada":result.periodoDeValorizacionSeleccionado.nroValorizacion,
        //mesSeleccionado:result.periodoDeValorizacionSeleccionado.mesValorizacion,
        //"rangoEtiqueta":eliminaNumeroEtiqueta(result.periodoDeValorizacionSeleccionado.rangoValorizacion),
        obraId:await getObraid(),
        //"fechasContractuales":getFechasContractuales(fechaInicio,diasContractuales),
        //"fechaInicioConNew":fechaInicio,
        //"fechaInicio":await getFechaInicio()
        periodos:[{mesSeleccionado:result.periodoDeValorizacionSeleccionado.mesValorizacion}]
      }
      this.presentaParaInviar = {
        "consolidadomensual":Todaspartidas,
        "partidas":partidas,

      }
      
      
      //this.parametrosValorizacion.idObra = await getObraid();
      //this.parametrosValorizacion.mesValo = result.valos.mesValorizacion;
      //this.parametrosValorizacion.valoSeleccionada = result.valos.nrovalo;
      //this.parametrosValorizacion.rangoEtiquetas = eliminaNumeroEtiqueta(result.valos.rango);


      return this.payload
      
  }
  async getValoParametrosSeleccionados(){
     //parametros de configuracion seleccionados
    
     /*return {
      "valoSeleccionada":this.parametrosValorizacion.valoSeleccionada,
      "mesValoSeleccionada":this.parametrosValorizacion.mesValo,
      "rangoEtiquetas":this.parametrosValorizacion.rangoEtiquetas
    }*/
  }
  genraValorizacion(data:any){

   
        return this.httpClient.post(restendpoint.base + restendpoint.valorizacion.generavalorizacionxls,data)
   
    
  }
  getValorizacionByIdObra(idobra:string){//obten todas las valorizaciones registradas para esta obra
    //https://192.168.1.86:3033/valorizacion/listaValorizacionByobraid/idobra
   
    return this.httpClient.get(`${restendpoint.base}${restendpoint.valorizacion.listaValorizacionByobraid}/${idobra}`)

  }
  findValoIdByObraIdAndValoSeleccionada(config:{idobra:string,valorizacionSeleccionada:string}){
    return this.httpClient.get(`${restendpoint.base}${restendpoint.panelfotografico.findValoIdByObraIdAndValoSeleccionada}/${config.idobra}/${config.valorizacionSeleccionada}`)
  }
  //actualizaciones
  actualizaEvidenciaFotografica(obraId: string,mesSeleccionado:string, partida: string, descripcionTrabajos: string,urlFoto:string){
    const body = {
      obraId ,mesSeleccionado, partida, descripcionTrabajos,urlFoto
    }
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    }
    const fd = new FormData();
    
    fd.append('obraId',body.obraId);
    fd.append('partida',partida)
    fd.append('descripcionTrabajos',descripcionTrabajos)
    fd.append('mesSeleccionado', mesSeleccionado);
    fd.append('urlFoto',urlFoto );//file es el nombre con el que será interceptado en el servidor y tiene que ir en la ultimo pososcion
    

    return this.httpClient.patch(`${restendpoint.base}${restendpoint.valorizacion.actualizaevidenciafotografica}/${body.obraId}/${body.mesSeleccionado}`,fd,header)

  }
  //consultas
  dadoUnMesSeleccionadoMostarSuPanelFotografico(obraId:string,mesSeleccionado:string):Observable<any>{
    //https://192.168.1.86:3033/valorizacion/mesSeleccionado
    
    return this.httpClient.get(`${restendpoint.base}${restendpoint.valorizacion.consultas}/${obraId}/${mesSeleccionado}`) 

  }
}
