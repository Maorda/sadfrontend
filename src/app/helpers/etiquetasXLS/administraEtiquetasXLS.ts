import { getFechasContractuales } from "../fechas/administraFechas";

/**
   * @param inicio indica la posicion de la columna en excel
   * @param final indica el numero de posiciones a partir de la posicion inicial 
   * @description retorna la direccion "address" contado a partir del mismo inicio hasta la posicion indicada en final
   */
 export function getAddress(inicio:number,final:number){
    let etiquetas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let p: any[] = []
    let posisionInicioEtiqueta = inicio -1
  
    for (let i = 0; i < etiquetas.length; i++) {
      for (let j = 0; j < etiquetas.length; j++) {
        p = p.concat(etiquetas[i].concat(etiquetas[j]))
      }
    }
    etiquetas = etiquetas.concat(p)
    let mysEtiketas: any = []
    for (let k = posisionInicioEtiqueta; k < 366 + posisionInicioEtiqueta; k++) {//372-6= 366 dias en total
      mysEtiketas[k - posisionInicioEtiqueta] = etiquetas[k]
    }
    //return {todas:mysEtiketas,final:mysEtiketas[final - 1]}
    return {inicio:etiquetas[posisionInicioEtiqueta],final :mysEtiketas[final - 1]} 
  
  }

  /**
   * 
   * @param fecha_inicio Es la fecha de inicio contractual
   * @param diasContractuales Es el numero de dias contractual
   * @param rowReference Es la fila de referencia para el llenado
   * @returns Retorna los intervalos en rangos de excel
   * @description retorna un objeto {inicio:"AD", final:"EH",rowReference:16}, dependiendo de los dias contractuales 
   */
  export function getIntervalRange(fecha_inicio:Date,diasContractuales:number,rowReference:number){
    interface capacidad {
        capacidadMaxima:number;
        capacidadOcupada:number;
        capacidadTrabajo:number;
        nombreMes:string;
      }
    let fechascontractuales:capacidad[]= getFechasContractuales(fecha_inicio,diasContractuales)

    let rangos:any[] = []
    let acumula =0
    for(let i = 0;i< fechascontractuales.length;i++){
        if(i===0){
            rangos.push({...getAddress(7,fechascontractuales[i].capacidadTrabajo),rowReference})
            acumula = 7
        }else{
            acumula = acumula + fechascontractuales[i-1].capacidadTrabajo
            //rangos.push(getAddress(acumula,fechascontractuales[i].capacidadTrabajo)) 
            rangos.push({...getAddress(acumula,fechascontractuales[i].capacidadTrabajo),rowReference})

        }
    }
    return rangos 


  }

  /**
   * 
   * @param fecha_inicio - es la fecha de inicio contractual
   * @param diasContractuales - es el numero de dias contractuales
   * @param rowReference - es la fila de referencia para inicio del llenado
   * @param columnReference - es la columna de referencia para el llenado
   * @returns - retorna un objeto con la direccion de las etiketas y la fila de referencia 
   */
  export function getIntervalRangeWhithColumn(fecha_inicio:Date,diasContractuales:number,rowReference:number,columnReference:number){
    interface capacidad {
        capacidadMaxima:number;
        capacidadOcupada:number;
        capacidadTrabajo:number;
        nombreMes:string;
      }
    let fechascontractuales:capacidad[]= getFechasContractuales(fecha_inicio,diasContractuales)

    let rangos:any[] = []
    let acumula =0
    for(let i = 0;i< fechascontractuales.length;i++){
        if(i===0){
            rangos.push({...getAddress(columnReference,fechascontractuales[i].capacidadTrabajo),rowReference})
            acumula = columnReference
        }else{
            acumula = acumula + fechascontractuales[i-1].capacidadTrabajo
            //rangos.push(getAddress(acumula,fechascontractuales[i].capacidadTrabajo)) 
            rangos.push({...getAddress(acumula,fechascontractuales[i].capacidadTrabajo),rowReference})

        }
    }
    return rangos 


  }